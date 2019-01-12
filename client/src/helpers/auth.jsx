const jwt = require('jsonwebtoken');

const PRIVATEKEY = process.env.REACT_APP_PRIVATEKEY

let todayFullDate = new Date(Date.now())
let todayYear = todayFullDate.getFullYear()
let todayDate = todayFullDate.getDate()
let todayMonth = todayFullDate.getMonth() + 1
let expirationYear = Number(todayYear) + 10
let expirationDate = new Date(expirationYear, todayMonth, todayDate)

function getCookies(cookies) {
  let  BUID = cookies.get('BUID')
  return BUID
}

function setNewCookies(cookies, customerData) {
  let BUID = jwt.sign(customerData, PRIVATEKEY)
  cookies.set('BUID', BUID, { path: '/', secure: false, expires: expirationDate })
}

function verifyCookies(BUID) {
  let decodedBUID = jwt.verify(BUID, PRIVATEKEY)
  return decodedBUID
}

function removeCookies(cookies) {
  cookies.remove('BUID',  { path: '/', secure: false, expires: expirationDate })
}


module.exports = {
  setNewCookies,
  verifyCookies,
  getCookies,
  removeCookies
}



