const express = require('express');
const path = require('path');
const distFolder = path.join(__dirname, '..', '..', 'public');

module.exports = (app, env) => {
    const loginApi = require('../api/login');
    const userApi = require('../api/users');
    const itunesApi = require('../api/itunes');
    app.use('/api/', loginApi);
    app.use('/api/users', userApi);
    app.use('/api/itunes', itunesApi);

    if (env !== 'development') {
        app.use(express.static(distFolder));
        
        app.get('*', (req, res) => {
            res.sendFile(`${distFolder}/index.html`);
        });
    }
};