const fs = require('fs');


module.exports={
	messageCheck: function() {
		const intervalObj = setInterval((rule) => {
			console.log("Checking messages");
		}, 10000)
	},
	rulesCheck: function() {
		const constintervalObj = setInterval((path) => {
			console.log("Checking rules config file");
		}, 10000)
	},
	reviewMessages: function(client){
		let rules = JSON.parse(fs.readFileSync('./delethan-config.json', 'utf-8'))
		let currentTime = new Date().getTime();
		let cutOffTime;
		console.log(currentTime);
		for (let i = 0; i < rules.length; i++){
			cutOffTime = currentTime - (rules[i].lifetime * 3600000);
			console.log(cutOffTime);

			let channel = client.channels.fetch(rules[i].channelId).then(channel => {return channel}).catch(err => {console.log(err)})

			console.log(channel);

			client.channels.fetch(rules[i].channelId).then((channel) => {
				//console.log(channel);
				channel.messages.fetch().then((messageCollection) => {
					//console.log(messageCollection);
					messageCollection.forEach((message) => {
						//console.log("MESSAGE " + i);
						//console.log(message.createdTimestamp);
						//console.log(message.deleted);
						if (message.createdTimestamp <= cutOffTime){
							// console.log("Inside the for loop")
							// console.log("	createdTimestamp")
							// console.log(message.createdTimestamp)
							// console.log("	cutoff time")
							// console.log(cutOffTime)
							//message.delete().then(msg => console.log(`Deleted message from ${msg.author.username}`))
						} else{
							//console.log("	Message not deleted");
						}
						//console.log("FINISHED DELETION ROUND!")
						
					})
					//console.log("EXITED FOREACH!")
				})
				//console.log("EXITED MESSAGE FETCH")
			})
			//console.log("EXITED CHANNELS FETCH")
		}
	}
}