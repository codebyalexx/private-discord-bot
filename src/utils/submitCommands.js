import { REST } from "discord.js";

async function submitCommands(commandsCollection, redisClient) {
  await redisClient.connect();
  const submitDelayKey = `dsc_${process.env.DISCORD_CLIENT_ID}_submit`;
  const cmdDelayVal = await redisClient.get(submitDelayKey);
  if (cmdDelayVal) return;

  const rest = new REST().setToken(process.env.DISCORD_TOKEN);

  try {
    console.log(
      `Started refreshing ${commandsCollection.length} application (/) commands.`
    );

    const commands = [];
    commandsCollection.forEach((command) => {
      commands.push(command.commandInfos);
    });

    const data = await rest.put(
      `/applications/${process.env.DISCORD_CLIENT_ID}/commands`,
      { body: commands }
    );

    await redisClient.set(submitDelayKey, "OK", 60 * 15);
    await redisClient.diconnect();

    console.log(
      `Successfully updated ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}

export default submitCommands;
