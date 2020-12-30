const Discord = require('discord.js');
const fs = require('fs');
const { createInterface } = require('readline');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.config = require('./config.json');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Bot Logged In");
})

client.on('message', message => {
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    if (!cmd) return; // If command doesn't exist, do nothing.

    // Run command if existant
    cmd.execute(message,args);
    
})

client.login(token)