'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _util = require('util');

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _mysql2.default.createPool(_keys2.default.database);

pool.getConnection(function (err, connection) {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            Cconsole.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

//Promisify Pool Query
pool.query = (0, _util.promisify)(pool.query);

exports.default = pool;