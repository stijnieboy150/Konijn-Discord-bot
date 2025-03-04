require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.prefix = '-';

// Laad commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// Event handler
client.on('ready', () => {
    console.log(`Bot is online als ${client.user.tag}!`);
});

// Prefix command handler
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        // Maak een interaction object na
        const interaction = {
            reply: async (options) => {
                if (options.embeds) {
                    await message.reply({ embeds: options.embeds });
                } else {
                    await message.reply(options.content);
                }
            },
            deferReply: async () => {
                await message.channel.sendTyping();
            },
            editReply: async (options) => {
                if (options.embeds) {
                    await message.reply({ embeds: options.embeds });
                } else {
                    await message.reply(options.content);
                }
            },
            options: {
                getString: () => args[0],
                getInteger: () => parseInt(args[0]),
                getBoolean: () => args[0] === 'true',
                getNumber: () => parseFloat(args[0]),
                getChannel: () => message.mentions.channels.first(),
                getRole: () => message.mentions.roles.first(),
                getUser: () => message.mentions.users.first(),
                getMember: () => message.mentions.members.first(),
            }
        };

        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await message.reply('Er is een fout opgetreden bij het uitvoeren van dit command!');
    }
});

// Slash command handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ 
            content: 'Er is een fout opgetreden bij het uitvoeren van dit command!', 
            ephemeral: true 
        });
    }
});

client.login(process.env.DISCORD_TOKEN); 