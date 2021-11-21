const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-rule')
		.setDescription('Deletes a rule for auto-removing messages'),
	async execute(interaction) {
		await interaction.reply(`Rule has been deleted!`);
	},
};
