'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendIntervalMessages = exports.isBlacklisted = exports.includes = exports.composeMessage = undefined;

var _blacklist = require('../commands/blacklist');

var composeMessage = function composeMessage(article) {
  return article.title + ' | ' + article.link;
};
var includes = function includes(base, search) {
  return base.toUpperCase().includes(search.toUpperCase());
};

var isBlacklisted = function isBlacklisted(article) {
  for (var i = 0; i < _blacklist.blacklistArray.length; i += 1) {
    var containsBlacklistWord = includes(article.title, _blacklist.blacklistArray[i]);
    var blacklistWordInContent = includes(article.content, _blacklist.blacklistArray[i]);
    if (containsBlacklistWord || blacklistWordInContent) {
      return true;
    }
  }
  return false;
};

var sendIntervalMessages = function sendIntervalMessages(telegramInstance, id, articles) {
  var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

  var count = 0;
  // interval to send messages, it is not possible to send an array
  var messageInterval = setInterval(function () {
    if (count <= articles.length - 1) {
      var article = articles[count];
      if (!isBlacklisted(article)) {
        telegramInstance.sendMessage(id, composeMessage(articles[count]));
      }
      count += 1;
    } else {
      clearInterval(messageInterval);
    }
  }, interval);
};

exports.composeMessage = composeMessage;
exports.includes = includes;
exports.isBlacklisted = isBlacklisted;
exports.sendIntervalMessages = sendIntervalMessages;