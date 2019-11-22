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

//import nodemailer from 'nodemailer';

router.get('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var productos;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _database2.default.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', p.descripcion AS 'descripcion' , p.especificaciones AS 'especificaciones', p.aplicaciones AS 'aplicaciones', p.folleto AS 'folleto', p.fotos AS 'fotos', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1");

                    case 2:
                        productos = _context.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            productos: productos
                        });

                    case 5:
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

router.get('/producto/:id', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var id, productos;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        id = req.params.id;
                        _context2.next = 3;
                        return _database2.default.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', p.descripcion AS 'descripcion' , p.especificaciones AS 'especificaciones', p.aplicaciones AS 'aplicaciones', p.folleto AS 'folleto', p.fotos AS 'fotos', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.id = ?", [id]);

                    case 3:
                        productos = _context2.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            productos: productos
                        });

                    case 6:
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

router.get('/pormarca/:id', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, productos;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = req.params.id;
                        _context3.next = 3;
                        return _database2.default.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', p.descripcion AS 'descripcion' , p.especificaciones AS 'especificaciones', p.aplicaciones AS 'aplicaciones', p.folleto AS 'folleto', p.fotos AS 'fotos', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.marcas_id = ?", [id]);

                    case 3:
                        productos = _context3.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            productos: productos
                        });

                    case 6:
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

router.get('/porcategoria/:id', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, productos;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = req.params.id;
                        _context4.next = 3;
                        return _database2.default.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', p.descripcion AS 'descripcion' , p.especificaciones AS 'especificaciones', p.aplicaciones AS 'aplicaciones', p.folleto AS 'folleto', p.fotos AS 'fotos', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.categorias_id = ?", [id]);

                    case 3:
                        productos = _context4.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            productos: productos
                        });

                    case 6:
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

router.get('/marcas', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var marcas;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _database2.default.query('SELECT * FROM marcas WHERE active = 1');

                    case 2:
                        marcas = _context5.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            marcas: marcas
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

router.get('/marcas/:id', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var id, marcas;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        id = req.params.id;
                        _context6.next = 3;
                        return _database2.default.query('SELECT * FROM marcas WHERE active = 1 AND id = ?', [id]);

                    case 3:
                        marcas = _context6.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            marcas: marcas
                        });

                    case 6:
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

router.get('/categorias', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var categorias;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return _database2.default.query('SELECT * FROM categorias WHERE active = 1');

                    case 2:
                        categorias = _context7.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            categorias: categorias
                        });

                    case 5:
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

router.get('/categorias/:id', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var id, categorias;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        id = req.params.id;
                        _context8.next = 3;
                        return _database2.default.query('SELECT * FROM categorias WHERE active = 1 AND id = ?', [id]);

                    case 3:
                        categorias = _context8.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            categorias: categorias
                        });

                    case 6:
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

router.get('/servicios', function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var servicios;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.next = 2;
                        return _database2.default.query('SELECT * FROM servicios WHERE active = 1');

                    case 2:
                        servicios = _context9.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            servicios: servicios
                        });

                    case 5:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function (_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}());

router.get('/servicios/:id', function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var id, servicios;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        id = req.params.id;
                        _context10.next = 3;
                        return _database2.default.query('SELECT * FROM servicios WHERE active = 1 AND id = ?', [id]);

                    case 3:
                        servicios = _context10.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            servicios: servicios
                        });

                    case 6:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function (_x19, _x20) {
        return _ref10.apply(this, arguments);
    };
}());

router.get('/soluciones', function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var soluciones;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _context11.next = 2;
                        return _database2.default.query('SELECT * FROM soluciones WHERE active = 1');

                    case 2:
                        soluciones = _context11.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            soluciones: soluciones
                        });

                    case 5:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, undefined);
    }));

    return function (_x21, _x22) {
        return _ref11.apply(this, arguments);
    };
}());

router.get('/soluciones/:id', function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var id, soluciones;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        id = req.params.id;
                        _context12.next = 3;
                        return _database2.default.query('SELECT * FROM soluciones WHERE active = 1 AND id = ?', [id]);

                    case 3:
                        soluciones = _context12.sent;

                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            soluciones: soluciones
                        });

                    case 6:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined);
    }));

    return function (_x23, _x24) {
        return _ref12.apply(this, arguments);
    };
}());

router.get('/mail/:message', function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
        var message, result, api_key, DOMAIN, mailgun, data;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        message = req.params.message;
                        result = '';
                        api_key = '';
                        DOMAIN = 'sandbox601a2e17815045c09384da306871425d.mailgun.org';
                        mailgun = require("mailgun-js")({ apiKey: api_key, domain: DOMAIN });
                        data = {
                            from: 'WebCustomer <info@mechatronikgroup.com>',
                            to: 'carlosgarts@gmail.com',
                            subject: 'Mechatronik Site Customer',
                            text: message
                        };


                        mailgun.messages().send(data, function (error, body) {
                            if (error) {
                                console.log(error);
                            }
                            result = 'success';
                            console.log(body);
                        });
                        res.header("Access-Control-Allow-Origin", "*");
                        res.json({
                            result: result
                        });

                    case 9:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, undefined);
    }));

    return function (_x25, _x26) {
        return _ref13.apply(this, arguments);
    };
}());

exports.default = router;