import { getCookies, verifyCookies, setNewCookies } from '../../../helpers/auth';
import { validateEmail } from '../../../helpers/form';

const bcrypt = require('bcryptjs')
const ENV_SALTROUNDS = Number(process.env.REACT_APP_SALTROUNDS)
const SALTROUNDS = bcrypt.genSaltSync(ENV_SALTROUNDS)
const emptyError = 'This section must be filled.'
const phoneMinError = 'Phone number is too short, min. 8 characters.'
const phoneRegisteredError = 'Phone number is already registered. Please sign in.'
const passwordMinError = 'Password is too short, min. 8 characters.'
const emailInvalidError = 'Invalid email.'
const emailRegisteredError = 'Email is already registered. Please sign in.'
const loginError = 'The phone number or password you entered is incorrect. Please try again.'

// ---------------------------------------------- GENERAL ACTION ----------------------------------------------
export const setCookies = (cookiesFunction) => {
  return {
    type: 'SET_COOKIES_FUNCTION',
    payload: cookiesFunction
  }
}

// To verify token during component rendering
export const handleCookies = (purpose, cookies) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let BUID = getCookies(cookies)
    if (BUID) {
      let customerData = verifyCookies(BUID)
      console.log('check BUID', purpose,  '===', customerData)
      let customerId = customerData.id
      if (purpose === 'during input') {
        dispatch(setFormValueBasedOnToken(customerData))
      } else if (purpose === 'get transactions') {
        dispatch(getTransactionsBasedOnCustomerId(customerId))
      } else if (purpose === 'get account') {
        dispatch(setCustomerDataSuccess(customerData))
      } else if (purpose === 'during register') {
        dispatch(setRegisterFormValueBasedOnToken(customerData))
      } else if (purpose === 'handle authentication login') {
        if (customerId) {
          dispatch(setAuthenticationStatus(true))
        }
      } else if (purpose === 'handle authentication register') {
        if (customerData.registeredStatus) {
          dispatch(setAuthenticationStatus(true))
        }
      }
    } else {
      dispatch(setCustomerDataFailed(false))
    }
  }
}

// To set user authentication status
const setAuthenticationStatus = (data) => {
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

// To Handle Input Changes During Registration
export const handleLoginInputChanges = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'phone') {
      dispatch(setLoginCustomerPhone(value))
    } else if (inputId === 'password') {
      dispatch(setLoginCustomerPassword(value))
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

    let customerExistenceBasedOnPhone = await dispatch(validateCustomerExistence('phone', phone))
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

    let customerExistenceBasedOnEmail = await dispatch(validateCustomerExistence('email', email))
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
        dispatch(setRegisterSuccess(true))
        let BUID = getCookies(cookies)
        if (BUID) {
          let customerData = verifyCookies(BUID)
          dispatch(updatePasswordCustomer(customerData, props))
        } else {
          dispatch(createNewCustomer(props))
        }
      } else {
        dispatch(setLoadingStatus(false))
      }
    } else {
      dispatch(setLoadingStatus(false))
    }
  }
}

// To set register status to true - limit customer to only able to register once each render
const setRegisterSuccess = (data) => {
  return {
    type: 'SET_REGISTER_STATUS_SUCCESS',
    payload: data
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

const setRegisterEmailInputError = (data) => {
  return {
    type: 'SET_REGISTER_EMAIL_ERROR',
    payload: data
  }
}

const setRegisterPasswordInputError = (data) => {
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

// To validate customer existence and ensure each customer only have 1 account before register new account
const validateCustomerExistence = (field, value) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer')
    let customerExistence = false

    await customerRef.where(field, '==', value).get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          let data = doc.data()
          if (data.password.length >= 8) {
            customerExistence = true
            if (field === 'phone') {
              dispatch(setRegisterPhoneInputError(phoneRegisteredError))
            } else if (field === 'email') {
              dispatch(setRegisterEmailInputError(emailRegisteredError))
            }
          }
        })
      } 
    })
    .catch(err => {
      console.log('ERROR: check customer data', err)
    })

    return customerExistence
  }
}

