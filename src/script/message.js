//Fonction pour afficher un message dans la conv
export function displayMessage(text, type, name = 'You', avatar = '', time = new Date().toLocaleTimeString()) {

    const messageList = document.getElementById('message-list');

    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;

    const avatarElement = document.createElement('div');
    avatarElement.className = 'avatar';

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

//Fonction pour faire défiler la conversation jusqu'en bas
export function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}
