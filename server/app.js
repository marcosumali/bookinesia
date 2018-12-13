require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.use('/nodemailer', require('./routes/nodemailer'))

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))