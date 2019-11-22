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

router.get('/add', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var categorias, marcas;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _database2.default.query('SELECT * FROM categorias WHERE active = 1');

                    case 2:
                        categorias = _context.sent;
                        _context.next = 5;
                        return _database2.default.query('SELECT * FROM marcas WHERE active = 1');

                    case 5:
                        marcas = _context.sent;

                        res.render('productos/add', { categorias: categorias, marcas: marcas });

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

router.post('/add', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, nombre, modelo, descripcion, especificaciones, aplicaciones, folleto, fotos, marcas_id, categorias_id, newProducto;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _req$body = req.body, nombre = _req$body.nombre, modelo = _req$body.modelo, descripcion = _req$body.descripcion, especificaciones = _req$body.especificaciones, aplicaciones = _req$body.aplicaciones, folleto = _req$body.folleto, fotos = _req$body.fotos, marcas_id = _req$body.marcas_id, categorias_id = _req$body.categorias_id;
                        newProducto = {
                            nombre: nombre,
                            modelo: modelo,
                            descripcion: descripcion,
                            especificaciones: especificaciones,
                            aplicaciones: aplicaciones,
                            folleto: folleto,
                            fotos: fotos,
                            marcas_id: marcas_id,
                            categorias_id: categorias_id
                        };
                        _context2.next = 4;
                        return _database2.default.query('INSERT INTO productos set ?', [newProducto]);

                    case 4:
                        req.flash('success', 'Producto nuevo');
                        res.redirect("/productos");
                        console.log(newProducto);

                    case 7:
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

router.get('/', isLoggedIn, function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var productos;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _database2.default.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1");

                    case 2:
                        productos = _context3.sent;

                        res.render('productos/list', { productos: productos });

                    case 4:
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

router.get('/marca/:id', isLoggedIn, function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, productos;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = req.params.id;
                        _context4.next = 3;
                        return _database2.default.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.marcas_id = ?", [id]);

                    case 3:
                        productos = _context4.sent;

                        res.render('productos/list', {
                            productos: productos
                        });

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

router.get('/categoria/:id', isLoggedIn, function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, productos;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        id = req.params.id;
                        _context5.next = 3;
                        return _database2.default.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.categorias_id = ?", [id]);

                    case 3:
                        productos = _context5.sent;

                        res.render('productos/list', {
                            productos: productos
                        });

                    case 5:
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

router.get('/delete/:id', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        id = req.params.id;
                        _context6.next = 3;
                        return _database2.default.query('UPDATE productos SET `active`= 0 WHERE id = ?', [id]);

                    case 3:
                        req.flash('success', 'Producto Alterado');
                        res.redirect("/productos");

                    case 5:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());

router.get('/edit/:id', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var id, categorias, marcas, productos;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        id = req.params.id;
                        _context7.next = 3;
                        return _database2.default.query('SELECT * FROM categorias WHERE 1');

                    case 3:
                        categorias = _context7.sent;
                        _context7.next = 6;
                        return _database2.default.query('SELECT * FROM marcas WHERE 1');

                    case 6:
                        marcas = _context7.sent;
                        _context7.next = 9;
                        return _database2.default.query('SELECT * FROM productos WHERE id = ?', [id]);

                    case 9:
                        productos = _context7.sent;

                        res.render('productos/edit', {
                            producto: productos[0],
                            categorias: categorias,
                            marcas: marcas
                        });

                    case 11:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}());

router.post('/edit/:id', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var id, _req$body2, nombre, modelo, descripcion, especificaciones, aplicaciones, folleto, fotos, editProducto;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        id = req.params.id;
                        _req$body2 = req.body, nombre = _req$body2.nombre, modelo = _req$body2.modelo, descripcion = _req$body2.descripcion, especificaciones = _req$body2.especificaciones, aplicaciones = _req$body2.aplicaciones, folleto = _req$body2.folleto, fotos = _req$body2.fotos;
                        editProducto = {
                            nombre: nombre,
                            modelo: modelo,
                            descripcion: descripcion,
                            especificaciones: especificaciones,
                            aplicaciones: aplicaciones,
                            folleto: folleto,
                            fotos: fotos
                        };
                        _context8.next = 5;
                        return _database2.default.query('UPDATE productos SET ? WHERE id = ?', [editProducto, id]);

                    case 5:
                        console.log(editProducto);
                        req.flash('success', 'Producto editad0');
                        res.redirect('/productos');

                    case 8:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function (_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}());

exports.default = router;