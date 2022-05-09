require('dotenv').config()
const express = require('express') 
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMidleware')
const swaggerUi = require('swagger-ui-express')

const PORT = process.env.PORT
const app = express()

const swaggerDocument = require('./swagger/index.json');

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );



app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
