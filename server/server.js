const express = require('express');
const app = express();
const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
module.exports = app;
const config = require('./settings/config');
config.env = env;
global.config = config;
const middlewares = require('./settings/middlewares');
const setRouting = require('./settings/routing');
const logger = new (require('./logger'))('server');

require('./settings/db-connection')
  .connect()
  .catch((error) => {
    logger.error(error);
  });
const port = process.env.PORT || config.port;

middlewares.setMiddlewaresBeforeRouting(app);
setRouting(app, env);
middlewares.setMiddlewaresAfterRouting(app, env);

if (!module.parent) {
  app.listen(port, (error) => {
    if (error)
      logger.error(error);
    else
      logger.info(`Listening on port ${port}`);
  });
}