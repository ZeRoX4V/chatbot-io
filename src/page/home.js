import { bots } from '../script/bots.js';

export const home = () => {
  return `
    <div class="app-container">
      <div class="sidebar">
        <div class="bot-list" id="bot-list">
        <h3>Les sujets : </h3>
          ${bots.map(bot => `
            <div class="bot-item" data-bot="${bot.name}">
              <img src="${bot.avatar}" alt="${bot.name}" class="bot-avatar"/>
              <span>${bot.name}</span>
            </div>
          `).join('')}
        </div>
        <div class="user-list">
          <div class="user-item" id="open-link">
          <a href="https://mario-kart-3-js.vercel.app/#r=RXW84m" target="_blank">
            <img src="public/images/kc.png" alt="User" class="user-avatar" />
            </a>
            <span>Le Roi</span>       
          </div>
          <script>
          document.getElementById('open-link').addEventListener('click', function() {
              window.open('https://mario-kart-3-js.vercel.app/#r=RXW84', '_blank');
          });
      </script>
        </div>
      </div>
      <div class="chat-container">
        <div id="message-list" class="message-list"></div>
        <div class="message-input-container">
          <input type="text" id="message-input" placeholder="Ecrivez un message...">
          <button id="send-button">Envoyer</button>
        </div>
        <div class="conversation-buttons">
          <button id="clear-conversation-button">Supprimer la conversation</button>
          <button id="clear-all-conversations-button">Supprimer toutes les conversations</button>
        </div>
      </div>
    </div>
  `;
};



console.log("home.js loaded");

