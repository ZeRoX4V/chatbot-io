import { saveConversation, loadConversation, clearConversation, clearAllConversations } from './localstorage.js';
import { home } from '../page/home.js';
import { bots } from './bots.js';
import { displayMessage, scrollToBottom } from './message.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Initialise l'interface utilisateur avec la fonction home() après que le DOM soit complètement chargé
    document.body.innerHTML = home();

    // Récupère les éléments de l'interface
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messageList = document.getElementById('message-list');
    const botList = document.getElementById('bot-list');
    const clearConversationButton = document.getElementById('clear-conversation-button');
    const clearAllConversationsButton = document.getElementById('clear-all-conversations-button');

    let selectedBot = null;

    const conversations = {
        Kev: loadConversation('Kev'),
        Météo: loadConversation('Météo'),
        SpaceX: loadConversation('SpaceX')
    };

    //Fonction pour charger et afficher les messages de la conversation du bot sélectionné
    function loadConversationUI(bot) {
        messageList.innerHTML = '';
        conversations[bot].forEach(msg => {
            displayMessage(msg.text, msg.type, msg.name, msg.avatar, msg.time);
        });
        scrollToBottom(messageList);
    }

    // FOnction pour gérer l'envoi d'un message par l'utilisateur
    function handleSendMessage() {
        console.log("handleSendMessage called");

        const message = messageInput.value.trim();
        if (!message || !selectedBot) return;

        const time = new Date().toLocaleTimeString();
        const sentMessage = { text: message, type: 'sent', name: 'You', avatar: 'public/images/kc.png', time };
        conversations[selectedBot].push(sentMessage);
        displayMessage(message, 'sent', 'You', 'public/images/kc.png', time);
        messageInput.value = '';
        scrollToBottom(messageList);

        // Sauvegarde la conversation après l'envoi d'un message
        saveConversation(selectedBot, conversations[selectedBot]);

        // Gère les réponses des bots en fonction de si c'est la commande commune ou non
        if (message.toLowerCase() === 'salut') {
            handleAllBotsCommand(message);
        } else {
            handleBotResponses(message);
        }
    }

    //Fonction pour gérer les commandes qui s'appliquent à tous les bots
    function handleAllBotsCommand(message) {
        bots.forEach(bot => {
            bot.actions.forEach(action => {
                if (action.trigger(message)) {
                    action.response(message).then(responseMessage => {
                        const time = new Date().toLocaleTimeString();
                        const receivedMessage = { text: responseMessage, type: 'received', name: bot.name, avatar: bot.avatar, time };
                        if (!conversations[selectedBot]) {
                            conversations[selectedBot] = []; // Initialise la conversation si elle n'existe pas
                        }
                        conversations[selectedBot].push(receivedMessage);
                        displayMessage(responseMessage, 'received', bot.name, bot.avatar, time);
                        scrollToBottom(messageList);

                        // Sauvegarde la conversation après chaque réponse du bot
                        saveConversation(selectedBot, conversations[selectedBot]);
                    });
                }
            });
        });
    }

    //Fonction pour gérer les réponses spécifiques d'un bot 
    function handleBotResponses(message) {
        const bot = bots.find(b => b.name === selectedBot);
        if (!bot) return;

        bot.actions.forEach(action => {
            if (action.trigger(message)) {
                action.response(message).then(responseMessage => {
                    const time = new Date().toLocaleTimeString();
                    const receivedMessage = { text: responseMessage, type: 'received', name: bot.name, avatar: bot.avatar, time };
                    conversations[selectedBot].push(receivedMessage);
                    displayMessage(responseMessage, 'received', bot.name, bot.avatar, time);
                    scrollToBottom(messageList);

                    // Sauvegarde la conversation après réponse du bot
                    saveConversation(selectedBot, conversations[selectedBot]);
                });
            }
        });
    }

    // Gestion de l'event pour gérer le click pour l'envoi du message
    sendButton.addEventListener('click', () => {
        console.log("Button clicked");
        handleSendMessage();
    });

    // Gestion de l'event pour gérer la touche entré pour l'envoi du message
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log("Enter key pressed");
            handleSendMessage();
        }
    });

    // Gestion de l'event pour la sélection du bot
    botList.addEventListener('click', (e) => {
        const botItem = e.target.closest('.bot-item');
        if (botItem) {
            if (selectedBot) {
                document.querySelector(`[data-bot="${selectedBot}"]`).classList.remove('selected');
            }
            selectedBot = botItem.dataset.bot;
            botItem.classList.add('selected');
            loadConversationUI(selectedBot);
        }
    });

    // Gestion de l'event pour gérer le click sur le bouton pour effacer la conversation du bot sélectionné
    clearConversationButton.addEventListener('click', () => {
        if (selectedBot) {
            conversations[selectedBot] = [];
            clearConversation(selectedBot);
            loadConversationUI(selectedBot);
        }
    });

    // Gestion de l'event pour gérer le click sur le bouton pour effacer toutes les conversations
    clearAllConversationsButton.addEventListener('click', () => {
        Object.keys(conversations).forEach(bot => {
            conversations[bot] = [];
            clearConversation(bot);
        });
        clearAllConversations();
        loadConversationUI(selectedBot);
    });

    // Initialise l'interface avec le premier bot de la liste
    selectedBot = Object.keys(conversations)[0];
    document.querySelector(`[data-bot="${selectedBot}"]`).classList.add('selected');
    loadConversationUI(selectedBot);
});

// Gestion de l'event pour sauvegarder les convs avant de fermer la page
window.addEventListener('beforeunload', () => {
    console.log("Saving conversations to localStorage");
    Object.keys(conversations).forEach(botName => {
        saveConversation(botName, conversations[botName]);
    });
});
