'use strict';

require('@babel/polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _authentication = require('./routes/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _categorias = require('./routes/categorias');

var _categorias2 = _interopRequireDefault(_categorias);

var _servicios = require('./routes/servicios');

var _servicios2 = _interopRequireDefault(_servicios);

var _soluciones = require('./routes/soluciones');

var _soluciones2 = _interopRequireDefault(_soluciones);

var _marcas = require('./routes/marcas');

var _marcas2 = _interopRequireDefault(_marcas);

var _productos = require('./routes/productos');

var _productos2 = _interopRequireDefault(_productos);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _handlebars = require('./lib/handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressMysqlSession = require('express-mysql-session');

var _expressMysqlSession2 = _interopRequireDefault(_expressMysqlSession);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validator = require('express-validator');

var app = (0, _express2.default)();
require('./lib/passport');

// Middlewares
app.use((0, _cors2.default)());
app.use(_express2.default.urlencoded({
    extended: true
}));
app.use(_express2.default.json());
app.use((0, _morgan2.default)('dev'));

app.use((0, _expressSession2.default)({
    secret: 'carlosgarts',
    resave: false,
    saveUninitialized: false,
    store: new _expressMysqlSession2.default(_keys2.default.database)
}));
app.use((0, _connectFlash2.default)());
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use(validator.check());
//app.use(validationResult());
// app.use(check());

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', _path2.default.join(__dirname, 'views'));
app.engine('.hbs', (0, _expressHandlebars2.default)({
    defaultLayout: 'main',
    layoutsDir: _path2.default.join(app.get('views'), 'layouts'),
    partialsDir: _path2.default.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: _handlebars2.default
}));
app.set('view engine', '.hbs');

//Gobal Variables
app.use(function (req, res, next) {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(_authentication2.default);
app.use('/categorias', _categorias2.default);
app.use('/servicios', _servicios2.default);
app.use('/soluciones', _soluciones2.default);
app.use('/marcas', _marcas2.default);
app.use('/productos', _productos2.default);
app.use('/api', _api2.default);
app.use(_routes2.default);
//app.use('/api', router);

//Public
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), function () {
    console.log('Server on port 4000');
});