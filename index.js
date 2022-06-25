require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
require("./models/models");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMidleware");
const swaggerUi = require("swagger-ui-express");
const logger = require("./log/log");
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const swaggerDocument = require("./swagger/index.json");



const accessLogStream = fs.createWriteStream(path.join(__dirname, './log/access.log'), { flags: 'a' })


const PORT = process.env.PORT;
const app = express();



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);





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
