import axios from 'axios';

import { getCookies, verifyCookies, setNewCookies } from '../../../helpers/auth';
import { validateEmail } from '../../../helpers/form';
import { getTransaction } from '../transaction/transaction.actions';
import { 
  authSignIn, 
  authPasswordValidation, 
  authUpdatePassword, 
  authUpdateEmail, 
  authCreateUser, 
  authEmailValidation,
  getUserProfile,
  authMigrateAnonymousUser,
} from '../auth/auth.actions';
import swal from 'sweetalert';

export const emptyError = 'This section must be filled.'
export const phoneMinError = 'Phone number is too short, min. 8 characters.'
const phoneRegisteredError = 'Phone number is already registered. Please sign in.'
export const passwordMinError = 'Password is too short, min. 8 characters.'
export const emailInvalidError = 'Invalid email.'
export const emailRegisteredError = 'Email is already registered. Please sign in.'
export const loginError = 'The email or password you entered is incorrect. Please try again.'
export const incorrectPasswordError = 'Incorrect password.'
export const tooManyRequestError = 'Too many unsuccessful authorisation attempts. Try again later.'
export const tooManyRegistrationError = 'Too many unsuccessful registration attempts. Try again later.'
const oldPasswordError = 'The old password you entered is incorrect.'
const samePasswordError = `The new password can't be the same with your old password.`
const notSameNewPasswordError = 'Your new password and its confirmation do not match.'

// ---------------------------------------------- GENERAL ACTION ----------------------------------------------
export const clearUserState = () => {
  return {
    type: 'CLEAR_USER_STATE',
  }
}

export const setCookies = (cookiesFunction) => {
  return {
    type: 'SET_COOKIES_FUNCTION',
    payload: cookiesFunction
  }
}

export const setWindow = (windowFunction) => {
  return {
    type: 'SET_WINDOW_FUNCTION',
    payload: windowFunction
  }
}

// To verify token during component rendering
export const handleCookies = (purpose, cookies, data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let BUID = getCookies(cookies)
    if (BUID) {
      let customerData = verifyCookies(BUID)
      // console.log('check BUID', purpose, '===', customerData)
      let customerId = customerData.id
      if (purpose === 'during input') {
        dispatch(setFormValueBasedOnToken(customerData))
      } else if (purpose === 'get transactions') {
        dispatch(getTransactionsBasedOnCustomerId(customerId))
      } else if (purpose === 'get account') {
        if (data === '/register') {
          dispatch(setCustomerDataSuccess(customerData))
        } else if (data !== '/register') {
          dispatch(setCustomerDataSuccess(customerData))
          dispatch(setAuthenticationStatus(true))
        }
      } else if (purpose === 'during register') {
        dispatch(setRegisterFormValueBasedOnToken(customerData))
      } else if (purpose === 'handle authentication login') {
        if (customerId) {
          dispatch(setAuthenticationStatus(true))
        }
      } else if (purpose === 'handle authentication register') {
        if (customerData.registeredStatus === true) {
          dispatch(setAuthenticationStatus(true))
        }
      } else if (purpose === 'handle authorization transaction') {
        dispatch(getTransactionDetails(data, customerId))
      } else if (purpose === 'handle authorization success') {
        dispatch(getTransaction(data, customerId))
      } else if (purpose === 'get account settings') {
        dispatch(setSettingFormValueBasedOnToken(customerData))
      }
    } else {
      dispatch(setAuthenticationStatus(false))
      dispatch(setAuthorizationStatus(false))
      dispatch(setCustomerDataFailed(false))
    }
  }
}

// To set user authentication status
export const setAuthenticationStatus = (data) => {
  return {
    type: 'SET_AUTHENTICATION_STATUS',
    payload: data
  }
}

// It it to set form value in transaction.reducers.jsx
const setFormValueBasedOnToken = (data) => {
  return {
    type: 'SET_FORM_VALUE_BUID',
    payload: data
  }
}

