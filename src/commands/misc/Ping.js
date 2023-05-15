import {SlashCommandBuilder} from 'discord.js'

class Ping {
	commandInfos= new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong???')

	async run(discordClient, interaction) {
		interaction.reply('Pong!')
	}
}

export default Ping