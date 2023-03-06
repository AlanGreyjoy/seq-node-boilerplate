require('./lib/globals');

const app = require('./app');
const config = require('./config/config');
const logger = require('./lib/logger');
const db = require('../src/lib/db');
const { run } = require('nodemon/lib/monitor');
const runSequelizeAuto = false;

let server;

//Main server entry point
async function main() {
  gxLogger(gxLoggerType.INFO, 'Starting API server...');

  const db = require('../src/lib/db');

  gxLogger(gxLoggerType.INFO, 'Testing sequelize connection...');

  db.authenticate()
    .then((res) => {
      gxLogger(gxLoggerType.INFO, `Connection to the database was successful!`);
      server = app.listen(config.serverPort, () => {
        gxLogger(gxLoggerType.INFO, `API server is now running on port ${config.serverPort}`);

        if (runSequelizeAuto) {
          gxLogger(gxLoggerType.INFO, 'Starting sequelize-auto...');
          require('./lib/sequelizeAuto');
        }
      });
    })
    .catch((err) => {
      gxLogger(gxLoggerType.ERROR, `Connection to the database threw an error`);
      gxLogger(gxLoggerType.ERROR, err);
      exitHandler();
    });
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

main();
