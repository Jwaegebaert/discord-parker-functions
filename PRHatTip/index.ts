import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import DiscordJS, { GatewayIntentBits, TextChannel } from 'discord.js';
import crypto from 'crypto';
import axios from 'axios';
import _ from 'lodash';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const sig = Buffer.from(req.headers['x-hub-signature-256'] || '', 'utf8');
  const hmac = crypto.createHmac('sha256', process.env['HatTipSecret']);
  const digest = Buffer.from('sha256=' + hmac.update(req.rawBody).digest('hex'), 'utf8');

  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    context.res = {
      status: 401,
      body: 'Invalid key!'
    }
  }

  const action = req.body['action'] || '';
  const prInfo = req.body['pull_request'] || '';

  if (action === 'closed' && prInfo.labels.some(label => label.name === 'pr-merged')) {
    const user = await axios.get(prInfo.user.url);
    const name = user.data.name || user.data.login;
    const defaultMessages = [
      `**${name}**'s wonderful PR has just been merged. Thank you so much for your contribution! 🚀`,
      `CLI for Microsoft 365 has just been upgraded with the help of **${name}**. Thank you! 👏`,
      `A hat tip to **${name}** for their awesome contribution. 🎩`,
      `**${name}** has just contributed '${prInfo.title}'. Thank you! `,
      `woop, woop, **${name}** did an awesome job on contributing for the Microsoft 365 CLI!`,
      `No limits for **${name}**. Thank you for your amazing contribution! 👏`,
      `**${name}** did an astonishing contribution. Thank you for your hard work!`
    ];

    const docPRMessages = [
      `The pen is mightier than the sword, that's for sure! 📚 **${name}** proved just that by improving the docs.`,
      `**${name}** comprehends the value of proper documentation by updating the docs.`
    ];

    const bugPRMessages = [
      `Wooaah **${name}** squashed a bug! 🚀`,
      `**${name}** polished the CLI for Microsoft 365 by resolving the bug ${prInfo.title}.`,
      `Be gone bug! **${name}** made sure a bug will be no more. `
    ];

    const defaultEmojis = [
      '👏',
      '🚀',
      '🎩',
      '<:pepeHype:1025004228172861500>',
      '😍',
      '🤩',
      '💪',
      '🥳'
    ];

    const docEmojis = [
      '📚',
      '📖',
      '📙'
    ];

    const bugEmojis = [
      '🐞',
      '⚙️',
      '🔨',
      '⚒️',
      '🛠️'
    ];

    let message = '';
    let emojis = [];

    if (prInfo.labels.some(label => label.name === 'pr-bugfix')) {
      message = getRandomStringFromList(bugPRMessages);
      emojis.push(getRandomStringFromList(bugEmojis));
    } 
    else if (prInfo.labels.some(label => label.name === 'docs')) {
      message = getRandomStringFromList(docPRMessages);
      emojis.push(getRandomStringFromList(docEmojis));
    } else {
      message = getRandomStringFromList(defaultMessages);
    }
    
    const loopPicker = [ '1', '1', '1', '1', '1', '1', '2', '2', '2', '3' ];
    const loopAmount = +getRandomStringFromList(loopPicker);
    
    for (let index = 0; index < loopAmount; index++) {
      emojis.push(getRandomStringFromList(defaultEmojis));
    }

    emojis = _.uniq(emojis);

    const client = new DiscordJS.Client({
      intents: [
        GatewayIntentBits.GuildMessages
      ]
    });

    client.on('ready', async () => {
      const channel = (await client.channels.fetch(process.env['HatTipChannelId'])) as TextChannel;
      const sendMessage = await channel.send(message);

      emojis.forEach(async emoji => await sendMessage.react(emoji));
    });

    client.login(process.env['ParkerToken']);
  }

  context.res = {
    status: 204
  };
};

const getRandomStringFromList = (list: string[]): string => {
  return list[Math.floor(Math.random() * list.length)];
}

export default httpTrigger;