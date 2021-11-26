const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-rule')
		.setDescription('Deletes a rule for auto-removing messages')
		.addIntegerOption(option =>
			option.setName('rule-id')
				.setDescription('The ID of a rule to delete')
				.setRequired(true)
				),
	async execute(interaction) {
		let rules = JSON.parse(fs.readFileSync('./delethan-config.json', 'utf-8'));
		ruleExists = false;

		for(let i = 0; i < rules.length; i++){
			if(rules[i].ruleId == interaction.options.get('rule-id').value){
				rules.splice(i, 1);
				ruleExists = true;
				break
			}
		}
		
		if (ruleExists){
			fs.writeFileSync('./delethan-config.json', JSON.stringify(rules), 'utf-8');
			await interaction.reply(`Rule ID ${interaction.options.get('rule-id').value} has been deleted`)
		} else{
			await interaction.reply(`Rule ID ${interaction.options.get('rule-id').value} does not exist!`)
		}
	},
};