// To set register form value on redux store
const setRegisterFormValueBasedOnToken = (data) => {
  return {
    type: 'SET_REGISTER_FORM_VALUE_BUID',
    payload: data
  }
}

// To set setting form value based on BUID on redux store
const setSettingFormValueBasedOnToken = (data) => {
  return {
    type: 'SET_SETTING_FORM_VALUE_BUID',
    payload: data
  }
}

// To set customer data to store
const setCustomerDataSuccess = (data) => {
  return {
    type: 'SET_CUSTOMER_DATA_SUCCESS',
    payload: data
  }
}

const setCustomerDataFailed = (data) => {
  return {
    type: 'SET_CUSTOMER_DATA_FAILED',
    payload: data
  }
}

// To Handle Input Changes During Registration
export const handleRegisterInputChanges = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setRegisterCustomerName(value))
    } else if (inputId === 'email') {
      dispatch(setRegisterCustomerEmail(value))
    } else if (inputId === 'phone') {
      dispatch(setRegisterCustomerPhone(value))
    } else if (inputId === 'password') {
      dispatch(setRegisterCustomerPassword(value))
    }
  }
}

const setRegisterCustomerName = (data) => {
  return {
    type: 'SET_REGISTER_CUSTOMER_NAME',
    payload: data
  }
}

const setRegisterCustomerEmail = (data) => {
  return {
    type: 'SET_REGISTER_CUSTOMER_EMAIL',
    payload: data
  }
}

const setRegisterCustomerPhone = (data) => {
  return {
    type: 'SET_REGISTER_CUSTOMER_PHONE',
    payload: data
  }
}

const setRegisterCustomerPassword = (data) => {
  return {
    type: 'SET_REGISTER_CUSTOMER_PASSWORD',
    payload: data
  }
}

