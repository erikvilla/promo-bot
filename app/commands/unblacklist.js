import {
  updateBlacklist,
  getBlacklist,
} from '../dataAccess';


const locale = require('../locale/es');

const blacklistString = blacklistArray => (blacklistArray.join(', '));
const command = {
  key: 'desbloquear',
  func: (ctx) => {
    const chatId = ctx.from.id;
    let blacklistArray = getBlacklist(chatId);
    const text = ctx.message.text;
    const wordArray = text.split(' ');
    wordArray.shift(); // remove the command
    const unblacklistText = wordArray.join(' ').trim();
    const termExists = blacklistArray.indexOf(unblacklistText) !== -1;
    if (unblacklistText.length < 2 || termExists) {
      ctx.reply(`${locale.blacklist.no_term} ${blacklistString(blacklistArray)}`);
    } else {
      blacklistArray = blacklistArray.filter(item => item !== unblacklistText);
      updateBlacklist(chatId, blacklistArray);
      ctx.reply(`${locale.blacklist.confirmation} ${blacklistString(blacklistArray)}`);
    }
  },
};

export default command;
