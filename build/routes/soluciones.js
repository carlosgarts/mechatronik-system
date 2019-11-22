'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

var _require = require('../lib/auth'),
    isLoggedIn = _require.isLoggedIn;

router.get('/add', function (req, res) {
    res.render('soluciones/add');
});

router.post('/add', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, titulo, descripcion, fotos, newSolucion;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, titulo = _req$body.titulo, descripcion = _req$body.descripcion, fotos = _req$body.fotos;
                        newSolucion = {
                            titulo: titulo,
                            descripcion: descripcion,
                            fotos: fotos
                        };
                        _context.next = 4;
                        return _database2.default.query('INSERT INTO soluciones set ?', [newSolucion]);

                    case 4:
                        req.flash('success', 'Solucion nuevo');
                        res.redirect("/soluciones");
                        console.log(newSolucion);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

router.get('/', isLoggedIn, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var soluciones;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _database2.default.query('SELECT * FROM soluciones WHERE `active`= 1');

                    case 2:
                        soluciones = _context2.sent;

                        res.render('soluciones/list', { soluciones: soluciones });

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

router.get('/delete/:id', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = req.params.id;
                        _context3.next = 3;
                        return _database2.default.query('UPDATE soluciones SET `active`= 0 WHERE id = ?', [id]);

                    case 3:
                        req.flash('success', 'Solucion Alterada');
                        res.redirect("/soluciones");

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

router.get('/edit/:id', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, soluciones;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = req.params.id;
                        _context4.next = 3;
                        return _database2.default.query('SELECT * FROM soluciones WHERE id = ?', [id]);

                    case 3:
                        soluciones = _context4.sent;

                        res.render('soluciones/edit', { solucion: soluciones[0] });

                    case 5:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

router.post('/edit/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, _req$body2, titulo, descripcion, fotos, editSolucion;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        id = req.params.id;
                        _req$body2 = req.body, titulo = _req$body2.titulo, descripcion = _req$body2.descripcion, fotos = _req$body2.fotos;
                        editSolucion = {
                            titulo: titulo,
                            descripcion: descripcion,
                            fotos: fotos
                        };
                        _context5.next = 5;
                        return _database2.default.query('UPDATE soluciones SET ? WHERE id = ?', [editSolucion, id]);

                    case 5:
                        console.log(editSolucion);
                        req.flash('success', 'Solucion editad0');
                        res.redirect('/soluciones');

                    case 8:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());

exports.default = router;