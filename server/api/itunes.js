const express = require('express');
const router = express.Router();
const itunesBL = require('../BL/itunes');
const logger = new (require('../logger'))('Itunes Results API');
const passport = require('passport');
const { insertUserIfExist } = require('./utils/jwt');

router.get('/', passport.authenticate('jwt'), (req, res) => {
    if (!(req.user && req.user.id)) {
        logger.warn('itunes get queries method didn\'t recognize the user');
        res.status(400);
    }
    itunesBL.getTop10Queries(req.user.id)
        .then((results) => {            
            if (results.err) {
                logger.error(results.err);
                res.status(400).end(results.err);
            } else
                res.send(results);
        })
        .catch((error) => {
            logger.error(error);
            res.status(500).end();
        });
});

router.get('/:query', insertUserIfExist, (req, res) => {
    itunesBL.getItunesResults(req.params.query, req.user)
        .then((results) => {
            if (results.err) {
                logger.error(results.err);
                res.status(400).end(results.err);
            } else
                res.send(results);
        })
        .catch((error) => {
            logger.error(error);
            res.status(500).end();
        });
});

module.exports = router;