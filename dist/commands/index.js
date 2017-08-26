'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startCommand = exports.blacklistCommand = undefined;

var _blacklist = require('./blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commandArray = [_blacklist2.default, _start2.default];

exports.blacklistCommand = _blacklist2.default;
exports.startCommand = _start2.default;
exports.default = commandArray;