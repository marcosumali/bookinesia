require('dotenv').config()
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const fs = require('fs')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars');

const { formatMoney, getTotalTransaction } = require('./helpers/currency');
const { returnWhatDay, returnWhatMonth } = require('./helpers/date');

const AUTHEMAIL = process.env.AUTHEMAIL
const AUTHPASS = process.env.AUTHPASS
const REGISTER_EMAIL = fs.readFileSync(__dirname + '/nodemailer/templates/welcome.customer.html', 'utf-8')
const GUEST_EMAIL = fs.readFileSync(__dirname + '/nodemailer/templates/welcome.guest.html', 'utf-8')

admin.initializeApp(functions.config().firebase);

exports.getUserBasedOnUid = functions.https.onRequest((req, res) => {
  // Put this line to your function
  // Automatically allow cross-origin requests
  cors(req, res, () => {})
  
  let uid = req.body.uid

  admin.auth().getUser(uid)
  .then(function(userRecord) {
    let userData = userRecord.toJSON() 
    let user = {
      id: userData.uid,
      email: userData.email,
      name: userData.displayName
    }
    res.status(200).json({
      message: 'Get user based on UID successful',
      user
    })
  })
  .catch(function(error) {
    console.log("ERROR: fetching user data by UID", error)
    // res.status(400).json({
    //   message: 'ERROR: fetching user data by UID',
    // })
  })
})


exports.getUserBasedOnEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})
  
  let email = req.body.email

  admin.auth().getUserByEmail(email)
  .then(function(userRecord) {
    let userData = userRecord.toJSON()
    let user = {
      id: userData.uid,
      email: userData.email,
      name: userData.displayName
    }
    res.status(200).json({
      message: 'Get user based on email successful',
      user
    })
  })
  .catch(function(error) {
    console.log("ERROR: fetching user data by Email", error)
    // res.status(400).json({
    //   message: 'ERROR: fetching user data by Email',
    // })
  })
})


exports.sendEmailWelcomeCustomer = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})

  let customerName = req.body.name
  let customerNameCapitalize = customerName.charAt(0).toUpperCase() + customerName.slice(1)
  let customerEmail = req.body.email
  let emailTemplate = REGISTER_EMAIL

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${AUTHEMAIL}`,
      pass: `${AUTHPASS}`
    }
  });

  // setting up email with data in handlebars
  let template = handlebars.compile(emailTemplate)
  let data = { 'name': customerNameCapitalize }
  let templateWithData = template(data)

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Bookinesia" ${AUTHEMAIL}`,
    to: customerEmail,
    subject: `Welcome To Bookinesia, ${data.name}`, 
    html: `${templateWithData}`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('ERROR: Customer Welcome Message not sent', error)
      res.status(400).json({
        message: 'ERROR: Customer Welcome Message not sent',
      })    
    } else {
      console.log(`Customer Welcome Message sent: %s`, info.messageId)
      res.status(200).json({
        message: 'Customer Welcome Message is sent',
        messageId: info.messageId
      })    
    }
  })
})


exports.sendEmailWelcomeGuest = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})

  let customerName = req.body.name
  let customerNameCapitalize = customerName.charAt(0).toUpperCase() + customerName.slice(1)
  let customerEmail = req.body.email
  let emailTemplate = GUEST_EMAIL

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${AUTHEMAIL}`,
      pass: `${AUTHPASS}`
    }
  });

  // setting up email with data in handlebars
  let template = handlebars.compile(emailTemplate)
  let data = { 'name': customerNameCapitalize }
  let templateWithData = template(data)

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Bookinesia" ${AUTHEMAIL}`,
    to: customerEmail,
    subject: `Welcome To Bookinesia, ${data.name}`, 
    html: `${templateWithData}`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('ERROR: Guest Welcome Message not sent ', error)
      res.status(400).json({
        message: 'ERROR: Guest Welcome Message not sent',
      })    
    } else {
      console.log(`Guest Welcome Message sent: %s`, info.messageId)
      res.status(200).json({
        message: 'Guest Welcome Message is sent',
        messageId: info.messageId
      })    
    }
  })
})