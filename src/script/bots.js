import axios from 'axios';

// Clé API pour bot météo
const API_KEY_WEATHER = '6b0b8e1b679b272fd1922f93b1bed175';

// Bot Kev
const jokeBot = {
    name: 'Kev',
    avatar: 'public/images/kev.png',
    actions: [
        {
            // Commande 1 du bot
            trigger: (message) => message.toLowerCase().includes('random'),
            response: async (message) => {
                const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
                return `Blague aléatoire:\n${res.data.setup} - ${res.data.punchline}`;
            }
        },
        {
            // Commande 2 du bot
            trigger: (message) => message.toLowerCase().includes('générales'),
            response: async (message) => {
                const res = await axios.get('https://official-joke-api.appspot.com/jokes/general/ten');
                const joke = res.data[0];
                return `Blague générale:\n${joke.setup} - ${joke.punchline}`;
            }
        },
        {
            // Commande 3 du bot
            trigger: (message) => message.toLowerCase().includes('programmation'),
            response: async (message) => {
                const res = await axios.get('https://official-joke-api.appspot.com/jokes/programming/ten');
                const joke = res.data[0];
                return `Blague de programmation:\n${joke.setup} - ${joke.punchline}`;
            }
        },
        {
            // Commande help du bot
            trigger: (message) => message.toLowerCase().includes('help'),
            response: async (message) =>
                'Commandes disponibles pour le bot Kev(#Humour): \nrandom, \nprogrammation, \ngénérales, \nhelp'
        },
    ]
};

// Bot météo
const weatherBot = {
    name: 'Météo',
    avatar: 'public/images/Toobo.png',
    actions: [
        {
            // Commande 1 du bot
            trigger: (message) => message.toLowerCase().startsWith('météo:'),
            response: async (message) => {
                const city = message.split(':')[1].trim();
                if (!city) return 'Veuillez indiquer une ville';
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
                return `La météo à ${city} est ${res.data.weather[0].description} avec une température de ${res.data.main.temp}°C.`;
            }
        },
        {
            // Commande 2 du bot
            trigger: (message) => message.toLowerCase().startsWith('prévisions:'),
            response: async (message) => {
                const city = message.split(':')[1].trim();
                if (!city) return 'Veuillez indiquer une ville';
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
                return `Les prévisions pour ${city}: ${res.data.list.slice(0, 3).map(forecast => `${forecast.dt_txt}: ${forecast.weather[0].description}, ${forecast.main.temp}°C`).join('\n')}`;
            }
        },
        {
            // Commande 3 du bot
            trigger: (message) => message.toLowerCase().startsWith('humidité:'),
            response: async (message) => {
                const city = message.split(':')[1].trim();
                if (!city) return 'Veuillez indiquer une ville';
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
                return `L'humidité à ${city} est de ${res.data.main.humidity}%.`;
            }
        },
        {
            // Commande help du bot
            trigger: (message) => message.toLowerCase().includes('help'),
            response: async (message) => {
                return `Liste des commandes : \nmétéo:<ville>, \nprévisions:<ville> \nhumidité:<ville>, \nhelp`;
            }
        }
    ]
};

// Bot SpaceX
const SpaceXBot = {
    name: 'SpaceX',
    avatar: 'public/images/elon.png',
    actions: [
        {
            // Commande 1 du bot
            trigger: (message) => message.toLowerCase().includes('prochain-lancement'),
            response: async (message) => {
                const response = await axios.get('https://api.spacexdata.com/v4/launches/next');
                if (!response.data) {
                    throw new Error('Aucun lancement trouvé');
                }
                const data = response.data;
                const launchDate = new Date(data.date_utc).toLocaleString();
                return `Prochain lancement SpaceX:\nMission: ${data.name}, \nNuméro de vol: ${data.flight_number}, \nDate de lancement: ${launchDate}`;
            }
        },
        {
            // Commande 2 du bot
            trigger: (message) => message.toLowerCase().includes('dernier-lancement'),
            response: async (message) => {
                const response = await axios.get('https://api.spacexdata.com/v4/launches/latest');
                if (!response.data) {
                    throw new Error('Aucun lancement trouvé');
                }
                const data = response.data;
                const launchDate = new Date(data.date_utc).toLocaleString();
                return `Dernier lancement SpaceX:\nMission: ${data.name}, \nNuméro de vol: ${data.flight_number}, \nDate de lancement: ${launchDate}`;
            }
        },
        {
            // Commande 3 du bot
            trigger: (message) => message.toLowerCase().includes('info-fusée:'),
            response: async (message) => {
                const rocketName = message.split(':')[1].trim();
                console.log('rocketName : ' + rocketName);
                if (!rocketName) return 'Veuillez indiquer le nom d\'une fusée';

                // Récupère la liste de toutes les fusées et trouve celle qui correspond au nom donné
                const rocketListResponse = await axios.get('https://api.spacexdata.com/v4/rockets');
                const rocket = rocketListResponse.data.find(r => r.name.toLowerCase() === rocketName.toLowerCase());

                if (!rocket) {
                    return `Fusée "${rocketName}" pas trouvée. Veuillez vérifier le nom et réessayer.`;
                }

                const hauteur = rocket.height.meters + ' mètres';
                const diametre = rocket.diameter.meters + ' mètres';
                const poids = rocket.mass.kg + ' kg';
                return `Information sur la fusée:\nNom: ${rocket.name}, \nDescription: ${rocket.description}, \nHauteur: ${hauteur}, \nDiamètre: ${diametre}, \nPoids: ${poids}`;
            }
        },
        {
            // Commande help du bot
            trigger: (message) => message.toLowerCase().includes('help'),
            response: async (message) =>
                'Commandes disponibles pour le bot SpaceX(#Fusée): \nprochain-lancement, \ndernier-lancement, \ninfo-fusée:<nom de la fusée>, \nhelp'
        },
    ]
};

// Exporte les bots
export const bots = [jokeBot, weatherBot, SpaceXBot];

// Ajoute la commande commune à tout les bots
bots.forEach(bot => {
    bot.actions.push({
        trigger: (message) => message.toLowerCase() === 'salut',
        response: async (message) => `Bonjour mon roi c'est ${bot.name} votre fidèle serviteur.`
    });
});
