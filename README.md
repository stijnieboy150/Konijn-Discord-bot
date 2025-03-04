# Discord Bot

Een Discord bot gemaakt met Discord.js v14 die zowel prefix commands (`-`) als slash commands (`/`) ondersteunt.

## Installatie

1. Clone deze repository
2. Installeer de dependencies:
```bash
npm install
```
3. Maak een `.env` bestand aan met de volgende inhoud:
```
DISCORD_TOKEN=jouw_bot_token
CLIENT_ID=jouw_client_id
GUILD_ID=jouw_guild_id
```
4. Start de bot:
```bash
node index.js
```

## Commands
- `/ping` of `-ping`: Toont de bot's latency
- `/echo` of `-echo <bericht>`: Herhaalt een bericht in een mooie embed

## Hoe maak je een command?

### Basis Command
```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commandnaam')
        .setDescription('Beschrijving van het command'),
    
    async execute(interaction) {
        await interaction.reply('Reactie van de bot');
    },
};
```

### Embed Command
```javascript
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedcommand')
        .setDescription('Een command met een embed'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Titel van de embed')
            .setDescription('Beschrijving van de embed')
            .addFields(
                { name: 'Normaal veld', value: 'Waarde' },
                { name: 'Inline veld', value: 'Waarde', inline: true },
                { name: 'Inline veld', value: 'Waarde', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Footer tekst' });

        await interaction.reply({ embeds: [embed] });
    },
};
```

### Command met Opties
```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commandmetopties')
        .setDescription('Een command met opties')
        .addStringOption(option =>
            option.setName('tekst')
                .setDescription('Voer een tekst in')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('nummer')
                .setDescription('Voer een nummer in')
                .setRequired(false)),
    
    async execute(interaction) {
        const tekst = interaction.options.getString('tekst');
        const nummer = interaction.options.getInteger('nummer') ?? 0;
        
        await interaction.reply(`Je hebt "${tekst}" en ${nummer} ingevoerd!`);
    },
};
```

## Prefix Commands
De bot ondersteunt ook prefix commands met het `-` teken. Bijvoorbeeld:
- `-ping` in plaats van `/ping`
- `-echo Hallo wereld` in plaats van `/echo bericht:Hallo wereld`

Prefix commands werken hetzelfde als slash commands, maar gebruiken een andere syntax. De opties worden als argumenten doorgegeven na het command.

## Command Registratie
Na het maken van een nieuw command, moet je deze registreren bij Discord:
```bash
node deploy-commands.js
```

## Vereisten
- Node.js 16.9.0 of hoger
- Een Discord bot token (te verkrijgen via Discord Developer Portal)
- Een Discord server waar je de bot kunt testen 
