const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-rule')
		.setDescription('Sets a rule for deleting messages'),
	async execute(interaction) {
		await interaction.reply(`Rule has been created!`);
	},
};
