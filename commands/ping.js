const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Toont de bot\'s latency'),

    async execute(interaction) {
        // Stuur een "denk" bericht
        await interaction.deferReply();

        // Bereken de latency
        const latency = Date.now() - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        // Maak een mooie embed
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('🏓 Pong!')
            .addFields(
                { name: 'Bot Latency', value: `${latency}ms`, inline: true },
                { name: 'API Latency', value: `${apiLatency}ms`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Gebruik /ping om de latency te controleren' });

        // Stuur de embed als antwoord
        await interaction.editReply({ embeds: [embed] });
    },
}; 