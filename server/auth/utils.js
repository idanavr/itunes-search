const passport = require('passport');
const UserModel = require('../models/db/user');
const jwt = require('jsonwebtoken');
const { jwtKey } = global.config;
const { roleEnum } = require('../models/db/utils');

const setup = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });
};

const signToken = (user) =>
    jwt.sign({ data: user }, jwtKey, {
        expiresIn: 604800
    }); // expires in 7 days

const checkIsInRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).end();
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
        return res.status(401).end();
    }

    return next();
};

const getRedirectUrl = (role) => {
    switch (role) {
        case roleEnum.Admin:
            return '/admin/users';
        case roleEnum.Normal:
            return '/';
        default:
            return '/';
    }
};

module.exports = { setup, signToken, checkIsInRole, getRedirectUrl };