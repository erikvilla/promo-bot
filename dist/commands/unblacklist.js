'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataAccess = require('../dataAccess');

var locale = require('../locale/es');

var blacklistString = function blacklistString(blacklistArray) {
  return blacklistArray.join(', ');
};
var command = {
  key: 'desbloquear',
  func: function func(ctx) {
    var chatId = ctx.from.id;
    var blacklistArray = (0, _dataAccess.getBlacklist)(chatId);
    var text = ctx.message.text;
    var wordArray = text.split(' ');
    wordArray.shift(); // remove the command
    var unblacklistText = wordArray.join(' ').trim();
    var termExists = blacklistArray.indexOf(unblacklistText) !== -1;
    if (unblacklistText.length < 2 || termExists) {
      ctx.reply(locale.blacklist.no_term + ' ' + blacklistString(blacklistArray));
    } else {
      blacklistArray = blacklistArray.filter(function (item) {
        return item !== unblacklistText;
      });
      (0, _dataAccess.updateBlacklist)(chatId, blacklistArray);
      ctx.reply(locale.blacklist.confirmation + ' ' + blacklistString(blacklistArray));
    }
  }
};

exports.default = command;