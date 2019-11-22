import "@babel/polyfill";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import router from './routes';
import authentication from './routes/authentication';
import categorias from './routes/categorias';
import servicios from './routes/servicios';
import soluciones from './routes/soluciones';
import marcas from './routes/marcas';
import productos from './routes/productos';
import api from './routes/api';
import exphbs from 'express-handlebars';
import helperhbs from './lib/handlebars';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import mysqlStore from 'express-mysql-session';
import db from './keys';

const validator = require('express-validator');

const app= express();
require('./lib/passport');

// Middlewares
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.use(session({
    secret: 'carlosgarts',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(db.database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator.check());
//app.use(validationResult());
// app.use(check());

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: helperhbs
}));
app.set('view engine', '.hbs');

//Gobal Variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(authentication);
app.use('/categorias', categorias);
app.use('/servicios', servicios);
app.use('/soluciones', soluciones);
app.use('/marcas', marcas);
app.use('/productos', productos);
app.use('/api', api);
app.use(router);
//app.use('/api', router);

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port 4000');
})