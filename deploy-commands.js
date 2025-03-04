require('dotenv').config();

// Environment variables
process.env.DISCORD_TOKEN = 'Discord token';
process.env.CLIENT_ID = 'application id';
process.env.GUILD_ID = 'discord server id';

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Debug logging
console.log('Token:', process.env.DISCORD_TOKEN ? 'Token is aanwezig' : 'Token ontbreekt');
console.log('Client ID:', process.env.CLIENT_ID ? 'Client ID is aanwezig' : 'Client ID ontbreekt');
console.log('Guild ID:', process.env.GUILD_ID ? 'Guild ID is aanwezig' : 'Guild ID ontbreekt');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error:', error);
    }
})(); 