// REGISTRATION
// To validate customer's input form of inputting customer information
export const customerRegisterInputValidation = (props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let name = props.customerName
    let phone = props.customerPhone
    let email = props.customerEmail
    let password = props.customerPassword
    let cookies = props.cookies
    
    // To set loading status as true
    await dispatch(setLoadingStatus(true))

    // Input is ERROR
    if (name.length <= 0) {
      await dispatch(setRegisterNameInputError(emptyError))
    } 
    
    if (phone.length <= 0) {
      await dispatch(setRegisterPhoneInputError(emptyError))
    } 
    
    if (phone.length > 0 && phone.length < 8) {
      await dispatch(setRegisterPhoneInputError(phoneMinError))
    }

    // Get user data to determine the error status if user registered status is true from database
    let userByPhone = await dispatch(getCustomerByField('phone', phone))

    let customerExistenceBasedOnPhone = await dispatch(validateCustomerExistence('phone', phone))
    if (userByPhone.registeredStatus === false) {
      customerExistenceBasedOnPhone = false
    }
    if (customerExistenceBasedOnPhone) {
      dispatch(setRegisterPhoneInputError(phoneRegisteredError))
    }
    // console.log('check phone', customerExistenceBasedOnPhone)

    if (password.length <= 0) {
      await dispatch(setRegisterPasswordInputError(emptyError))
    } 
    
    if (password.length > 0 && password.length < 8) {
      await dispatch(setRegisterPasswordInputError(passwordMinError))
    }

    if (email.length <= 0) {
      await dispatch(setRegisterEmailInputError(emptyError))
    } 
    
    if (email.length > 0 && validateEmail(email) === false) {
      await dispatch(setRegisterEmailInputError(emailInvalidError))
    }

    // Get user data to determine the error status if user registered status is true from auth    
    let customerExistenceBasedOnEmail = await dispatch(authEmailValidation(email))
    let authUser = await dispatch(getUserProfile())

    if (authUser) {
      let userByEmail = await dispatch(getCustomerById(authUser.uid))
      userByEmail['email'] = authUser.email

      // LOGIC:
      // 1. If based on authEmailValidation to firebase auth return true, it means the user has been signed in to Auth
      // 2. Next need to check whether user by email have registeredStatus of true. If false, means user has not registered.
      // 3. Since we can't check email profile to firebase auth without password access, if userByEmail.email is not the same with email
      // and from point 1 return true, it means that the user is truely have been registered
      if (userByEmail.registeredStatus === false) {
        if (customerExistenceBasedOnEmail === true && userByEmail.email !== email) {
          customerExistenceBasedOnEmail = true
        } else {
          customerExistenceBasedOnEmail = false
        }
      }
    }

    if (customerExistenceBasedOnEmail === true) {
      dispatch(setRegisterEmailInputError(emailRegisteredError))
    } else if (customerExistenceBasedOnEmail === 'too-many-requests') {
      dispatch(setRegisterEmailInputError(tooManyRegistrationError))
    }
    // console.log('check email', customerExistenceBasedOnEmail)

    // Input is OK
    if (name.length > 0) {
      await dispatch(setRegisterNameInputOK(false))
    } 
    
    if (phone.length >= 8 && customerExistenceBasedOnPhone === false) {
      await dispatch(setRegisterPhoneInputOK(false))
    }

    if (password.length >= 8) {
      await dispatch(setRegisterPasswordInputOK(false))
    } 
    
    if (email.length > 0 && validateEmail(email) && customerExistenceBasedOnEmail === false) {
      await dispatch(setRegisterEmailInputOK(false))
    }
    
    if  (customerExistenceBasedOnPhone === false && customerExistenceBasedOnEmail === false) {
      if (name.length > 0 && phone.length >= 8 && email.length > 0 && validateEmail(email) === true && password.length >= 8) {
        // console.log('pass through')
        let BUID = getCookies(cookies)
        if (BUID) {
          let customerData = verifyCookies(BUID)
          if (customerData.registeredStatus === false) {
            dispatch(authMigrateAnonymousUser(props))
          } else {
            dispatch(authCreateUser(props))
          }
        } else {
          dispatch(authCreateUser(props))
        }
      } else {
        dispatch(setLoadingStatus(false))
      }
    } else {
      dispatch(setLoadingStatus(false))
    }
  }
}

// To handle changes from input text if error
const setRegisterNameInputError = (data) => {
  return {
    type: 'SET_REGISTER_NAME_ERROR',
    payload: data
  }
}

const setRegisterPhoneInputError = (data) => {
  return {
    type: 'SET_REGISTER_PHONE_ERROR',
    payload: data
  }
}

export const setRegisterEmailInputError = (data) => {
  return {
    type: 'SET_REGISTER_EMAIL_ERROR',
    payload: data
  }
}

export const setRegisterPasswordInputError = (data) => {
  return {
    type: 'SET_REGISTER_PASSWORD_ERROR',
    payload: data
  }
}

// To handle changes from input text if OK
const setRegisterNameInputOK = (data) => {
  return {
    type: 'SET_REGISTER_NAME_OK',
    payload: data
  }
}

const setRegisterPhoneInputOK = (data) => {
  return {
    type: 'SET_REGISTER_PHONE_OK',
    payload: data
  }
}

const setRegisterEmailInputOK = (data) => {
  return {
    type: 'SET_REGISTER_EMAIL_OK',
    payload: data
  }
}

const setRegisterPasswordInputOK = (data) => {
  return {
    type: 'SET_REGISTER_PASSWORD_OK',
    payload: data
  }
}

// To Handle Input Changes During Login
export const handleLoginInputChanges = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'phone') {
      dispatch(setLoginCustomerPhone(value))
    } else if (inputId === 'password') {
      dispatch(setLoginCustomerPassword(value))
    } else if (inputId === 'email') {
      dispatch(setLoginCustomerEmail(value))
    }
  }
}

