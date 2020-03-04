const express = require('express');
const router = express.Router();
const userModel = require('../models/db/user');
const passport = require('passport');
const logger = new (require('../logger'))('Login API');
const userAdapters = require('../models/client/user');
const { login: loginJWT } = require('./utils/jwt');


router.get('/login/me', passport.authenticate('jwt'), (req, res) => {
    if (req.user)
        res.status(200).send(userAdapters.createUserModel(req.user));
    else
        res.status(400).end();
});

router.post('/login', (req, res) => { // change it - there is no password check for easier testing
    userModel.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err) {
            logger.error(err, req.body);
            res.status(400).end();
        } else if (!user)
            res.status(404).end();
        else {
            loginJWT(req, res, userAdapters.createUserModel(user));
        }
    });
});

router.post('/logout', (req, res) => { // change it - there is no password check for easier testing
    req.logout();
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = router;