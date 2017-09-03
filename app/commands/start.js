import { saveChatConfig } from '../dataAccess';

const locale = require('../locale/es');

const command = {
  key: 'start',
  func: (ctx) => {
    saveChatConfig(ctx.from.id);
    ctx.reply(locale.start.confirmation);
  },
};

export default command;