const setLoginCustomerPhone = (data) => {
  return {
    type: 'SET_LOGIN_CUSTOMER_PHONE',
    payload: data
  }
}

const setLoginCustomerPassword = (data) => {
  return {
    type: 'SET_LOGIN_CUSTOMER_PASSWORD',
    payload: data
  }
}

const setLoginCustomerEmail = (data) => {
  return {
    type: 'SET_LOGIN_CUSTOMER_EMAIL',
    payload: data
  }
}

// LOGIN
// To validate customer's input form of inputting customer information
export const customerLoginInputValidation = (props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = props.loginCustomerEmail
    let password = props.loginCustomerPassword
    
    // To set loading status as true
    await dispatch(setLoadingStatus(true))

    // Input is ERROR    
    if (email.length <= 0) {
      await dispatch(setLoginEmailInputError(emptyError))
    } 

    if (password.length <= 0) {
      await dispatch(setLoginPasswordInputError(emptyError))
    } 
    
    // Input is OK    
    if (email.length > 0) {
      await dispatch(setLoginEmailInputOK(false))
    }

    if (password.length > 0) {
      await dispatch(setLoginPasswordInputOK(false))
    } 
        
    if (email.length > 0 && password.length > 0) {
      dispatch(authSignIn(props))
    } else {
      dispatch(setLoadingStatus(false))
    }
    
  }
}

export const setLoadingStatus = (data) => {
  return {
    type: 'SET_LOADING_STATUS',
    payload: data
  }
}

const setLoginEmailInputError = (data) => {
  return {
    type: 'SET_LOGIN_EMAIL_ERROR',
    payload: data
  }
}

const setLoginPasswordInputError = (data) => {
  return {
    type: 'SET_LOGIN_PASSWORD_ERROR',
    payload: data
  }
}

const setLoginEmailInputOK = (data) => {
  return {
    type: 'SET_LOGIN_EMAIL_OK',
    payload: data
  }
}

const setLoginPasswordInputOK = (data) => {
  return {
    type: 'SET_LOGIN_PASSWORD_OK',
    payload: data
  }
}

// To set Login Error
export const setLoginError = (data) => {
  return {
    type: 'SET_LOGIN_ERROR',
    payload: data
  }
}

// To Handle Input Changes During Registration
export const handleSettingInputChanges = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setSettingCustomerName(value))
    } else if (inputId === 'email') {
      dispatch(setSettingCustomerEmail(value))
    } else if (inputId === 'phone') {
      dispatch(setSettingCustomerPhone(value))
    } else if (inputId === 'password') {
      dispatch(setSettingCustomerPassword(value))
    }
  }
}

const setSettingCustomerName = (data) => {
  return {
    type: 'SET_SETTING_CUSTOMER_NAME',
    payload: data
  }
}

const setSettingCustomerEmail = (data) => {
  return {
    type: 'SET_SETTING_CUSTOMER_EMAIL',
    payload: data
  }
}

const setSettingCustomerPhone = (data) => {
  return {
    type: 'SET_SETTING_CUSTOMER_PHONE',
    payload: data
  }
}

const setSettingCustomerPassword = (data) => {
  return {
    type: 'SET_SETTING_CUSTOMER_PASSWORD',
    payload: data
  }
}

