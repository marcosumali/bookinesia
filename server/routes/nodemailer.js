const express = require('express')
const nodemailer = express.Router()

const { sendEmail } = require('../controllers/nodemailer.controller')

nodemailer
  .post('/sendEmail', sendEmail)


module.exports = nodemailer