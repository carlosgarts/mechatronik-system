'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var _require = require('../lib/auth'),
    isLoggedIn = _require.isLoggedIn;

var _require2 = require('express-validator'),
    check = _require2.check,
    validationResult = _require2.validationResult;

// SIGNUP


router.get('/signup', function (req, res) {
    res.render('auth/signup');
});

router.post('/signup', _passport2.default.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// SINGIN
router.get('/signin', function (req, res) {
    res.render('auth/signin');
});

router.post('/signin', function (req, res, next) {
    // req.check('username', 'Username is Required').notEmpty();
    // req.check('password', 'Password is Required').notEmpty();
    // const errors = req.validationErrors();
    // if (errors.length > 0) {
    //     req.flash('message', errors[0].msg);
    //     res.redirect('/signin');
    // }
    _passport2.default.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});

router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile');
});

exports.default = router;