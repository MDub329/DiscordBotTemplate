// Import the discord.js module
const Discordjs = require('discord.js');
//Utility Commands
const utilCommands = require('./utility.js');

const knex = require('../db')

class ScrimCommand {

    //Command 
    commandName = "DBMSG";

    expectedParms = 0;

    async handle(PassedMessage, user, args, client, guild) {
        try {
            var currentscrims = await knex.select().from('Scrims').where({ done: false });
            let messageEmbed = new Discordjs.MessageEmbed()
                .setTitle('Current Scrims')
                .setTimestamp();
            PassedMessage.channel.send(messageEmbed);
            for (var i = 0; i < currentscrims.length; i++) {
                let messageEmbed = new Discordjs.MessageEmbed()
                messageEmbed.addField('Team 1', currentscrims[i].Team1_Player1 + '\n' + currentscrims[i].Team1_Player2 + '\n' + currentscrims[i].Team1_Player3, true);
                messageEmbed.addField('vs', 'vs', true);
                messageEmbed.addField('Team 2', currentscrims[i].Team2_Player1 + '\n' + currentscrims[i].Team2_Player2 + '\n' + currentscrims[i].Team2_Player3, true);
                messageEmbed.addField('Time', currentscrims[i].time);
                messageEmbed.addField('Date', currentscrims[i].date.toString().substring(0, 10));
                messageEmbed.addField('accepted', currentscrims[i].accepted);
                messageEmbed.addField('Notes', currentscrims[i].Note);
                messageEmbed.setFooter('Scrim id: ' + currentscrims[i].id)
                PassedMessage.channel.send(messageEmbed);
            }
        } catch (error) {
            console.log(error)
            PassedMessage.channel.send('Error');
        }

    }

    hasAuthority(message) {
        if (message.member.roles.cache.has(utilCommands.adminRole)) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new ScrimCommand();