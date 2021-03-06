// Require the necessary discord.js classes
const fs =  require('fs');
const { Client, Collection, Intents } = require('discord.js');
const {deleteMessages} = require('./helpers/interval-func.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
	if (!fs.existsSync('./delethan-config.json')){
		console.log('Writing new Delethan config file')
		let writeFile = fs.writeFileSync('./delethan-config.json', '[]', 'utf-8')
	};
	const messageCheckInterval = setInterval(() => {
		currentTime = new Date().getTime()
		console.log(`(${currentTime}) Checking messages`);
		deleteMessages(client);
	}, 60000)
	

});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(JSON.parse(fs.readFileSync('./config.json', 'utf-8')).token)
