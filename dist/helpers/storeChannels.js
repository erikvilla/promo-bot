'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startPolling = exports.storeInstances = exports.storeArray = undefined;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _telegraf = require('telegraf');

var _telegraf2 = _interopRequireDefault(_telegraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeArray = ['amazon'];

var storeConfig = storeArray.map(function (store) {
  return {
    store: store,
    token: process.env[store] || _config2.default.get(store)
  };
});

var storeInstances = storeConfig.map(function (storeObject) {
  return {
    store: storeObject.store,
    instance: new _telegraf2.default(storeObject.token)
  };
});

var startPolling = function startPolling() {
  storeInstances.forEach(function (storeInstance) {
    storeInstance.instance.telegram.setWebhook();
    storeInstance.instance.startPolling();
  });
};

exports.storeArray = storeArray;
exports.storeInstances = storeInstances;
exports.startPolling = startPolling;