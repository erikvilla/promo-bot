'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlacklist = exports.updateBlacklist = exports.saveChatConfig = exports.loadApplicationData = exports.getChatIds = undefined;

var _datastore = require('./datastore');

var _datastore2 = _interopRequireDefault(_datastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chatMap = {};

var loadApplicationData = function loadApplicationData() {
  var query = _datastore2.default.createQuery('chat');
  _datastore2.default.runQuery(query).then(function (response) {
    var results = response[0];
    results.forEach(function (item) {
      chatMap[item.telegram_id] = { blacklist: item.blacklist };
    });
  });
};

var save = function save(collection, data, id) {
  var key = id ? [collection, id] : collection;
  key = _datastore2.default.key(key);
  return _datastore2.default.insert({
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
  key = _datastore2.default.key(key);
  return _datastore2.default.upsert({
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