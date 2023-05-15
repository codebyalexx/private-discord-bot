import dotenv from 'dotenv'
import DiscordClient from './components/DiscordClient.js'

/* It's importing the dotEnv configuration */
dotenv.config()

/* It's instancing the discord client */
const client = new DiscordClient(process.env.DISCORD_TOKEN, {
	intents: []
})
client.init()