const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Het ip van KonijnhouseMC'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('KonijnhouseMC')
            .setDescription('Ip van KonijnhouseMC')
            .addFields(
                { name: 'IP', value: 'Coming soon', inline: true },
                { name: 'Poort', value: 'Coming soon', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Powered by Stijnieboy_150' });

        await interaction.reply({ embeds: [embed] });
    },
};