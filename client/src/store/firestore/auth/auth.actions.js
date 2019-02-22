import { setNewCookies, removeCookies, getCookies } from '../../../helpers/auth';
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
  setSettingEmailInputError,
  tooManyRequestError
} from '../customer/customer.actions';
import {
  createNewTransaction,
  setPasswordInputError,
} from '../transaction/transaction.actions';
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

export const getUserProfile = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase()
    let user = firebase.auth().currentUser
    return user
  }
}

export const authUpdateUserProfileByField = (field, value) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase()
    let user = firebase.auth().currentUser
    let updateStatus = 'none'

    await user.updateProfile({
      [field]: value
    }).then(function() {
      updateStatus = true
    }).catch(function(err) {
      console.log('ERROR: auth update user profile', err)
      updateStatus = false
    });

    return updateStatus
  }
}

export const authCreateUser = (props, formattedPhone, createTransactionStatus) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = props.customerEmail
    let password = props.customerPassword

    let firebase = getFirebase()
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async response => {
      let uid = response.user.uid

      let updateProfileName = await dispatch(authUpdateUserProfileByField('displayName', props.customerName))

      if (updateProfileName === true) {
        dispatch(createNewCustomer(uid, props, formattedPhone, createTransactionStatus))
      }
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
      dispatch(afterLoginValidation(uid, email, props, null))
    })
    .catch(err => {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
        dispatch(setLoginError(loginError))
        dispatch(setLoadingStatus(false))
      } else if (err.code === 'auth/user-disabled') {
        dispatch(setLoginError(loginDisableError))
        dispatch(setLoadingStatus(false))
      } else if (err.code === 'auth/too-many-requests') {
        dispatch(setLoginError(tooManyRequestError))
        dispatch(setLoadingStatus(false))
      }
    })
  }
}

export const authSignInTransaction = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = props.customerEmail
    let password = props.customerPassword

    let firebase = getFirebase()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      let uid = response.user.uid
      let email = response.user.email
      dispatch(afterLoginValidation(uid, email, props, 'continue'))
    })
    .catch(err => {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
        dispatch(setPasswordInputError(loginError))
        dispatch(setLoadingStatus(false))
      } else if (err.code === 'auth/user-disabled') {
        dispatch(setPasswordInputError(loginDisableError))
        dispatch(setLoadingStatus(false))
      } else if (err.code === 'auth/too-many-requests') {
        dispatch(setPasswordInputError(tooManyRequestError))
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

export const authUserValidation = (email, password) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let validateResult = 'no-user'

    let firebase = getFirebase()
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      let id = response.user.uid
      let email = response.user.email
      let name = response.user.displayName
      let picture = response.user.photoURL
      let phone = response.user.phoneNumber
      let user = { id, email, name, picture, phone }
      validateResult = user
    })
    .catch(err => {
      if (err.code === 'auth/too-many-requests') {
        validateResult = 'too-many-requests'
      } else {
        validateResult = false
      }
    })

    return validateResult
  }  
}

export const authPasswordValidation = (customerData, password) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = customerData.email
    let validateResult = 'none'

    let firebase = getFirebase()
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      validateResult = true
    })
    .catch(err => {
      if (err.code === 'auth/too-many-requests') {
        validateResult = 'too-many-requests'
      } else {
        validateResult = false
      }
    })

    return validateResult
  }  
}

export const authEmailValidation = (email) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let validateResult = ''
    let password = 'no-password'

    let firebase = getFirebase()
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(err => {
      // TRUE means user exist while FALSE means user not exist
      if (err.code === 'auth/user-not-found') {
        validateResult = false
      } else if (err.code === 'auth/wrong-password') {
        validateResult = true
      } else if (err.code === 'auth/invalid-email') {
        // Do nothing
      } else if (err.code === 'auth/user-disabled') {
        validateResult = true
      } else if (err.code === 'auth/too-many-requests') {
        validateResult = 'too-many-requests'
      } 
    })

    return validateResult
  }
}

export const authUpdateEmail = (customerData, password, newEmail, props, formattedPhone) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase()

    let user = firebase.auth().currentUser
    let email = customerData.email
    let credential = firebase.auth.EmailAuthProvider.credential(
      email, 
      password
    )

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
      user.updateEmail(newEmail).then(async function() {
        
        let updateProfileName = await dispatch(authUpdateUserProfileByField('displayName', props.settingsCustomerName))

        if (updateProfileName === true) {
          dispatch(customerUpdateAccount(customerData, props, formattedPhone))
        }

      }).catch(function(err) {
        console.log('ERROR: update email', err)
        if (err.code === 'auth/email-already-in-use') {
          dispatch(setSettingEmailInputError(err.message))
          dispatch(setLoadingStatus(false))
        }
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

// To redirect sign out and delete cookies user if the user has changed their email and reverse it through firebase auth email
export const authRedirectAndSignOut = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let cookies = props.cookies
    let window = props.window
    let BUID = getCookies(cookies)

    if (BUID) {
      if (props.authUser.isLoaded && props.authUser.isEmpty && window.navigator.onLine) {
        dispatch(authSignOut(cookies))
        window.location.assign('/')
      }
    }
  }
}


// ---------------------------------------------- CUSTOMER ACTION ----------------------------------------------
export const afterLoginValidation = (uid, email, props, createTransactionStatus) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let cookies = props.cookies
    let window = props.window

    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(uid)

    customerRef.get()
    .then(doc => {
      if (doc.exists) {
        let id = doc.id
        let { name } = doc.data()
        let customerData = {
          id, name, email
        }
        dispatch(setLoginError(''))
        setNewCookies(cookies, customerData)
        if (createTransactionStatus === 'continue') {
          dispatch(createNewTransaction(customerData.id, props))
        } else {
          window.location.assign('/')
        }
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