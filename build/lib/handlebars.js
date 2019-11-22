'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _timeago = require('timeago.js');

var timeagoInstance = (0, _timeago.format)();

var helpers = {
    timeago: function timeago(timestamp) {
        return (0, _timeago.format)(timestamp);
    }
};

exports.default = helpers;