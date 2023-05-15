import * as fs from 'fs'
import * as path from 'path'

async function loadEvents(discordClient) {
	/* It's getting events files from events folder */
	const eventsFiles = fs.readdirSync(path.join(
		process.cwd(), '/src/events/'
	))

	/* It's looping the events files to create the listeners */
	for await (const eventFile of eventsFiles) {
		/* It's creating the event related variables */
		const eventPath = path.join(process.cwd(), '/src/events/', eventFile)
		const eventName = eventFile.split('.')[0]
		const eventImportStack = await import(eventPath)
		const eventInstance = new eventImportStack.default()

		/* It's creating the event listener */
		discordClient.client.on(eventName, async(...args) => {
			await eventInstance.run(discordClient, ...args)
		})
		console.log('Bot now listening on ' + eventName + 'event')
	}
}

export default loadEvents