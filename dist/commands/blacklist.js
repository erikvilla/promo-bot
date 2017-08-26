'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// TODO: Move this to db
var blacklistArray = ['soriana', 'aurrera', 'aurrerá', 'comercial mexicana', 'chedraui', 'heb', 'walmart', 'fresko', 'farmatodo', 'oxxo', 'la comer'];

var blacklistString = function blacklistString() {
  return blacklistArray.join(', ');
};
var command = {
  key: 'blacklist',
  func: function func(ctx) {
    var text = ctx.message.text;
    var wordArray = text.split(' ');
    wordArray.shift();
    var blackListText = wordArray.join(' ').trim();
    if (blackListText.length < 2) {
      ctx.reply('please add a blacklist term, current list: ' + blacklistString());
    } else {
      blacklistArray.push(blackListText);
      ctx.reply('blacklist: ' + blacklistString());
    }
  }
};

exports.blacklistArray = blacklistArray;
exports.default = command;