import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import DiscordJS, { GatewayIntentBits, Partials, TextChannel } from 'discord.js';
import crypto from 'crypto';
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const sig = Buffer.from(req.headers['x-hub-signature-256'] || '', 'utf8');
  const hmac = crypto.createHmac('sha256', process.env["HatTipSecret"]);
  const digest = Buffer.from('sha256=' + hmac.update(req.rawBody).digest('hex'), 'utf8');

  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    context.res = {
      status: 401,
      body: "Invalid key!"
    }
  }

  const action = req.body['action'] || '';
  const prInfo = req.body['pull_request'] || '';

  if (action === 'closed' && prInfo.labels.some(label => label.name === 'pr-merged')) {
    const user = await axios.get(prInfo.user.url);
    const name = user.data.name || user.data.login;
    const defaultMessages = [
      `${name}'s wonderful PR has just been merged. Thanks so much for your contribution! 🚀`,
      `The CLI for M365 has just been upgraded with the help of ${name}. Thank you! 👏`,
      `A hat tip to ${name} for their awesome contribution. 🎩`,
      `${name} has just contributed '${prInfo.title}'. Thank you! 👏`,
    ];

    const docPRMessages = [
      `The pen is mightier than the sword, that's for sure! 📚 ${name} proved that with improved docs.`
    ];

    const bugPRMessages = [
      `Wooaah ${name} squashed a bug! 🚀`
    ];

    let message = '';

    if (prInfo.labels.some(label => label.name === 'pr-bugfix')) {
      message = bugPRMessages[Math.floor(Math.random() * bugPRMessages.length)];
    } 
    else if (prInfo.labels.some(label => label.name === 'docs')) {
      message = docPRMessages[Math.floor(Math.random() * docPRMessages.length)];

    } else {
      message = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
    }

    const client = new DiscordJS.Client({
      intents: [
        GatewayIntentBits.GuildMessages
      ]
    });

    client.on('ready', async () => {
      const channel = (await client.channels.fetch('1022525781978660955')) as TextChannel;
      channel.send(message);
    });

    client.login(process.env["ParkerToken"]);
  }

  context.res = {
    status: 204
  };
};

export default httpTrigger;