'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataAccess = require('../dataAccess');

var locale = require('../locale/es');

var command = {
  key: 'start',
  func: function func(ctx) {
    (0, _dataAccess.saveChatConfig)(ctx.from.id);
    ctx.reply(locale.start.confirmation);
  }
};

exports.default = command;