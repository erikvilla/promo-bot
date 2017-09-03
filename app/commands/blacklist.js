import {
  updateBlacklist,
  getBlacklist,
} from '../dataAccess';

const locale = require('../locale/es');

const blacklistString = blacklistArray => (blacklistArray.join(', '));
const command = {
  key: 'bloquear',
  func: (ctx) => {
    const chatId = ctx.from.id;
    const blacklistArray = getBlacklist(chatId);
    const text = ctx.message.text;
    const wordArray = text.split(' ');
    wordArray.shift(); // remove the command
    const blackListText = wordArray.join(' ').trim();
    const termExists = blacklistArray.indexOf(blackListText) !== -1;
    if (blackListText.length < 2 || termExists) {
      ctx.reply(`${locale.blacklist.no_term} ${blacklistString(blacklistArray)}`);
    } else {
      blacklistArray.push(blackListText);
      updateBlacklist(chatId, blacklistArray);
      ctx.reply(`${locale.blacklist.confirmation} ${blacklistString(blacklistArray)}`);
    }
  },
};

export default command;
