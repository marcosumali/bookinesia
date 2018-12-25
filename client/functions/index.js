const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  let name = request.body.name
  console.log('object', name)
  response.send("Hello from Firebase!")
})

exports.getUserBasedOnUid = functions.https.onRequest((req, res) => {
  // Put this line to your function
  // Automatically allow cross-origin requests
  cors(req, res, () => {})
  
  let uid = req.body.uid

  admin.auth().getUser(uid)
  .then(function(userRecord) {
    let userData = userRecord.toJSON() 
    let user = userData.providerData[0]
    let id = userData.uid
    user['id'] = id
    res.status(200).json({
      message: 'Get user based on UID successful',
      user
    })
  })
  .catch(function(error) {
    console.log("ERROR: fetching user data by UID", error)
  })
})

exports.getUserBasedOnEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {})
  
  let email = req.body.email

  admin.auth().getUserByEmail(email)
  .then(function(userRecord) {
    let userData = userRecord.toJSON() 
    let user = userData.providerData[0]
    let id = userData.uid
    user['id'] = id
    res.status(200).json({
      message: 'Get user based on email successful',
      user
    })
  })
  .catch(function(error) {
    console.log("ERROR: fetching user data by Email", error)
  })
})


