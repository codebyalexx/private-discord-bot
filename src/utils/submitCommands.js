import {REST} from 'discord.js'

async function submitCommands(commandsCollection) {
	const rest = new REST().setToken(process.env.DISCORD_TOKEN)

	try {
		console.log(`Started refreshing ${commandsCollection.length} application (/) commands.`)

		const commands = []
		commandsCollection.forEach((command) => {
			commands.push(command.commandInfos)
		})

		const data = await rest.put(
			`/applications/${process.env.DISCORD_CLIENT_ID}/commands`,
			{ body: commands }
		)

		console.log(`Successfully updated ${data.length} application (/) commands.`)
	} catch (error) {
		console.error(error)
	}
}

export default submitCommands