// ACCOUNT SETTINGS
// To validate customer's input form of inputting customer information when updating settings
export const customerSettingsInputValidation = (props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let name = props.settingsCustomerName
    let phone = props.settingsCustomerPhone
    let email = props.settingsCustomerEmail
    let password = props.settingsCustomerPassword
    let cookies = props.cookies

    // To set loading status as true
    await dispatch(setLoadingStatus(true))

    // Input is ERROR
    if (name.length <= 0) {
      await dispatch(setSettingNameInputError(emptyError))
    } 
    
    if (phone.length <= 0) {
      await dispatch(setSettingPhoneInputError(emptyError))
    } 
    
    if (phone.length > 0 && phone.length < 8) {
      await dispatch(setSettingPhoneInputError(phoneMinError))
    }

    if (email.length <= 0) {
      await dispatch(setSettingEmailInputError(emptyError))
    } 
    
    if (email.length > 0 && validateEmail(email) === false) {
      await dispatch(setSettingEmailInputError(emailInvalidError))
    }

    if (password.length <= 0) {
      await dispatch(setSettingPasswordInputError(emptyError))
    } 
    
    if (password.length > 0 && password.length < 8) {
      await dispatch(setSettingPasswordInputError(passwordMinError))
    }

    // Input is OK
    if (name.length > 0) {
      await dispatch(setSettingNameInputOK(false))
    } 
    
    if (phone.length >= 8) {
      await dispatch(setSettingPhoneInputOK(false))
    }
    
    if (email.length > 0 && validateEmail(email)) {
      await dispatch(setSettingEmailInputOK(false))
    }

    if (password.length >= 8) {
      await dispatch(setSettingPasswordInputOK(false))
    }     

    if (name.length > 0 && phone.length >= 8 && email.length > 0 && validateEmail(email) === true && password.length >= 8) {
      // console.log('pass through')
      let BUID = getCookies(cookies)
      if (BUID) {
        let customerData = verifyCookies(BUID)

        let passwordStatus = await dispatch(authPasswordValidation(customerData, password))
        if (passwordStatus === true) {
          dispatch(authUpdateEmail(customerData, password, email, props))
        } else if (passwordStatus === false) {
          dispatch(setSettingPasswordInputError(incorrectPasswordError))
          dispatch(setLoadingStatus(false))          
        } else if (passwordStatus === 'too-many-requests') {
          dispatch(setSettingPasswordInputError(tooManyRequestError))
          dispatch(setLoadingStatus(false))          
        }
      } else {
        dispatch(setLoadingStatus(false))
      }
    } else {
      dispatch(setLoadingStatus(false))
    }
  }
}

// To handle changes from input text if error
const setSettingNameInputError = (data) => {
  return {
    type: 'SET_SETTING_NAME_ERROR',
    payload: data
  }
}

const setSettingPhoneInputError = (data) => {
  return {
    type: 'SET_SETTING_PHONE_ERROR',
    payload: data
  }
}

export const setSettingEmailInputError = (data) => {
  return {
    type: 'SET_SETTING_EMAIL_ERROR',
    payload: data
  }
}

const setSettingPasswordInputError = (data) => {
  return {
    type: 'SET_SETTING_PASSWORD_ERROR',
    payload: data
  }
}

// To handle changes from input text if OK
const setSettingNameInputOK = (data) => {
  return {
    type: 'SET_SETTING_NAME_OK',
    payload: data
  }
}

const setSettingPhoneInputOK = (data) => {
  return {
    type: 'SET_SETTING_PHONE_OK',
    payload: data
  }
}

const setSettingEmailInputOK = (data) => {
  return {
    type: 'SET_SETTING_EMAIL_OK',
    payload: data
  }
}

const setSettingPasswordInputOK = (data) => {
  return {
    type: 'SET_SETTING_PASSWORD_OK',
    payload: data
  }
}

// To update customer account information
export const customerUpdateAccount = (customerId, props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let name = props.settingsCustomerName
    let phone = props.settingsCustomerPhone
    let email = props.settingsCustomerEmail
    let history = props.history
    let cookies = props.cookies

    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(customerId)

    customerRef.get()
    .then(doc => {
      if (doc.exists) {
        let id = doc.id
        let { picture, registeredStatus } = doc.data()
        
        let customerData = {
          id, name, email, phone, picture, registeredStatus
        }

        // To handle authorization
        if (customerId === id) {
          
          let customerUpdateRef = firestore.collection('customer').doc(id)
          
          customerUpdateRef.update({
            name,
            phone,
          })
          .then(() => {
            swal("Account Updated", "", "success")
            setNewCookies(cookies, customerData)
            history.push('/account')
            dispatch(setSettingCustomerPassword(''))
            dispatch(setLoadingStatus(false))
          })
          .catch(err => {
            console.log('ERROR: Update customer data', err)
          })
        } else {
          dispatch(setAuthorizationStatus(false))
          dispatch(setLoadingStatus(false))
        }
      } else {
        dispatch(setAuthorizationStatus(false))
        dispatch(setLoadingStatus(false))
      }
    })
    .catch(err => {
      console.log('ERROR: Get customer data to update account information', err)
    })
  
  }
}

