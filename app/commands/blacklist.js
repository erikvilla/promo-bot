// TODO: Move this to db
const blacklistArray = ['soriana', 'aurrera', 'aurrerá', 'comercial mexicana', 'chedraui', 'heb', 'walmart', 'fresko', 'farmatodo', 'oxxo', 'la comer'];

const blacklistString = () => (blacklistArray.join(', '));
const command = {
  key: 'blacklist',
  func: (ctx) => {
    const text = ctx.message.text;
    const wordArray = text.split(' ');
    wordArray.shift();
    const blackListText = wordArray.join(' ').trim();
    if (blackListText.length < 2) {
      ctx.reply(`please add a blacklist term, current list: ${blacklistString()}`);
    } else {
      blacklistArray.push(blackListText);
      ctx.reply(`blacklist: ${blacklistString()}`);
    }
  },
};

export { blacklistArray };
export default command;
