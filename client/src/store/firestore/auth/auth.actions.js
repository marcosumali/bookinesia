import { setNewCookies, removeCookies } from '../../../helpers/auth';
import { 
  loginError, 
  setLoadingStatus, 
  setLoginError,
  setAuthenticationStatus,
  customerUpdateAccount,
  setOldPassword,
  setNewPassword,
  setNewPasswordConfirm,
  setRegisterEmailInputError,
  emailRegisteredError,
  emailInvalidError,
  setRegisterPasswordInputError,
  passwordMinError,
  createNewCustomer,
} from '../customer/customer.actions';
import swal from 'sweetalert';

export const loginDisableError = `Your account has been disabled. We're sorry for the inconvenience.`

// ---------------------------------------------- FIREBASE AUTH ACTION ----------------------------------------------
export const getAuthStatus = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {  
    let firebase = getFirebase()
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch(setAuthenticationStatus(true))
      } else {
        dispatch(setAuthenticationStatus(false))
      }
    })
  }
}

export const authCreateUser = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = props.customerEmail
    let password = props.customerPassword

    let firebase = getFirebase()
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      let uid = response.user.uid
      dispatch(createNewCustomer(uid, props))
    })
    .catch(function(err) {
      if (err.code === 'auth/email-already-in-use') {
        dispatch(setRegisterEmailInputError(emailRegisteredError))
      } else if (err.code === 'auth/invalid-email' || err.code === 'auth/operation-not-allowed') {
        dispatch(setRegisterEmailInputError(emailInvalidError))
      } else if (err.code === 'auth/weak-password') {
        dispatch(setRegisterPasswordInputError(passwordMinError))
      }
    })

  }
}

export const authSignIn = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = props.loginCustomerEmail
    let password = props.loginCustomerPassword

    let firebase = getFirebase()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      let uid = response.user.uid
      let email = response.user.email
      dispatch(afterLoginValidation(uid, email, props))
    })
    .catch(err => {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
        dispatch(setLoginError(loginError))
        dispatch(setLoadingStatus(false))
      } else if (err.code === 'auth/user-disabled') {
        dispatch(setLoginError(loginDisableError))
        dispatch(setLoadingStatus(false))
      } 
    })
  }
}

export const authSignOut = (cookies) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase()
    firebase.auth().signOut().then(function() {
      removeCookies(cookies)
    }).catch(function(err) {
      console.log('ERROR: sign out', err)
    });
  }
}

export const authPasswordValidation = (customerData, oldPassword) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = customerData.email
    let validateResult = 'none'

    let firebase = getFirebase()
    await firebase.auth().signInWithEmailAndPassword(email, oldPassword)
    .then(() => {
      validateResult = true
    })
    .catch(err => {
      validateResult = false
    })

    return validateResult
  }  
}

export const authUpdateEmail = (customerData, password, newEmail, props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase()

    let user = firebase.auth().currentUser
    let email = customerData.email
    let credential = firebase.auth.EmailAuthProvider.credential(
      email, 
      password
    )

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
      user.updateEmail(newEmail).then(function() {
        let customerId = customerData.id
        dispatch(customerUpdateAccount(customerId, props))
      }).catch(function(err) {
        console.log('ERROR: update email', err)
      })
    }).catch(function(err) {
      console.log('ERROR: reauthenticate user', err)
    })
  }
}

export const authUpdatePassword = (customerData, oldPassword, newPassword, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase()

    let user = firebase.auth().currentUser
    let email = customerData.email
    let credential = firebase.auth.EmailAuthProvider.credential(
      email, 
      oldPassword
    )

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
      user.updatePassword(newPassword).then(function() {
        swal("Change Password Successful", "", "success")
        history.push('/account')
        dispatch(setLoadingStatus(false))
        dispatch(setOldPassword(''))
        dispatch(setNewPassword(''))
        dispatch(setNewPasswordConfirm(''))
      }).catch(function(err) {
        console.log('ERROR: update password', err)
      })
    }).catch(function(err) {
      console.log('ERROR: reauthenticate user', err)
    })
  }
}

// ---------------------------------------------- CUSTOMER ACTION ----------------------------------------------
export const afterLoginValidation = (uid, email, props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let cookies = props.cookies
    let window = props.window

    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(uid)

    customerRef
    .get()
    .then(doc => {
      if (doc.exists) {
        let id = doc.id
        let { name, phone, picture, registeredStatus } = doc.data()
        let customerData = {
          id, name, email, phone, picture, registeredStatus
        }
        dispatch(setLoginError(''))
        setNewCookies(cookies, customerData)
        window.location.assign('/')
      } else {
        dispatch(setLoginError(loginError))
        dispatch(setLoadingStatus(false))
      }
    })
    .catch(err => {
      console.log('ERROR: customer login validation', err)
    })
  }
}