// To Handle Input Changes During Change Password
export const handleChangePasswordInputChanges = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'oldPassword') {
      dispatch(setOldPassword(value))
    } else if (inputId === 'newPassword') {
      dispatch(setNewPassword(value))
    } else if (inputId === 'newPasswordConfirm') {
      dispatch(setNewPasswordConfirm(value))
    }
  }
}

export const setOldPassword = (data) => {
  return {
    type: 'SET_OLD_PASSWORD',
    payload: data
  }
}

export const setNewPassword = (data) => {
  return {
    type: 'SET_NEW_PASSWORD',
    payload: data
  }
}

export const setNewPasswordConfirm = (data) => {
  return {
    type: 'SET_NEW_PASSWORD_CONFIRM',
    payload: data
  }
}

// CHANGE PASSWORD
// To validate customer's input form of inputting customer information when changing passwords
export const customerChangePasswordInputValidation = (props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let oldPassword = props.oldPassword
    let newPassword = props.newPassword
    let newPasswordConfirm = props.newPasswordConfirm
    let cookies = props.cookies

    // To set loading status as true
    await dispatch(setLoadingStatus(true))

    // Input is ERROR
    if (oldPassword.length <= 0) {
      await dispatch(setOldPasswordInputError(emptyError))
    } 
    
    if (oldPassword.length > 0 && oldPassword.length < 8) {
      await dispatch(setOldPasswordInputError(passwordMinError))
    }

    if (newPassword.length <= 0) {
      await dispatch(setNewPasswordInputError(emptyError))
    } 
    
    if (newPassword.length > 0 && newPassword.length < 8) {
      await dispatch(setNewPasswordInputError(passwordMinError))
    }

    if (newPasswordConfirm.length <= 0) {
      await dispatch(setNewPasswordConfirmInputError(emptyError))
    } 
    
    if (newPasswordConfirm.length > 0 && newPasswordConfirm.length < 8) {
      await dispatch(setNewPasswordConfirmInputError(passwordMinError))
    }

    // Input is OK
    if (oldPassword.length >= 8) {
      await dispatch(setOldPasswordInputOK(false))
    }

    if (newPassword.length >= 8) {
      await dispatch(setNewPasswordInputOK(false))
    }

    if (newPasswordConfirm.length >= 8) {
      await dispatch(setNewPasswordConfirmInputOK(false))
    }
    
    if (oldPassword.length >= 8 && newPassword.length >= 8 && newPasswordConfirm.length >= 8) {
      // console.log('pass through')
      let BUID = getCookies(cookies)
      if (BUID) {
        let customerData = verifyCookies(BUID)

        let inputErrors = []
        // Combination Error
        let passwordStatus = await dispatch(authPasswordValidation(customerData, oldPassword))
        if (passwordStatus === false) {
          inputErrors.push(oldPasswordError)
        }

        if (oldPassword === newPassword) {
          inputErrors.push(samePasswordError)
        }
        
        if (newPassword !== newPasswordConfirm) {
          inputErrors.push(notSameNewPasswordError)
        }

        if (passwordStatus === 'too-many-requests') {
          inputErrors = []
          inputErrors.push(tooManyRequestError)
        }

        await dispatch(setPasswordCheckingErrors(inputErrors))

        // Combination OK
        if (oldPassword !== newPassword && newPassword === newPasswordConfirm && passwordStatus) {
          dispatch(authUpdatePassword(customerData, oldPassword, newPassword, props.history))
        } else {
          dispatch(setLoadingStatus(false))
        }
      } else {
        dispatch(setLoadingStatus(false))
      }
    } else {
      dispatch(setLoadingStatus(false))
    }
  }
}

