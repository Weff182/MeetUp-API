require('dotenv').config()
const express = require('express') 
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')


const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use('/api', router)


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
