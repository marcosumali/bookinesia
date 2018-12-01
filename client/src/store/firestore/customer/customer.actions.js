import { getCookies, verifyCookies } from '../../../helpers/auth';

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
      let customerId = verifyCookies(BUID)
      if (purpose === 'during input') {
        dispatch(getCustomerBasedOnPurpose(purpose, customerId))
      } else if (purpose === 'get transactions') {
        dispatch(getTransactionsBasedOnCustomerId(customerId))
      } else if (purpose === 'get account') {
        dispatch(getCustomerBasedOnPurpose(purpose, customerId))
      }
    }
  }
}


// ---------------------------------------------- CUSTOMER ACTION ----------------------------------------------
export const getCustomerBasedOnPurpose = (purpose, customerId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(customerId)

    customerRef.get()
    .then(doc => {
      if (doc.exists) {
        let data = doc.data()
        if (purpose === 'during input') {
          dispatch(setFormValueBasedOnToken(data))
        } else if (purpose === 'get account') {
          dispatch(setCustomerDataSuccess(data))
        }
      }
    })
    .catch(err => {
      console.log('ERROR: Get customer data during input', err)
    })
  }
}

// It it to set form value in transaction.reducers.jsx
const setFormValueBasedOnToken = (data) => {
  return {
    type: 'SET_FORM_VALUE_BUID',
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



