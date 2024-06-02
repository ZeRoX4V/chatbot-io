import { saveConversation, loadConversation, clearConversation, clearAllConversations } from './localstorage.js';
import { home } from '../page/home.js';
import { bots } from './bots.js';
import { displayMessage, scrollToBottom } from './message.js';
import '../style.css';

console.log("util.js loaded"); // Log pour vérifier le chargement du fichier principal

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = home();

    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messageList = document.getElementById('message-list');
    const botList = document.getElementById('bot-list');
    const clearConversationButton = document.getElementById('clear-conversation-button');
    const clearAllConversationsButton = document.getElementById('clear-all-conversations-button');

    let selectedBot = null;
    const conversations = {
        Siri: loadConversation('Siri'),
        Météo: loadConversation('Météo'),
        Sam: loadConversation('Sam')
    };

    function loadConversationUI(bot) {
        messageList.innerHTML = '';
        conversations[bot].forEach(msg => {
            displayMessage(msg.text, msg.type, msg.name, msg.avatar, msg.time);
        });
        scrollToBottom(messageList);
    }

    function handleSendMessage() {
        console.log("handleSendMessage called");

        const message = messageInput.value.trim();
        if (!message || !selectedBot) return;

        const time = new Date().toLocaleTimeString();
        const sentMessage = { text: message, type: 'sent', name: 'You', avatar: '', time };
        conversations[selectedBot].push(sentMessage);
        displayMessage(message, 'sent', 'You', '', time);
        messageInput.value = '';
        scrollToBottom(messageList);

        saveConversation(selectedBot, conversations[selectedBot]); // Save conversation after sending a message

        handleBotResponses(message);
    }

    function handleBotResponses(message) {
        const bot = bots.find(b => b.name === selectedBot);
        if (!bot) return;

        bot.actions.forEach(action => {
            if (action.trigger(message)) {
                action.response().then(responseMessage => {
                    const time = new Date().toLocaleTimeString();
                    const receivedMessage = { text: responseMessage, type: 'received', name: bot.name, avatar: bot.avatar, time };
                    conversations[selectedBot].push(receivedMessage);
                    displayMessage(responseMessage, 'received', bot.name, bot.avatar, time);
                    scrollToBottom(messageList);

                    saveConversation(selectedBot, conversations[selectedBot]); // Save conversation after receiving a bot response
                });
            }
        });
    }

    sendButton.addEventListener('click', () => {
        console.log("Button clicked");
        handleSendMessage();
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log("Enter key pressed");
            handleSendMessage();
        }
    });

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

    clearConversationButton.addEventListener('click', () => {
        if (selectedBot) {
            conversations[selectedBot] = [];
            clearConversation(selectedBot);
            loadConversationUI(selectedBot);
        }
    });

    clearAllConversationsButton.addEventListener('click', () => {
        Object.keys(conversations).forEach(bot => {
            conversations[bot] = [];
            clearConversation(bot);
        });
        clearAllConversations();
        loadConversationUI(selectedBot);
    });

    selectedBot = Object.keys(conversations)[0];
    document.querySelector(`[data-bot="${selectedBot}"]`).classList.add('selected');
    loadConversationUI(selectedBot);
});

window.addEventListener('beforeunload', () => {
    console.log("Saving conversations to localStorage");
    Object.keys(conversations).forEach(botName => {
        saveConversation(botName, conversations[botName]);
    });
});
