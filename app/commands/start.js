const chatids = [14501059, 10457276, 6660592, 47077012, 172031101, 103395076];

const command = {
  key: 'start',
  func: (ctx) => {
    // TODO: save id onMessage
    console.log('new id:', ctx.from.id);
    chatids.push(ctx.from.id);
    ctx.reply('Welcome!');
  },
};

export default command;
