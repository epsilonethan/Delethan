const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('How to use Delethan Bot'),
	async execute(interaction) {
		await interaction.reply(`/set-rule <channel name> <message liftime> optional{<user>}`);
	},
};
