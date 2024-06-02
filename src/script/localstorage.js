// storage.js

export function saveConversation(botName, conversation) {
    localStorage.setItem(`conversation_${botName}`, JSON.stringify(conversation));
}

export function loadConversation(botName) {
    const data = localStorage.getItem(`conversation_${botName}`);
    return data ? JSON.parse(data) : [];
}

export function clearConversation(botName) {
    localStorage.removeItem(`conversation_${botName}`);
}

export function clearAllConversations() {
    Object.keys(localStorage)
        .filter(key => key.startsWith('conversation_'))
        .forEach(key => localStorage.removeItem(key));
}