// LOGIN
// To validate customer's input form of inputting customer information
export const customerLoginInputValidation = (props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let phone = props.loginCustomerPhone
    let password = props.loginCustomerPassword
    
    // To set loading status as true
    await dispatch(setLoadingStatus(true))

    // Input is ERROR    
    if (phone.length <= 0) {
      await dispatch(setLoginPhoneInputError(emptyError))
    } 
    
    if (phone.length > 0 && phone.length < 8) {
      await dispatch(setLoginPhoneInputError(phoneMinError))
    }

    if (password.length <= 0) {
      await dispatch(setLoginPasswordInputError(emptyError))
    } 
    
    if (password.length > 0 && password.length < 8) {
      await dispatch(setLoginPasswordInputError(passwordMinError))
    }

    // Input is OK    
    if (phone.length >= 8) {
      await dispatch(setLoginPhoneInputOK(false))
    }

    if (password.length >= 8) {
      await dispatch(setLoginPasswordInputOK(false))
    } 
        
    if (phone.length >= 8 && password.length >= 8) {
      dispatch(setLoginSuccess(true))
      dispatch(customerLoginValidation(props))
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


// To set register status to true - limit customer to only able to register once each render
const setLoginSuccess = (data) => {
  return {
    type: 'SET_LOGIN_STATUS_SUCCESS',
    payload: data
  }
}

// To handle changes from input text if error
const setLoginPhoneInputError = (data) => {
  return {
    type: 'SET_LOGIN_PHONE_ERROR',
    payload: data
  }
}

const setLoginPasswordInputError = (data) => {
  return {
    type: 'SET_LOGIN_PASSWORD_ERROR',
    payload: data
  }
}

// To handle changes from input text if OK
const setLoginPhoneInputOK = (data) => {
  return {
    type: 'SET_LOGIN_PHONE_OK',
    payload: data
  }
}

const setLoginPasswordInputOK = (data) => {
  return {
    type: 'SET_LOGIN_PASSWORD_OK',
    payload: data
  }
}

export const customerLoginValidation = (props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let phone = props.loginCustomerPhone
    let inputtedPassword = props.loginCustomerPassword
    let cookies = props.cookies
    let history = props.history

    let firestore = getFirestore()
    let customerRef = firestore.collection('customer')

    customerRef
    .where('phone', '==', phone)
    .get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          let { name, email, phone, password, picture  } = doc.data()
          let id = doc.id
          let registeredStatus = true
          let customerData = {
            id, name, email, phone, picture, registeredStatus
          }
          
          let compareResult = bcrypt.compareSync(inputtedPassword, password)

          if (compareResult) {
            dispatch(setLoginError(''))
            setNewCookies(cookies, customerData)
            history.push('/')
          } else {
            dispatch(setLoginError(loginError))
          }
        })
      } else {
        dispatch(setLoginError(loginError))
      }
      dispatch(setLoadingStatus(false))
    })
    .catch(err => {
      console.log('ERROR: customer login validation', err)
    })
  }
}

const setLoginError = (data) => {
  return {
    type: 'SET_LOGIN_ERROR',
    payload: data
  }
}


// ---------------------------------------------- CUSTOMER ACTION ----------------------------------------------
// // To get customer based on purpose. Originally to handle cookies since cookies only consist of id.
// // Hence to get customer data, we need to create the function
// // Afterwards, we develop handle cookies including all customer data except password
// export const getCustomerBasedOnPurpose = (purpose, customerId) => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     let firestore = getFirestore()
//     let customerRef = firestore.collection('customer').doc(customerId)

//     customerRef.get()
//     .then(doc => {
//       if (doc.exists) {
//         // let data = doc.data()
//         if (purpose === '') {
//           // dispatch(setCustomerDataSuccess(data))
//         } 
//       } else {
//         // dispatch(setCustomerDataFailed(false))
//       }
//     })
//     .catch(err => {
//       console.log('ERROR: Get customer data during input', err)
//     })
//   }
// }

