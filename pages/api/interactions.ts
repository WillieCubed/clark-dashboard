// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { Client, Intents } from 'discord.js';
import { INTERNAL_ERROR } from '../../lib/api-utils';
import type { APIError } from '../../lib/api-utils';

/**
 * Handle Discord user interactions.
 */
export default function interactionsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Record<any, any> | APIError>
) {
  const discordToken = process.env.DISCORD_BOT_TOKEN;
  if (!discordToken) {
    res.status(500).send(INTERNAL_ERROR);
    throw new Error('DISCORD_BOT_TOKEN not found!');
  }

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  const { type, id, data } = req.body;

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    switch (name) {
      case 'test':
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Hello user!',
          },
        });
    }
  }
  return res.status(500).send(INTERNAL_ERROR);
}
