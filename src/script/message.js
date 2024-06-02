console.log("message.js loaded"); // Log pour vérifier le chargement du fichier


export function displayMessage(text, type, name = 'You', avatar = '', time = new Date().toLocaleTimeString()) {
    const messageList = document.getElementById('message-list');

    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;

    const avatarElement = document.createElement('div');
    avatarElement.className = 'avatar';
    avatarElement.textContent = name[0];
    if (avatar) {
        avatarElement.style.backgroundImage = `url(${avatar})`;
    }

    const contentElement = document.createElement('div');
    contentElement.className = 'content';
    contentElement.textContent = text;

    const timeElement = document.createElement('div');
    timeElement.className = 'time';
    timeElement.textContent = time;

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(contentElement);
    messageElement.appendChild(timeElement);
    messageList.appendChild(messageElement);
}

export function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}
