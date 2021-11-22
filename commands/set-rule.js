const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-rule')
		.setDescription('Sets a rule for auto-removing messages')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to be watched')
				.setRequired(true)
				)
		.addIntegerOption(option =>
			option.setName('lifetime')
				.setDescription('The lifetime of message in the channel')
				.setRequired(true)
				),
	async execute(interaction) {
		let rules = JSON.parse(fs.readFileSync('delethan-config.json', 'utf-8'));
		let ruleIdMax = 0;
		let exists = false;

		for (let i = 0; i < rules.length; i++){
			if(rules[i].ruleId > ruleIdMax){
				ruleIdMax = rules[i].ruleId;
			}
		}

		for (let i = 0; i < rules.length; i++){
			if(rules[i].channelId == interaction.options.get('channel').value){
				if(rules[i].lifetime == interaction.options.get('lifetime').value){
					await interaction.reply(`Rule already exists!`);
					exists = true;
					break
				} else{
					rules[i].lifetime = interaction.options.get('lifetime').value
					await interaction.reply(`Rule for Channel ${interaction.options.get('channel').channel.name} has been updated!`)
					exists = true;
					break
				}
			}			
		}

		if (!exists){
			rules.push({
				ruleId: ruleIdMax+1, 
				lifetime: interaction.options.get('lifetime').value,
				channel: interaction.options.get('channel').channel.name,
				channelId: interaction.options.get('channel').value
			})
			await interaction.reply(`Rule has been created!`);
		}

		let writeFile = fs.writeFileSync('delethan-config.json', JSON.stringify(rules), 'utf-8');
	},
};
