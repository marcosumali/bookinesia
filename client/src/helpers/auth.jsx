const jwt = require('jsonwebtoken');
const PRIVATEKEY = process.env.REACT_APP_PRIVATEKEY

function getCookies(cookies) {
  let  BUID = cookies.get('BUID')
  return BUID
}

function setNewCookies(cookies, id) {
  let BUID = jwt.sign(id, PRIVATEKEY)
  let todayFullDate = new Date(Date.now())
  let todayYear = todayFullDate.getFullYear()
  let todayDate = todayFullDate.getDate()
  let todayMonth = todayFullDate.getMonth() + 1
  let expirationYear = Number(todayYear) + 10
  let expirationDate = new Date(expirationYear, todayMonth, todayDate)
  cookies.set('BUID', BUID, { path: '/', secure: false, expires: expirationDate })
}

function verifyCookies(BUID) {
  let decodedBUID = jwt.verify(BUID, PRIVATEKEY)
  return decodedBUID
}

module.exports = {
  setNewCookies,
  verifyCookies,
  getCookies
}