// To set password erros
const setPasswordCheckingErrors = (data) => {
  return {
    type: 'SET_PASSWORD_CHECKING_ERRORS',
    payload: data
  }
}

// To handle changes from input text if error
const setOldPasswordInputError = (data) => {
  return {
    type: 'SET_OLD_PASSWORD_INPUT_ERROR',
    payload: data
  }
}

const setNewPasswordInputError = (data) => {
  return {
    type: 'SET_NEW_PASSWORD_INPUT_ERROR',
    payload: data
  }
}

const setNewPasswordConfirmInputError = (data) => {
  return {
    type: 'SET_NEW_PASSWORD_CONFIRM_INPUT_ERROR',
    payload: data
  }
}

// To handle changes from input text if OK
const setOldPasswordInputOK = (data) => {
  return {
    type: 'SET_OLD_PASSWORD_INPUT_OK',
    payload: data
  }
}

const setNewPasswordInputOK = (data) => {
  return {
    type: 'SET_NEW_PASSWORD_INPUT_OK',
    payload: data
  }
}

const setNewPasswordConfirmInputOK = (data) => {
  return {
    type: 'SET_NEW_PASSWORD_CONFIRM_INPUT_OK',
    payload: data
  }
}

// ---------------------------------------------- CUSTOMER ACTION ----------------------------------------------
// To validate customer existence and ensure each customer only have 1 account before register new account
export const validateCustomerExistence = (field, value) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer')
    let customerExistence = false

    await customerRef.where(field, '==', value).get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          customerExistence = true
        })
      } else {
        customerExistence = false
      }
    })
    .catch(err => {
      console.log('ERROR: validate customer data', err)
    })

    return customerExistence
  }
}

// Get single customer data by field provided
export const getCustomerByField = (field, value) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer')
    let user = 'not-found'

    await customerRef.where(field, '==', value).get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          let id = doc.id
          let data = doc.data()
          data['id'] = id
          user = data
        })
      } 
    })
    .catch(err => {
      console.log('ERROR: get customer by field', err)
    })

    return user
  }
}

// Get single customer data by ID
export const getCustomerById = (uid) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(uid)
    let user = 'not-found'

    await customerRef.get()
    .then(doc => {
      let id = doc.id
      let data = doc.data()
      data['id'] = id
      user = data
    })
    .catch(err => {
      console.log('ERROR: get customer by ID', err)
    })

    return user
  }
}

// To create new customer
export const createNewCustomer = (uid, props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let name = props.customerName
    let phone = props.customerPhone
    let picture = ''
    let registeredStatus = true
    let email = props.customerEmail
    let cookies = props.cookies

    let newCustomer = {
      name,
      phone,
      picture,
      registeredStatus
    }

    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(uid)
    
    customerRef.set(newCustomer)
    .then(async () => {
      let customerData = {
        id: uid, name, email, phone, picture, registeredStatus
      }
      setNewCookies(cookies, customerData)
      let sendEmailResult = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailWelcomeCustomer', { name, email })
      if (sendEmailResult.status === 200) {
        window.location.assign('/')
      } else {
        window.location.assign('/')
      }
    })
    .catch(err => {
      console.log('ERROR: create new customer', err)
    })
  }
}


// ---------------------------------------------- TRANSACTION ACTION ----------------------------------------------
// To get transactions data based on customer id
export const getTransactionsBasedOnCustomerId = (customerId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')

    transactionRef
    .where('customerId', '==', customerId)
    .orderBy('createdDate', 'desc')
    .onSnapshot(snapshot => {
      if (snapshot.empty === false) {
        let transactions = []
        snapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          let combineData = {
            ...data,
            id
          }
          transactions.push(combineData)
        })
        dispatch(getTransactionsBasedOnCustomerIdSuccess(transactions))
      } else {
        dispatch(getTransactionsBasedOnCustomerIdFailed(false))
      }
    })
  }
}

