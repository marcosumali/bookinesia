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
  createNewCustomerAndCreateNewTransaction
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

export const authCreateUser = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = props.customerEmail
    let password = props.customerPassword

    let firebase = getFirebase()
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async response => {
      let uid = response.user.uid

      let updateProfileResult = await dispatch(authUpdateUserProfileByField('displayName', props.customerName))

      if (updateProfileResult === true) {
        dispatch(createNewCustomer(uid, props))
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
      dispatch(afterLoginValidation(uid, email, props))
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
        dispatch(authUpdateUserProfileByField('displayName', props.settingsCustomerName))
        dispatch(customerUpdateAccount(customerId, props))
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

export const authSignInAnonymouslyAndCreateNewTransaction = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = props.customerEmail
    let firebase = getFirebase()
    
    firebase.auth().signInAnonymously()
    .then(response => {
      let uid = response.user.uid
      let user = firebase.auth().currentUser

      user.updateEmail(email)
      .then(async function() {
        let updateProfileResult = await dispatch(authUpdateUserProfileByField('displayName', props.customerName))
        if (updateProfileResult === true) {
          dispatch(createNewCustomerAndCreateNewTransaction(uid, props))
        }
      }).catch(function(err) {
        console.log('ERROR: update profile anonymous', err)
      })
    })
    .catch(function(err) {
      console.log('ERROR: sign in guest', err)
    })
  }
}

// To migrate user from anonymous user to registered user
export const authMigrateAnonymousUser = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = props.customerEmail
    let password = props.customerPassword

    let firebase = getFirebase()
    let credential = firebase.auth.EmailAuthProvider.credential(email, password)
    
    firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential)
    .then(function(usercred) {
      let uid = usercred.user.uid
      dispatch(migrateRegisteredStatus(uid, props))
    }, function(err) {
      console.log("ERROR: migrating account", err)
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
export const afterLoginValidation = (uid, email, props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let cookies = props.cookies
    let window = props.window

    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(uid)

    customerRef.get()
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

export const migrateRegisteredStatus = (id, props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let window = props.window
    let cookies = props.cookies
    let name = props.customerName
    let phone = props.customerPhone
    let email = props.customerEmail
    let picture = ''
    let registeredStatus = true
    
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(id)

    customerRef.update({
      registeredStatus
    })
    .then(() => {
      let customerData = {
        id, name, email, phone, picture, registeredStatus
      }
      setNewCookies(cookies, customerData)
      window.location.assign('/')
    })
    .catch(err => {
      console.log('ERROR: updating migration status', err)
    })
  }
}
