const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-rule')
		.setDescription('Sets a rule for auto-removing messages'),
	async execute(interaction) {
		await interaction.reply(`Rule has been created!`);
	},
};
