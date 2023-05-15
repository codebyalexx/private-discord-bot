class InteractionCreate {
	async run(discordClient, interaction) {
		if (!interaction.isChatInputCommand()) return

		const command = discordClient.client.commands.get(interaction.commandName)

		if (!command) return console.error(`No command matching ${interaction.commandName} was found.`)

		try {
			await command.run(discordClient, interaction)
		} catch (error) {
			console.error(error)
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
			}
		}
	}
}

export default InteractionCreate

