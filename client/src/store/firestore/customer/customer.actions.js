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
        }
      } 
    })
    .catch(err => {
      console.log('ERROR: Get customer data during input', err)
    })
  }
}

const setFormValueBasedOnToken = (data) => {
  return {
    type: 'SET_FORM_VALUE_BUID',
    payload: data
  }
}