export const updatePasswordCustomer = (customerData, props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let customerId = customerData.id
    customerData.registeredStatus = true
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(customerId)
    let password = props.customerPassword
    let cookies = props.cookies
    let history = props.history

    let hashedPassword = bcrypt.hashSync(password, SALTROUNDS)

    customerRef.update({
      password: hashedPassword
    })
    .then(() => {
      setNewCookies(cookies, customerData)
      dispatch(setLoadingStatus(false))
      history.push('/')
    })
    .catch(err => {
      console.log('ERROR: register password', err)
    })

  }
}

export const createNewCustomer = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer')
    let name = props.customerName
    let phone = props.customerPhone
    let email = props.customerEmail
    let password = props.customerPassword
    let picture = ''
    let history = props.history
    let cookies = props.cookies
    let registeredStatus = true

    let newCustomer = {
      name,
      phone,
      email,
      password,
      picture
    }

    customerRef.add(newCustomer)
    .then(ref => {
      let refId = ref.id
      let customerData = {
        id: refId, name, email, phone, picture, registeredStatus
      }
      setNewCookies(cookies, customerData)
      dispatch(setLoadingStatus(false))
      history.push('/')
    })
    .catch(err => {
      console.log('ERROR: register password', err)
    })

  }
}


// ---------------------------------------------- TRANSACTION ACTION ----------------------------------------------
// To get transactions data based on customer id
export const getTransactionsBasedOnCustomerId = (customerId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')

    transactionRef
    .where('customerId', '==', customerId)
    .get()
    .then(snapshot => {
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
    .catch(err => {
      console.log('ERROR: get transactions based on customer id', err)
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

// To get shop data based on shop id
export const getTransactionShopData = (shopId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let shopRef = firestore.collection('shop').doc(shopId)

    shopRef.get()
    .then(shopDoc => {
      if (shopDoc.exists) {
        let shopData = shopDoc.data()
        dispatch(getTransactionsShopDataSuccess(shopData))
      } else {
        dispatch(getTransactionsShopDataFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR: get shop data in transactions', err)
    })
  }
}

const getTransactionsShopDataSuccess = (data) => {
  return {
    type: 'GET_TRANSACTIONS_SHOP_DATA_SUCCESS',
    payload: data
  }
}

const getTransactionsShopDataFailed = (data) => {
  return {
    type: 'GET_TRANSACTIONS_SHOP_DATA_FAILED',
    payload: data
  }
}

// To get branch data based on branch id
export const getTransactionBranchData = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let branchRef = firestore.collection('branch').doc(branchId)

    branchRef.get()
    .then(branchDoc => {
      if (branchDoc.exists) {
        let branchData = branchDoc.data()
        dispatch(getTransactionsBranchDataSuccess(branchData))
      } else {
        dispatch(getTransactionsBranchDataFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR: get branch data in transactions', err)
    })
  }
}

const getTransactionsBranchDataSuccess = (data) => {
  return {
    type: 'GET_TRANSACTIONS_BRANCH_DATA_SUCCESS',
    payload: data
  }
}

const getTransactionsBranchDataFailed = (data) => {
  return {
    type: 'GET_TRANSACTIONS_BRANCH_DATA_FAILED',
    payload: data
  }
}

// To get appointment data based on appointment id
export const getTransactionAppointmentData = (appointmentId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment').doc(appointmentId)

    appointmentRef
    .onSnapshot(doc => {
      if (doc.exists) {
        let data = doc.data()
        dispatch(getTransactionsAppointmentDataSuccess(data))
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
export const getTransaction = (transactionId) => {
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
        dispatch(getTransactionShopData(data.shopId))
        dispatch(getTransactionBranchData(data.branchId))
        dispatch(getTransactionAppointmentData(data.appointmentId))
        dispatch(getTransactionSuccess(combineData))
      } else {
        dispatch(getTransactionFailed(false))
      }
    })
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



