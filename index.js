require('dotenv').config();
const sequelize = require('./db');
require('./models/models');
const { createServer } = require('./server');

const logger = require('./log/log');

const { PORT } = process.env;
const app = createServer();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
  } catch (error) {
    logger.error(error.message);
  }
};
start();
