import * as fs from 'fs'
import * as path from 'path'
import submitCommands from './submitCommands.js'

async function loadCommands(discordClient) {
	/* it's getting sub folders of the commands folders */
	const subFolders = await fs.promises.readdir(path.join(
		process.cwd(), '/src/commands/'
	))

	/* it's getting the commands files within the sub folders */
	const files = []
	for await (const folder of subFolders) {
		const folderFiles = await fs.promises.readdir(path.join(
			process.cwd(), '/src/commands/', folder
		))
		folderFiles.forEach((file) => files.push(path.join(
			process.cwd(), '/src/commands/', folder, file
		)))
	}

	/* it's instancing the commands */
	for await (const file of files) {
		const commandImportStack = await import(file)
		const commandInstance = new commandImportStack.default()
		const commandName = commandInstance.commandInfos.name
		await discordClient.client.commands.set(commandName, commandInstance)
		console.log('Command ' + commandName + ' has been successfully loaded!')
	}

	/* it's submitting commands if required */
	//await submitCommands(discordClient.client.commands)
}

export default loadCommands