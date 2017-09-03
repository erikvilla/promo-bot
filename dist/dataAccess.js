'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlacklist = exports.updateBlacklist = exports.saveChatConfig = exports.loadApplicationData = exports.getChatIds = undefined;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _datastore = require('@google-cloud/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var datastore = void 0;
var datastoreKey = process.env.DATASTORE_KEY || _config2.default.get('DATASTORE_KEY');

_fs2.default.writeFile('credentials.json', JSON.stringify(datastoreKey), 'utf8', function () {
  datastore = (0, _datastore2.default)({ keyFileName: '../credentials.json' });
  loadApplicationData();
});

var chatMap = {};

var loadApplicationData = function loadApplicationData() {
  var query = datastore.createQuery('chat');
  datastore.runQuery(query).then(function (response) {
    var results = response[0];
    results.forEach(function (item) {
      chatMap[item.telegram_id] = { blacklist: item.blacklist };
    });
  });
};

var save = function save(collection, data, id) {
  var key = id ? [collection, id] : collection;
  key = datastore.key(key);
  return datastore.insert({
    key: key,
    data: data
  }).then(function () {
    return loadApplicationData();
  });
};

var saveChatConfig = function saveChatConfig(chatId) {
  save('chat', { blacklist: [], telegram_id: chatId }, chatId);
};

var update = function update(collection, data, id) {
  var key = [collection, id];
  key = datastore.key(key);
  return datastore.upsert({
    key: key,
    data: data
  });
};

var updateBlacklist = function updateBlacklist(chatId, blacklist) {
  update('chat', { blacklist: blacklist,
    telegram_id: chatId
  }, chatId);
  chatMap[chatId].blacklist = blacklist;
};

var getBlacklist = function getBlacklist(chatId) {
  return chatMap[chatId] ? chatMap[chatId].blacklist : [];
};

var getChatIds = function getChatIds() {
  return Object.keys(chatMap);
};

exports.getChatIds = getChatIds;
exports.loadApplicationData = loadApplicationData;
exports.saveChatConfig = saveChatConfig;
exports.updateBlacklist = updateBlacklist;
exports.getBlacklist = getBlacklist;