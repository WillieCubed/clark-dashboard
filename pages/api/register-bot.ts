import { NextApiRequest, NextApiResponse } from 'next';
import { APIError, INTERNAL_ERROR } from '../../lib/api-utils';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import commands from '../../lib/bot/commands.json';

/**
 * Register Discord bot application commands.
 */
export default async function interactionsHandler(
  req: NextApiRequest,
  res: NextApiResponse<string | APIError>
) {
  const discordToken = process.env.DISCORD_BOT_TOKEN;
  const discordClientId = process.env.DISCORD_CLIENT_ID;
  if (!discordToken) {
    res.status(500).send(INTERNAL_ERROR);
    throw new Error('DISCORD_BOT_TOKEN not found!');
  }
  if (!discordClientId) {
    res.status(500).send(INTERNAL_ERROR);
    throw new Error('DISCORD_CLIENT_ID not found!');
  }

  const restClient = new REST({ version: '9' }).setToken(discordToken);

  try {
    await restClient.put(Routes.applicationCommands(discordClientId), {
      body: commands,
    });
    console.info('Successfully registered application commands.');
    return res
      .status(200)
      .send('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
    return res.status(500).send(INTERNAL_ERROR);
  }
}
