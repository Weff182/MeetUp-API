const express = require("express");
const router = require("./routes/index");
const swaggerDocument = require("./swagger/index.json");
const errorHandler = require("./middleware/errorHandlingMidleware");
const swaggerUi = require("swagger-ui-express");
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const app = express();

const createServer = function(){
    const accessLogStream = fs.createWriteStream(path.join(__dirname, './log/access.log'), { flags: 'a' })
    app.use(express.json());
    app.use("/api", router);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(morgan('combined', { stream: accessLogStream }))
    app.use(errorHandler);
    return app
}

module.exports = {
    createServer
}