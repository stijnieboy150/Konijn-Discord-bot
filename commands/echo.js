const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Herhaal een bericht')
        .addStringOption(option =>
            option.setName('bericht')
                .setDescription('Het bericht dat je wilt herhalen')
                .setRequired(true)),

    async execute(interaction) {
        const bericht = interaction.options.getString('bericht');

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('📢 Echo')
            .setDescription(bericht)
            .setTimestamp()
            .setFooter({ text: `Gebruikt door ${interaction.user.tag}` });

        await interaction.reply({ embeds: [embed] });
    },
}; 