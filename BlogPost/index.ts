import DiscordJS, { ForumChannel, GatewayIntentBits } from 'discord.js';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import he from 'he';
import { convert } from 'html-to-text';
import { PnPBlogTags } from '../Data/Tags';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const client = new DiscordJS.Client({
    intents: [
      GatewayIntentBits.GuildMessages
    ]
  });

  client.on('ready', async () => {
    const channel = (await client.channels.fetch(process.env['BlogChannelId'])) as ForumChannel;

    await channel.threads.create({
      name: req.body.title, 
      message: {
        content: `
${
  he.decode(
    convert(
      req.body.summary,
      {
        selectors: [
          { selector: 'img', format: 'skip' }
        ]
      }
    ))
}

Read more: ${req.body.link}
        `,
      },
      ...(isTagAvailable(channel, req.body.category)
        && {appliedTags: [getTagId(channel, req.body.category)]})
    });
  });

  client.login(process.env['ParkerToken']);

  context.res = {
    status: 204
  };
};

function isTagAvailable(channel: ForumChannel, categoryName: string): boolean {
  return channel.availableTags.some(x => 
    x.name.toLocaleLowerCase() === PnPBlogTags.find(y => 
      y.name.toLocaleLowerCase() === categoryName.toLocaleLowerCase()
    ).tagName.toLocaleLowerCase()
  );
}

function getTagId(channel: ForumChannel, categoryName: string): string {
  return channel.availableTags.find(x => 
    x.name.toLocaleLowerCase() === PnPBlogTags.find(y => 
      y.name.toLocaleLowerCase() === categoryName.toLocaleLowerCase()
    ).tagName.toLocaleLowerCase()
  ).id;
}

export default httpTrigger;