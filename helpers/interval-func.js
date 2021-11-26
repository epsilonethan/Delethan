const fs = require('fs');


module.exports={
	deleteMessages: async function(client){
		let rules = JSON.parse(fs.readFileSync('./delethan-config.json', 'utf-8'));
		let currentTime = new Date().getTime();
		let cutOffTime;
		let channel;
		let message;
		let messagesDeleted;

		for (let i = 0; i < rules.length; i++){
			cutOffTime = currentTime - (rules[i].lifetime * 3600000);
			channel = await client.channels.fetch(rules[i].channelId);
			messages = await channel.messages.fetch();
			messages = messages.toJSON();
			messagesDeleted = false;

			console.log(`\tChannel #${channel.name}: Checking for messages older than ${rules[i].lifetime} hr`);
			
			for (message of messages){
				if (message.createdTimestamp <= cutOffTime){
					message.delete().then(msg => console.log(`\t\tDeleted message from ${msg.author.username} sent at ${msg.createdTimestamp}`));
					messagesDeleted = true;
				} 
			}
			if(!messagesDeleted){
				console.log(`\t\tNo messages were deleted`);
			}
		}
	}
}