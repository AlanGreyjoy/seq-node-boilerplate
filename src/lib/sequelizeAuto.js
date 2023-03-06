const SequelizeAuto = require('sequelize-auto');
const db = require('./db');

const options = {
  directory: './src/models',
  caseFile: 'p',
  caseProp: 'c',
};

gxLogger(gxLoggerType.INFO, 'creating the sequelize auto instance...');

const auto = new SequelizeAuto(db, null, null, options);

gxLogger(gxLoggerType.INFO, 'running sequelize auto...');

auto
  .run()
  .then((res) => {
    gxLogger(gxLoggerType.INFO, 'Sequelize auto is now complete!');
  })
  .catch((err) => {
    gxLogger(gxLoggerType.ERROR, err);
  });
