require('dotenv').config()
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const fs = require('fs')
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport');
const handlebars = require('handlebars');

const AUTO_EMAIL = process.env.EMAIL_AUTOMATED
const AUTH_USERNAME = process.env.SENDGRID_USERNAME
const AUTH_PASS = process.env.SENDGRID_PASS
const REGISTER_EMAIL = fs.readFileSync(__dirname + '/nodemailer/templates/welcome.customer.html', 'utf-8')

admin.initializeApp(functions.config().firebase);

exports.getUserBasedOnUid = functions.https.onRequest((req, res) => {
  // Put this line to your function
  // Automatically allow cross-origin requests
  cors(req, res, () => {
    let uid = req.body.uid
  
    admin.auth().getUser(uid)
    .then(function(userRecord) {
      let userData = userRecord.toJSON() 
      let user = {
        id: userData.uid,
        email: userData.email,
        name: userData.displayName,
        picture: userData.photoURL,
        phone: userData.phoneNumber,
      }
      res.status(200).json({
        message: 'Get user based on UID successful',
        user
      })
    })
    .catch(function(error) {
      console.log("ERROR: fetching user data by UID", error)
      res.status(400).json({
        message: 'ERROR: fetching user data by UID',
        error
      })
    })
  })
})


exports.getUserBasedOnEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let email = req.body.email
  
    admin.auth().getUserByEmail(email)
    .then(function(userRecord) {
      let userData = userRecord.toJSON()
      let user = {
        id: userData.uid,
        email: userData.email,
        name: userData.displayName,
        picture: userData.photoURL,
        phone: userData.phoneNumber,
      }
      res.status(200).json({
        message: 'Get user based on email successful',
        user,
      })
    })
    .catch(function(error) {
      console.log("ERROR: fetching user data by Email", error)
      res.status(400).json({
        message: 'ERROR: fetching user data by Email',
        error
      })
    })
  })
})


exports.getUserBasedOnPhone = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let phone = req.body.phone
  
    admin.auth().getUserByPhoneNumber(phone)
    .then(function(userRecord) {
      let userData = userRecord.toJSON()
      let user = {
        id: userData.uid,
        email: userData.email,
        name: userData.displayName,
        picture: userData.photoURL,
        phone: userData.phoneNumber,
      }
      res.status(200).json({
        message: 'Get user based on phone successful',
        user,
      })
    })
    .catch(function(error) {
      console.log("ERROR: fetching user data by Phone", error)
      res.status(400).json({
        message: 'ERROR: fetching user data by Phone',
        error
      })
    })
  })
})


exports.adminUpdateUserProfile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let uid = req.body.uid
    let phone = req.body.phone
  
    admin.auth().updateUser(uid, {
      phoneNumber: phone,
    })
    .then(function(userRecord) {
      let userData = userRecord.toJSON()
      let user = {
        id: userData.uid,
        email: userData.email,
        name: userData.displayName,
        picture: userData.photoURL,
        phone: userData.phoneNumber,
      }
      res.status(200).json({
        message: 'Update user profile successful',
        user,
        phone
      })
    })
    .catch(function(error) {
      console.log("ERROR: update user profile", error)
      res.status(400).json({
        message: 'ERROR: update user profile',
        error,
        phone
      })
    })
  })
})


exports.sendEmailWelcomeCustomer = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})

  let customerName = req.body.name
  let customerNameCapitalize = customerName.charAt(0).toUpperCase() + customerName.slice(1)
  let customerEmail = req.body.email

  let emailTemplate = REGISTER_EMAIL

  // setting up email with data in handlebars
  let template = handlebars.compile(emailTemplate)
  let data = { 'name': customerNameCapitalize }
  let templateWithData = template(data)

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Bookinesia" ${AUTO_EMAIL}`,
    to: customerEmail,
    subject: `Welcome To Bookinesia, ${data.name}`, 
    html: `${templateWithData}`
  }

  // send mail with defined transport object
  let options = {
    auth: {
      api_user: `${AUTH_USERNAME}`,
      api_key: `${AUTH_PASS}`
    }
  }
  
  let client = nodemailer.createTransport(sgTransport(options))

  client.sendMail(mailOptions, function(err, info){
    if (err){
      console.log('ERROR: Customer Welcome Message not sent ', err)
      res.status(400).json({
        message: 'ERROR: Customer Welcome Message not sent',
        err,
      })    
    }
    else {
      // console.log(`Customer Welcome Message sent`, info.message)
      res.status(200).json({
        message: 'Customer Welcome Message is sent',
        messageInfo: info.message
      })    
    }
  })
})