import DiscordJS, { ForumChannel, GatewayIntentBits } from 'discord.js';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import he from 'he';
import { convert } from 'html-to-text';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const client = new DiscordJS.Client({
    intents: [
      GatewayIntentBits.GuildMessages
    ]
  });

  client.on('ready', async () => {
    const channel = (await client.channels.fetch(process.env['BlogChannelId'])) as ForumChannel;

    if (!channel.availableTags.some(x => x.name.toLocaleLowerCase() === req.body.category.toLocaleLowerCase())) {
      await channel.setAvailableTags([
        ...channel.availableTags,
        { name: req.body.category }
      ]);      
    }

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
      ...(channel.availableTags.some(x => x.name.toLocaleLowerCase() === req.body.category.toLocaleLowerCase()) 
        && {appliedTags: [channel.availableTags.find(x => x.name.toLocaleLowerCase() === req.body.category.toLocaleLowerCase()).id]})
    });
  });

  client.login(process.env['ParkerToken']);
  
  context.res = {
    status: 204
  };
};

export default httpTrigger;