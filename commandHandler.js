// Import the discord.js module
const Discord = require('discord.js');

//Import Commands
const MsgDBCommand = require('./commands/MessageFromDB.js');
const MsgFileCommand = require('./commands/MessageFromFile.js');

//Utility Commands
const utilCommands = require('./commands/utility.js');

const commandHandler = {};
const commands = [
    MsgDBCommand,
    MsgFileCommand
];

//Build a list of command names that the bot will reconize from messages
for (let command of commands) {
    commandHandler[utilCommands.CommandInd + command.commandName] = command;
}

const commandsFunction = (client, guild) => {
    //Monitor for command messages

    client.on('message', message => {
        //If Message is from the bot itself ignore
        if (message.author.id === utilCommands.botID) { return; }

        //Split the arguments(Things passed in the message) into an array
        args = message.content.split(' ');

        //Check that message starts with the Indicator
        if (args[0].startsWith(utilCommands.CommandInd)) {

            //Store command name from message
            command = commandHandler[args[0].toUpperCase()];

            //Check that command exists and the user has the authority to run command
            if (!command || !command.hasAuthority(message)) {
                message.channel.send("You do not have authority on this command").then(errmsg => {
                    message.delete({ timeout: 3000, reason: 'none' });
                    errmsg.delete({ timeout: 3000, reason: 'none' });
                });
                return;
            }

            //Remove the command name from the array so only the paramaters are left
            args.shift();

            //Fetch the user object for the author of the message then call the command initated 
            client.users.fetch(message.author.id).then(myUser => {
                command.handle(message, myUser, args, client, guild);
            });
        }

    });
};

module.exports.commands = commandsFunction;