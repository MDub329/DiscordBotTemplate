//Import the discord.js module
const Discordjs = require('discord.js');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/dev.env' });

//Discord bot Auth
const auth = process.env.AUTH;

const { Console } = require('console');

//import commandHandler Module
const commandHandler = require('./commandHandler');

//Create an instance of a Discord client
const client = new Discordjs.Client();

//IDs
const GUILD_ID = "126889468870393856";
const GENERAL_CHAT_ID = "696434669629210685";

const Discord = {
    guild: null,
    generalChannel: null,
};


//Start the bot

Discord.init = () => {
    console.log("Initalizing Startup");
    client.on('ready', async () => {
        //Set the status of bot and grab guild/main chat objects
        console.log("Bot Online");
        client.user.setActivity('BOT', { type: 'WATCHING' });
        Discord.guild = await client.guilds.cache.get(GUILD_ID);
        Discord.generalChannel = await client.channels.cache.get(GENERAL_CHAT_ID);
    });

    //Bot login with the Auth Token
    client.login(auth);

    //Call Commandhandler to handle the rest of the bot functions
    commandHandler.commands(client, Discord.guild)
}

//Call the Init method
Discord.init();
module.exports = Discord;