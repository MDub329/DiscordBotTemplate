// Import the discord.js module
const Discordjs = require('discord.js');
//Utility Commands
const utilCommands = require('./utility.js');

const fs = require('fs');


class TableCommand {

    //Command 
    commandName = "FILEMSG";

    expectedParms = 0;

    async handle(PassedMessage, user, args, client, guild) {
        try {
            var newdata
            try {
                const data = fs.readFileSync('./data.txt', 'utf-8');
                newdata = data.split('\n');
            } catch (error) {
                console.log(error);
            }

            const exampleEmbed = new Discordjs.MessageEmbed()
                .setColor('#C93632')
                .setURL('https://www.spl.gg/l/index.html')
                .setTitle('Current Standings (Qualified for Pro)')

            for (var i = 0; i < 10; i++) {
                var temp = newdata[i].split('\t');
                exampleEmbed.addField(i + 1 + ': ' + temp[0], 'Current Points: ' + temp[1], false);
            }

            PassedMessage.channel.send(exampleEmbed);

            PassedMessage.delete();
        } catch (error) {
            PassedMessage.channel.send('Try again');
            console.log(error)
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

module.exports = new TableCommand();