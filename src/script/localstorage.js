//Fonction pour save une conv dans le localstorage
export function saveConversation(botName, conversation) {
    localStorage.setItem(`conversation_${botName}`, JSON.stringify(conversation));
}

//Fonction pour chager une conv du localstorage pour le bot sélectionné
export function loadConversation(botName) {
    const data = localStorage.getItem(`conversation_${botName}`);
    return data ? JSON.parse(data) : [];
}

//Fonction pour supprimer une conversation du localstorage pour le bot sélectionné
export function clearConversation(botName) {
    localStorage.removeItem(`conversation_${botName}`);
}

//Fonction pour supprimer toutes les conversations du localstorage
export function clearAllConversations() {
    Object.keys(localStorage)
        .filter(key => key.startsWith('conversation_'))
        .forEach(key => localStorage.removeItem(key));
}
