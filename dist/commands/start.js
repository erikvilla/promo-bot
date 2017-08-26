'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var chatids = [14501059, 10457276, 6660592, 47077012, 172031101, 103395076];

var command = {
  key: 'start',
  func: function func(ctx) {
    // TODO: save id onMessage
    console.log('new id:', ctx.from.id);
    chatids.push(ctx.from.id);
    ctx.reply('Welcome!');
  }
};

exports.default = command;