'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datastore = require('@google-cloud/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unresolved, import/extensions
var key = process.env.DATASTORE_KEY || _config2.default.get('DATASTORE_KEY');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
exports.default = (0, _datastore2.default)({ keyFileName: key });