'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LocalStrategy = require('passport-local').Strategy;
var helpers = require('./helpers');

_passport2.default.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, username, password, done) {
        var rows, user, validPassword;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _database2.default.query('SELECT * FROM users WHERE username = ?', [username]);

                    case 2:
                        rows = _context.sent;

                        if (!(rows.length > 0)) {
                            _context.next = 11;
                            break;
                        }

                        user = rows[0];
                        _context.next = 7;
                        return helpers.matchPassword(password, user.password);

                    case 7:
                        validPassword = _context.sent;

                        if (validPassword) {
                            done(null, user, req.flash('success', 'Welcome ' + user.username));
                        } else {
                            done(null, false, req.flash('message', 'Incorrect Password'));
                        }
                        _context.next = 12;
                        break;

                    case 11:
                        return _context.abrupt('return', done(null, false, req.flash('message', 'The Username does not exists.')));

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}()));

_passport2.default.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, username, password, done) {
        var fullname, newUser, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        fullname = req.body.fullname;
                        newUser = {
                            fullname: fullname,
                            username: username,
                            password: password
                        };
                        _context2.next = 4;
                        return helpers.encryptPassword(password);

                    case 4:
                        newUser.password = _context2.sent;
                        _context2.next = 7;
                        return _database2.default.query('INSERT INTO users SET ? ', newUser);

                    case 7:
                        result = _context2.sent;

                        newUser.id = result.insertId;
                        return _context2.abrupt('return', done(null, newUser));

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x5, _x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
    };
}()));

_passport2.default.serializeUser(function (user, done) {
    done(null, user.id);
});

_passport2.default.deserializeUser(function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, done) {
        var rows;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _database2.default.query('SELECT * FROM users WHERE id = ?', [id]);

                    case 2:
                        rows = _context3.sent;

                        done(null, rows[0]);

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x9, _x10) {
        return _ref3.apply(this, arguments);
    };
}());