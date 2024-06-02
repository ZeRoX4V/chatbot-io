import axios from 'axios';

console.log("bots.js loaded"); // Log pour vérifier le chargement du fichier

const jokeBot = {
    name: 'Siri',
    avatar: 'blue',
    actions: [
        {
            trigger: (message) => message.toLowerCase().includes('joke'),
            response: async () => {
                const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
                return `${res.data.setup} - ${res.data.punchline}`;
            }
        },
        {
            trigger: (message) => message.toLowerCase().includes('ten'),
            response: async () => {
                const res = await axios.get('https://official-joke-api.appspot.com/jokes/ten');
                return `${res.data.type} - ${res.data.setup} - ${res.data.punchline}`;
            }
        },
        {
            trigger: (message) => message.toLowerCase().includes('help'),
            response: async () =>
                'Commande disponible: joke, ten, help'
        },
    ]

};

const weatherBot = {
    name: 'Météo',
    avatar: 'green',
    actions: [
        {
            trigger: (message) => message.toLowerCase().includes('weather'),
            response: async () => {
                const res = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=YOUR_API_KEY');
                return `The weather in Paris is ${res.data.weather[0].description} with a temperature of ${res.data.main.temp}K.`;
            }
        }
    ]
};

const chatBot = {
    name: 'Sam',
    avatar: 'red',
    actions: [
        {
            trigger: (message) => message.toLowerCase().includes('help'),
            response: async () => 'Available commands: joke, weather, help'
        },
        {
            trigger: (message) => message.toLowerCase().includes('hello'),
            response: async () => 'Hello! How can I assist you today?'
        }
    ]
};


export const bots = [jokeBot, weatherBot, chatBot];

console.log("Bots initialized:", bots); // Log pour vérifier l'initialisation des bots
