import { bots } from '../script/bots.js';

export const home = () => {
  return `
    <div class="app-container">
      <div class="sidebar">
        <div class="bot-list" id="bot-list">
          ${bots.map(bot => `
            <div class="bot-item" data-bot="${bot.name}">
              <img src="${bot.avatar}" alt="${bot.name}" class="bot-avatar"/>
              <span>${bot.name}</span>
            </div>
          `).join('')}
        </div>
        <div class="user-list">
          <div class="user-item">
            <img src="user_avatar_url" alt="User" class="user-avatar"/>
            <span>User list</span>
          </div>
        </div>
      </div>
      <div class="chat-container">
        <div id="message-list" class="message-list"></div>
        <div class="message-input-container">
          <input type="text" id="message-input" placeholder="Write a message...">
          <button id="send-button">Send</button>
        </div>
        <div class="conversation-buttons">
          <button id="clear-conversation-button">Clear Conversation</button>
          <button id="clear-all-conversations-button">Clear All Conversations</button>
        </div>
      </div>
    </div>
  `;
};



console.log("home.js loaded");