const getTransactionsBasedOnCustomerIdSuccess = (data) => {
  return {
    type: 'GET_TRANSACTIONS_CUSTOMER_ID_SUCCESS',
    payload: data
  }
}

const getTransactionsBasedOnCustomerIdFailed = (data) => {
  return {
    type: 'GET_TRANSACTIONS_CUSTOMER_ID_FAILED',
    payload: data
  }
}

// To get real time update of ppointment data based on appointment id
export const getTransactionAppointmentData = (appointmentId, dispatchStatus) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment').doc(appointmentId)
    
    appointmentRef
    .onSnapshot(doc => {
      if (doc.exists) {
        let data = doc.data()
        let id = doc.id
        data['id'] = id
        if (dispatchStatus) {
          dispatch(getTransactionsAppointmentDataSuccess(data))
        }
      } else {
        dispatch(getTransactionsAppointmentDataFailed(false))
      }
    })
  }
}

const getTransactionsAppointmentDataSuccess = (data) => {
  return {
    type: 'GET_TRANSACTIONS_APPOINTMENT_DATA_SUCCESS',
    payload: data
  }
}

const getTransactionsAppointmentDataFailed = (data) => {
  return {
    type: 'GET_TRANSACTIONS_APPOINTMENT_DATA_FAILED',
    payload: data
  }
}

// To get transaction data based on transaction id
export const getTransactionDetails = (transactionId, customerId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction').doc(transactionId)

    transactionRef
    .onSnapshot(doc => {
      if (doc.exists) {
        let data = doc.data()
        let id = doc.id
        let combineData = {
          ...data,
          id
        }
        // Check authorization
        if (customerId === data.customerId) {
          dispatch(getTransactionAppointmentData(data.appointment.id, true))
          dispatch(getTransactionSuccess(combineData))
        } else {
          dispatch(setAuthorizationStatus(false))
        }
      } else {
        dispatch(getTransactionFailed(false))
      }
    })
  }
}

export const setAuthorizationStatus = (data) => {
  return {
    type: 'SET_AUTHORIZATION_STATUS',
    payload: data
  }
}

const getTransactionSuccess = (data) => {
  return {
    type: 'GET_TRANSACTION_DATA_SUCCESS',
    payload: data
  }
}

const getTransactionFailed = (data) => {
  return {
    type: 'GET_TRANSACTION_DATA_FAILED',
    payload: data
  }
}

// To execute customer request to cancel transaction
export const customerCancelTransaction = (transaction, appointment) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let customerId = transaction.customerId
    let latestUpdatedBy = {
      type: 'customer',
      id: customerId
    }

    swal({
      title: 'Are you sure?',
      text: "Your transaction will be removed from list of appointments.",
      icon: 'warning',
      buttons: ['Cancel', 'OK']
    })
    .then(result => {
      if (result) {
        let transactionRef = firestore.collection('transaction').doc(transaction.id)
        let appointmentRef = firestore.collection('appointment').doc(appointment.id)
        let newMaxQueue = String(Number(appointment.maxQueue) + 1)

        transactionRef.update({
          status: 'canceled',
          updatedBy: latestUpdatedBy,
          updatedDate: new Date(Date.now()),
        })
        .then(() => {
          appointmentRef.update({
            maxQueue: newMaxQueue
          })
          .then(() => {
            swal("Canceled!", "Your appointment has been canceled", "success");
          })
          .catch(err => {
            console.log('ERROR: cancel transactions - update appointment', err)
          })
        })
        .catch(err => {
          console.log('ERROR: cancel transactions', err)
        })

      }
    })
  }
}
