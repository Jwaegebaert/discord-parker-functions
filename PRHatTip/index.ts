import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import DiscordJS, { GatewayIntentBits, TextChannel } from 'discord.js';
import crypto from 'crypto';
import axios from 'axios';
import _ from 'lodash';
import { IHatTip, bugPRMessages, defaultPRMessages, docPRMessages } from '../Data/HatTipMessages';

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
    let hatTip = null;

    if (prInfo.labels.some(label => label.name === 'pr-bugfix')) {
      hatTip = getRandomHatTip(bugPRMessages);
    } 
    else if (prInfo.labels.some(label => label.name === 'docs')) {
      hatTip = getRandomHatTip(docPRMessages);
    } else {
      hatTip = getRandomHatTip(defaultPRMessages);
    }

    hatTip.message = hatTip.message.replace('$NAME', name);
    hatTip.message = hatTip.message.replace('$PRTITLE', prInfo.title);

    const client = new DiscordJS.Client({
      intents: [
        GatewayIntentBits.GuildMessages
      ]
    });

    client.on('ready', async () => {
      const channel = (await client.channels.fetch(process.env['HatTipChannelId'])) as TextChannel;
      const sendMessage = await channel.send(hatTip.message);

      hatTip.emojis.forEach(async emoji => await sendMessage.react(emoji));
    });

    client.login(process.env['ParkerToken']);
  }

  context.res = {
    status: 204
  };
};

const getRandomHatTip = (hatTips: IHatTip[]): IHatTip => {
  return hatTips[Math.floor(Math.random() * hatTips.length)];
}

export default httpTrigger;