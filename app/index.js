import Telegraf from 'telegraf';
import config from 'config';
import { loadApplicationData, getChatIds } from './dataAccess';
import feedReader from './feed';
/* commands */
import commands from './commands';
/* helpers */
import { sendIntervalMessages } from './helpers/messageHelper';

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
  app.telegram.deleteWebhook();
  app.startPolling();
} else {
  app.telegram.setWebhook(`${URL}/bot${token}`);
  app.startWebhook(`/bot${token}`, null, PORT);
}
// start reading rss articles
feedReader.read((articles) => {
  const chatIds = getChatIds();
  if (!articles) return;
  chatIds.forEach(id => sendIntervalMessages(app.telegram, id, articles));
});
