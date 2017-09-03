'use strict';

var _telegraf = require('telegraf');

var _telegraf2 = _interopRequireDefault(_telegraf);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _dataAccess = require('./dataAccess');

var _feed = require('./feed');

var _feed2 = _interopRequireDefault(_feed);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _messageHelper = require('./helpers/messageHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* initial load from database */

/* commands */
(0, _dataAccess.loadApplicationData)();

/** telegram app **/

/* helpers */
var token = process.env.token || _config2.default.get('token');
var URL = process.env.URL || _config2.default.get('URL');
var PORT = process.env.PORT || _config2.default.get('PORT');
var isDevelopment = process.env.NODE_ENV === 'development';

var app = new _telegraf2.default(token);

/* add commands from command array */
_commands2.default.forEach(function (command) {
  return app.command(command.key, function (ctx) {
    return command.func(ctx);
  });
});

// start telegram listeners
if (isDevelopment) {
  // remove webhook in case any is attached from previous sessions
  app.telegram.deleteWebhook();
  app.startPolling();
} else {
  app.telegram.setWebhook(URL + '/bot' + token);
  app.startWebhook('/bot' + token, null, PORT);
}
// start reading rss articles
_feed2.default.read(function (articles) {
  var chatIds = (0, _dataAccess.getChatIds)();
  if (!articles) return;
  chatIds.forEach(function (id) {
    return (0, _messageHelper.sendIntervalMessages)(app.telegram, id, articles);
  });
});