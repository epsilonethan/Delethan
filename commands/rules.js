const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Returns the list of all rules'),
	async execute(interaction) {
		let rules = JSON.parse(fs.readFileSync('./delethan-config.json', 'utf8'))
						.filter(rules => rules.guildId == interaction.member.guild.id);
		let message;
		let firstMessage = 0;

		if(rules.length > 0){
			for (let i=0; i < rules.length; i++){
				if (firstMessage){
					message = `Rule ${rules[i].ruleId}: Channel #${rules[i].channel} will have messages deleted that are older than ${rules[i].lifetime} hr`
					firstMessage++;
				} else{
					message += `\nRule ${rules[i].ruleId}: Channel #${rules[i].channel} will have messages deleted that are older than ${rules[i].lifetime} hr`
				}
			
			}
			await interaction.reply(message);
		} else{
			await interaction.reply('No rules have been created yet!')
		}
	},
};
