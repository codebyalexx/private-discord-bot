import {Client} from 'discord.js'

class DiscordClient {
	constructor(clientToken, clientOptions) {
		this.token = clientToken
		this.opts = clientOptions
	}

	init() {
		/* It's creating the discord instance */
		this.client = new Client(this.opts)

		/* It's loading the events TODO */

		/* It's loading the slash commands TODO */

		/* It's sign in to the Discord Bot to the Discord API */
		console.log('Now connecting to the Discord API...')
		this.client.login(this.token).then(() => {
			console.log('Bot successfully connected to Discord API!')
		}).catch(() => {
			console.error('An error has occurred while trying to connect to Discord API!')
		})
	}
}

export default DiscordClient