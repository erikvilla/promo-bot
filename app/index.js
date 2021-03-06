import Telegraf from 'telegraf';
import config from 'config';
import feedReader from './feed';
/* commands */
import commands from './commands';
/* helpers */
import { sendIntervalMessages } from './helpers/messageHelper';
// TODO move this to a DB
const chatids = JSON.parse(process.env.CHAT_IDS) || JSON.parse(config.get('CHAT_IDS'));

/** telegram app **/
const token = process.env.token || config.get('token');
const URL = process.env.URL || config.get('URL');
const PORT = process.env.PORT || config.get('PORT');
const isDevelopment = process.env.NODE_ENV === 'development';

const app = new Telegraf(token);

/* add commands from command array */
commands.forEach(command => app.command(command.key, ctx => command.func(ctx)));

// start telegram listeners
if (isDevelopment) {
  // remove webhook in case any is attached from previous sessions
  app.telegram.setWebhook();

  app.startPolling();
} else {
  app.telegram.setWebhook(`${URL}/bot${token}`);
  app.startWebhook(`/bot${token}`, null, PORT);
}

// start reading rss articles
feedReader.read((articles) => {
  if (!articles) return;
  chatids.forEach(id => sendIntervalMessages(app.telegram, id, articles));
});
