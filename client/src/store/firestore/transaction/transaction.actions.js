import axios from 'axios';

import { setRouteLink } from '../shop/shop.actions';
import { validateEmail } from '../../../helpers/form';
import { setNewCookies, verifyCookies, getCookies } from '../../../helpers/auth';
import { setLoadingStatus, setAuthorizationStatus, validateCustomerExistence, getCustomerByField, getCustomerById } from '../customer/customer.actions';
import { authSignInAnonymously, authEmailValidation } from '../auth/auth.actions';

const emptyError = 'This section must be filled.'
const phoneMinError = 'Phone number is too short, min. 8 characters.'
const emailInvalidError = 'Invalid email.'

// ---------------------------------------------- GENERAL ACTION ----------------------------------------------
// To clear transaction state when user go back
export const clearCartState = () => {
  return {
    type: 'CLEAR_CART_STATE',
  }
}

// To set route link based on primary service click activities
export const setPrimaryServiceRouteLink = (params, primaryServiceCode, storeSecondaryServices) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let shopName = params.shopName
    let branchName = params.branchName

    let secondaryServicesCode = []
    storeSecondaryServices && storeSecondaryServices.map(secondaryService => {
      let splittedSecondaryService = secondaryService.split('-')
      let secondaryServiceCode = splittedSecondaryService[splittedSecondaryService.length-1]
      secondaryServicesCode.push(secondaryServiceCode)
      return ''
    })

    let serviceCodes = ''
    serviceCodes += primaryServiceCode

    secondaryServicesCode && secondaryServicesCode.map(serviceCode => {
      serviceCodes += `,${serviceCode}`
      return ''
    })
    dispatch(setRouteLink(`/book/service/${shopName}/${branchName}/${serviceCodes}`))
  }
}

// To set route link based on secondary service click activities
export const setSecondaryServiceRouteLink = (params, secondaryServicesCode, primaryServiceId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let shopName = params.shopName
    let branchName = params.branchName

    let splittedPrimaryServiceId = primaryServiceId.split('-')
    let primaryServiceCode = splittedPrimaryServiceId[splittedPrimaryServiceId.length-1]

    let serviceCodes = ''
    serviceCodes += primaryServiceCode

    // To handle service route link will be started with a number and not a ','
    // If user does not pick any primary service and only one secondary service, then code equals with first secondary service code
    // If user does not pick any primary service and more than one secondary service, then there will be to scenario
    // 1). If first secondary service code then add with only service code
    // 2). If not first, then add ',' before the service code so the route link will be 0,1 and not 0,1,
    // Else just add the ',' before service code
    if (primaryServiceCode === '' && secondaryServicesCode.length <= 1) {
      serviceCodes += secondaryServicesCode[0]
    } else if (primaryServiceCode === '' && secondaryServicesCode.length > 1) {
      secondaryServicesCode && secondaryServicesCode.map((serviceCode, index) => {
        if (index === 0)  {
          serviceCodes += `${serviceCode}`
        } else {
          serviceCodes += `,${serviceCode}`
        }
        return ''
      })
    } else {
      secondaryServicesCode && secondaryServicesCode.map(serviceCode => {
        serviceCodes += `,${serviceCode}`
        return ''
      })
    }
    dispatch(setRouteLink(`/book/service/${shopName}/${branchName}/${serviceCodes}`))   
  }
}

// To set route link based on barber and schedule click activities
export const setConfirmPageRouteLink = (params, provider, appointmentData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let shopName = params.shopName
    let branchName = params.branchName
    let serviceCodes = params.services
    let providerId = provider.id
    let splittedProviderId = providerId.split('-')
    let providerCode = splittedProviderId[splittedProviderId.length-1]
    let appointmentDate = appointmentData.date

    dispatch(setRouteLink(`/book/confirm/${shopName}/${branchName}/service/${serviceCodes}/provider/${providerCode}/date/${appointmentDate}`))
  }
}

// To handle changes from input text
// Don't handle error during changes since it will make REACT re-render new input with different classname
// Resulting in confusing user experience in inputting the form
export const handleInputChanges = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setCustomerName(value))
    } else if (inputId === 'email') {
      dispatch(setCustomerEmail(value))
    } else if (inputId === 'phone') {
      dispatch(setCustomerPhone(value))
    }
  }
}

const setCustomerName = (data) => {
  return {
    type: 'SET_CUSTOMER_NAME',
    payload: data
  }
}

const setCustomerEmail = (data) => {
  return {
    type: 'SET_CUSTOMER_EMAIL',
    payload: data
  }
}

const setCustomerPhone = (data) => {
  return {
    type: 'SET_CUSTOMER_PHONE',
    payload: data
  }
}


// ---------------------------------------------- SERVICES ACTION ----------------------------------------------
// To set primary service and service routelink based on user click/request
export const setPrimaryService = (params, service, storeSecondaryServices) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let serviceId = service.id
    dispatch(setPrimaryServiceSuccess(serviceId))

    let splittedServiceId = serviceId.split('-')
    let serviceCode = splittedServiceId[splittedServiceId.length-1]
    dispatch(setPrimaryServiceRouteLink(params, serviceCode, storeSecondaryServices))
  }
}

const setPrimaryServiceSuccess = (data) => {
  return {
    type: 'SET_PRIMARY_SERVICE_SUCCESS',
    payload: data
  }
}

// To set secondary service and service routelink based on user click/request
export const setSecondaryServices = (params, services, storePrimaryService) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let newServices = []
    services && services.map((service) => {
      newServices.push(service)
      return ''
    })
    dispatch(setSecondaryServicesSuccess(newServices))

    let secondaryServicesCode = []
    services && services.map(service => {
      let splittedService = service.split('-')
      let secondaryServiceCode = splittedService[splittedService.length-1]
      secondaryServicesCode.push(secondaryServiceCode)
      return ''
    })
    dispatch(setSecondaryServiceRouteLink(params, secondaryServicesCode, storePrimaryService))
  }
}

const setSecondaryServicesSuccess = (data) => {
  return {
    type: 'SET_SECONDARY_SERVICES_SUCCESS',
    payload: data
  }
}

// To set services Id based on params on redux store to mitigate user behaviour in refreshing the browser and go back to service page
export const setServicesIdBasedOnParams = (params) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let shopName = params.shopName
    let branchName = params.branchName
    let selectedServicesCode = params.services.split(',')

    let newPrimaryService = ''
    let newSecondaryServices = []

    await Promise.all(selectedServicesCode && selectedServicesCode.map(async serviceCode => {
      let serviceRef = firestore.collection('service').doc(`${shopName}-${branchName}-${serviceCode}`)
      
      await serviceRef.get()
      .then(doc => {
        if (doc.exists) {
          let data = doc.data()
          let id = doc.id
          if (data.type === 'primary') {
            newPrimaryService = id
          } else if (data.type === 'secondary') {
            newSecondaryServices.push(id)
          }
        } else {
          dispatch(setOneServiceFailed(false))
        }
      })
      .catch(err => {
        console.log('ERROR: get store services', err)
      })
      return ''
    }))
    await dispatch(setPrimaryServiceSuccessBasedOnParams(newPrimaryService))
    await dispatch(setSecondaryServiceSuccessBasedOnParams(newSecondaryServices))
  }
}

const setPrimaryServiceSuccessBasedOnParams = (data) => {
  return {
    type: 'SET_PRIMARY_SERVICE_PARAM_SUCCESS',
    payload: data
  }
}

const setSecondaryServiceSuccessBasedOnParams = (data) => {
  return {
    type: 'SET_SECONDARY_SERVICE_PARAM_SUCCESS',
    payload: data
  }
}

const setOneServiceFailed = (data) => {
  return {
    type: 'SET_ONE_OF_SERVICE_PARAM_FAILED',
    payload: data
  }
}


// To get services data from firestore based on params
export const getServicesBasedOnParams = (params) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let shopName = params.shopName
    let branchName = params.branchName
    let selectedServicesCode = params.services.split(',')

    let selectedServices = []
    await Promise.all(selectedServicesCode && selectedServicesCode.map(async serviceCode => {
      let serviceRef = firestore.collection('service').doc(`${shopName}-${branchName}-${serviceCode}`)
      
      await serviceRef.get()
      .then(doc => {
        if (doc.exists) {
          let data = doc.data()
          let id = doc.id
          let combineData = {
            ...data,
            id
          }
          selectedServices.push(combineData)
        } else {
          dispatch(getServicesBasedOnParamsFailed(false))
        }
      })
      .catch(err => {
        console.log('ERROR: get selected services', err)
      })
      return ''
    }))
    await dispatch(getServicesBasedOnParamsSuccess(selectedServices))
  }
}

const getServicesBasedOnParamsSuccess = (data) => {
  return {
    type: 'GET_SELETED_SERVICES_PARAM_SUCCESS',
    payload: data
  }
}

const getServicesBasedOnParamsFailed = (data) => {
  return {
    type: 'GET_SELETED_SERVICES_PARAM_FAILED',
    payload: data
  }
}


// ---------------------------------------------- STAFF SERVICES ACTION ----------------------------------------------
// To set staff services and competent staffs Id based on params on redux store to mitigate user behaviour in refreshing the browser
export const getStaffServiceDataBasedOnParams = (params) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()

    let shopName = params.shopName
    let branchName = params.branchName
    let servicesCodeString = params.services
    let servicesCode = servicesCodeString.split(',')

    // Process to get filtered staffServices based on customer's request
    let filteredStaffServices = []
    await Promise.all(servicesCode && servicesCode.map(async serviceCode => {      
      let staffServiceRef = firestore.collection('staffService')

      await staffServiceRef.where('serviceId', '==', `${shopName}-${branchName}-${serviceCode}`).get()
        .then(snapshot => {
          if (snapshot.empty === false) {
            snapshot.forEach(doc => {
              let data = doc.data()
              filteredStaffServices.push(data)
            })
          } else {
            dispatch(getCompetentStaffsDataFailed(false))
          }
        })
        .catch(err => {
          console.log('ERROR: get staffServices data', err)
        })
      return ''
    }))

    // Process to obtain unique staffs and services from filteredStaffServices
    let uniqueStaffs = [...new Set(filteredStaffServices.map(staffService => staffService.staffId))]
    let uniqueServices = [...new Set(filteredStaffServices.map(staffService => staffService.serviceId))]
    
    // Process to obtain competent staffs data based on customer's selected services
    let competentStaffsId = []    
    uniqueStaffs && uniqueStaffs.map((staffId) => {
      let score = 0
      filteredStaffServices && filteredStaffServices.map((staffService) => {
        if (staffService.staffId === staffId) {
          score ++
          // console.log(score, staffService.staffId, '---', staffId)
        }
        return ''
      })
      if(score >= uniqueServices.length) {
        competentStaffsId.push(staffId)
      }   
      return ''
    })
    await dispatch(getCompetentStaffsData(competentStaffsId, params))
  }
}


// ---------------------------------------------- STAFF ACTION ----------------------------------------------
// To get selected staffs based on previous action getStaffServiceDataBasedOnParams
export const getCompetentStaffsData = (competentStaffsId, params) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()

    let detailCompetentStaffs = []
    await Promise.all(competentStaffsId && competentStaffsId.map(async competentStaffId => {
      let staffRef = firestore.collection('staff').doc(competentStaffId)

      await staffRef.get()
        .then(doc => {
          if (doc.exists) {
            let data = doc.data()
            let id = doc.id
            let combineData = {
              ...data,
              id
            }
            detailCompetentStaffs.push(combineData)
          } else {
            dispatch(getCompetentStaffsDataFailed(false))
          }
        })
        .catch(err => {
          console.log('ERROR: get specific staffs data', err)
        })
      return ''
    }))
    await dispatch(getCompetentStaffsDataSuccess(detailCompetentStaffs))
    // To set first staff as initial selected staffs to store
    await dispatch(setSelectedStaff(detailCompetentStaffs[0], params))
    // To set first staff appointments as initial selected staffs to store
    await dispatch(getSpecificAppointments(detailCompetentStaffs[0], params))
  }
}

const getCompetentStaffsDataSuccess = (data) => {
  return {
    type: 'GET_COMPETENT_STAFFS_DATA_SUCCESS',
    payload: data
  }
}

const getCompetentStaffsDataFailed = (data) => {
  return {
    type: 'GET_COMPETENT_STAFFS_DATA_FAILED',
    payload: data
  }
}

// To set selected staffs to store based on customer request / click 
// and each time website render action getCompetentStaffsData to set first selected staff during willmount
export const setSelectedStaff = (selectedStaff, params) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // To show selected staff to store each time user click staff image
    dispatch(setSelectedStaffSuccess(selectedStaff))
    // To show selected staff appointments to store each time user click staff image
    dispatch(getSpecificAppointments(selectedStaff, params))
  }
}

const setSelectedStaffSuccess = (data) => {
  return {
    type: 'SET_SELECTED_STAFFS',
    payload: data
  }
}


// To get staff data from firestore based on params
export const getStaffBasedOnParams = (params) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let shopName = params.shopName
    let branchName = params.branchName
    let staffCode = params.provider

    let staffRef = firestore.collection('staff').doc(`${shopName}-${branchName}-${staffCode}`)
    
    staffRef.get()
    .then(doc => {
      if (doc.exists) {
        let data = doc.data()
        let id = doc.id
        let combineData = {
          ...data,
          id
        }
        dispatch(getStaffBasedOnParamsSuccess(combineData))
      } else {
        dispatch(getStaffBasedOnParamsFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR: get selected staffs', err)
    })
  }
}

const getStaffBasedOnParamsSuccess = (data) => {
  return {
    type: 'GET_SELETED_STAFF_PARAM_SUCCESS',
    payload: data
  }
}

const getStaffBasedOnParamsFailed = (data) => {
  return {
    type: 'GET_SELETED_STAFF_PARAM_FAILED',
    payload: data
  }
}


// ---------------------------------------------- APPOINTMENT ACTION ----------------------------------------------
// To get appoinment data for specific service provicer
export const getSpecificAppointments = (competentStaff, params) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment')
    let appointmentsData = []

    appointmentRef
    .where('staffId', '==', `${competentStaff.id}`)
    .orderBy('date', 'desc')
    .limit(7)
    // Query snapshot to handle realtime update data from firestore
    .onSnapshot(function(querySnapshot) {
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          let combineData = {
            ...data,
            id
          }
          appointmentsData.unshift(combineData)
        })
        dispatch(getSpecificAppointmentsSuccess(appointmentsData))
        dispatch(setSelectedAppointment(appointmentsData, 0))
        dispatch(setConfirmPageRouteLink(params, competentStaff, appointmentsData[0]))
      } else {
        dispatch(getSpecificAppointmentsFailed(false))
      }
    })
  }
}

const getSpecificAppointmentsSuccess = (data) => {
  return {
    type: 'GET_SPECIFIC_APPOINTMENTS_DATA_SUCCESS',
    payload: data
  }
}

const getSpecificAppointmentsFailed = (data) => {
  return {
    type: 'GET_SPECIFIC_APPOINTMENTS_DATA_FAILED',
    payload: data
  }
}

// To set appointment index to store and to show appointment based on appoinment index and user's click request
export const setAppointmentIndex = (status, appointmentsData, appoinmentIndex, params, selectedStaff) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    if (status === 'next') {
      dispatch(setAppointmentIndexSuccess(appoinmentIndex+1))
      dispatch(setSelectedAppointment(appointmentsData, appoinmentIndex+1))
      dispatch(setConfirmPageRouteLink(params, selectedStaff, appointmentsData[appoinmentIndex+1]))
    } else if (status === 'previous') {
      dispatch(setAppointmentIndexSuccess(appoinmentIndex-1))
      dispatch(setSelectedAppointment(appointmentsData, appoinmentIndex-1))
      dispatch(setConfirmPageRouteLink(params, selectedStaff, appointmentsData[appoinmentIndex-1]))
    }
  }
}

const setAppointmentIndexSuccess = (data) => {
  return {
    type: 'SET_APPOINTMENT_INDEX',
    payload: data
  }
}

// To set appointment data to store based on user's click request from previous action setAppointmentIndex
export const setSelectedAppointment = (appointmentsData, newAppoinmentIndex) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setSelectedAppointmentSuccess(appointmentsData[newAppoinmentIndex]))
  }
}

const setSelectedAppointmentSuccess = (data) => {
  return {
    type: 'SET_SELECTED_APPOINTMENT',
    payload: data
  }
}


// To get appointment data from firestore based on params
export const getAppointmentBasedOnParams = (params) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let shopName = params.shopName
    let branchName = params.branchName
    let staffCode = params.provider
    let staffId = `${shopName}-${branchName}-${staffCode}`
    let appointmentDate = params.date

    let appointmentRef = firestore.collection('appointment')
    appointmentRef
    .where('staffId', '==', staffId)
    .where('date', '==', appointmentDate)
    .onSnapshot(function(querySnapshot) {
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          let combineData = {
            ...data,
            id
          }
          dispatch(getAppointmentBasedOnParamsSuccess(combineData))
        })
      } else {
        dispatch(getAppointmentBasedOnParamsFailed(false))
      }
    })
  }
}

const getAppointmentBasedOnParamsSuccess = (data) => {
  return {
    type: 'GET_SELETED_APPOINTMENT_PARAM_SUCCESS',
    payload: data
  }
}

const getAppointmentBasedOnParamsFailed = (data) => {
  return {
    type: 'GET_SELETED_APPOINTMENT_PARAM_FAILED',
    payload: data
  }
}

export const updateAppointmentCurrentTransaction = (appointmentData) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let appoinmentId = appointmentData.id
    let currentTransaction = Number(appointmentData.currentTransaction)
    let updatedCurrentTransaction = currentTransaction + 1
    let newUpdatedDate = new Date(Date.now())

    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment').doc(appoinmentId)

    appointmentRef.update({
      currentTransaction: updatedCurrentTransaction.toString(),
      updatedDate: newUpdatedDate
    })
    .then(() => {
      // console.log('Document successfully updated !')
    })
    .catch(err => {
      console.log('ERROR: update appointment current transaction', err)
    })

  }
}


// ---------------------------------------------- CUSTOMER ACTION ----------------------------------------------
// To validate customer's input form of selecting service
export const customerServiceInputValidation = (props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let primaryService = props.primaryService
    let secondaryServices = props.secondaryServices
    let routeLink = props.routeLink
    let history = props.history

    if (primaryService === '' && secondaryServices.length <= 0) {
      dispatch(setNoServiceSelectedError(true))
    } else {
      history.push(routeLink)
    }
  }
}

// To set error messages on service page if customer not yet select any service
const setNoServiceSelectedError = (data) => {
  return {
    type: 'SET_ERROR_NO_SERVICE_SELECTED',
    payload: data
  }
}


// To validate customer's input form of inputting customer information for booking new transaction
export const customerInputValidation = (props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let name = props.customerName
    let phone = props.customerPhone
    let email = props.customerEmail
    let cookies = props.cookies

    // To set loading status to true
    dispatch(setLoadingStatus(true))

    // Input is ERROR
    if (name.length <= 0) {
      dispatch(setNameInputError(emptyError))
    } 
    
    if (phone.length <= 0) {
      dispatch(setPhoneInputError(emptyError))
    } 
    
    if (phone.length > 0 && phone.length < 8) {
      dispatch(setPhoneInputError(phoneMinError))
    }

    if (email.length <= 0) {
      dispatch(setEmailInputError(emptyError))
    } 
    
    if (email.length > 0 && validateEmail(email) === false) {
      dispatch(setEmailInputError(emailInvalidError))
    }

    // Input is OK
    if (name.length > 0) {
      dispatch(setNameInputOK(false))
    } 
    
    if (phone.length >= 8) {
      dispatch(setPhoneInputOK(false))
    } 
    
    if (email.length > 0 && validateEmail(email)) {
      dispatch(setEmailInputOK(false))
    }
    
    if (name.length > 0 && phone.length >= 8 && email.length > 0 && validateEmail(email) === true) {
      dispatch(setHasBookSuccess(true))
      let BUID = getCookies(cookies)
      if (BUID) {
        let customerData = verifyCookies(BUID)
        let customerId = customerData.id
        dispatch(getCustomerByIdAndCreateNewTransaction(customerId, props))
      } else {
        let authUserExistence = await dispatch(authEmailValidation(email))
        let userExistence = await dispatch(validateCustomerExistence('phone', phone))
        // console.log('auth exist', authUserExistence, userExistence)
        if (authUserExistence && userExistence) {
          dispatch(getCustomerByPhoneAndCreateNewTransaction(null, props))
        } else if (authUserExistence && userExistence === false ) {
          let authResponseByEmail = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/getUserBasedOnEmail', { email })
          if (authResponseByEmail.status === 200) {
            let authUser = authResponseByEmail.data.user
            let id = authUser.id
            let registeredUser = await dispatch(getCustomerById(id))
            dispatch(authUserCreateNewTransaction(authUser, registeredUser, props))
          }
        } else if (authUserExistence === false && userExistence) {
          let registeredUser = await dispatch(getCustomerByField('phone', phone))
          let uid = registeredUser.id

          let authResponseByUID = await  axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/getUserBasedOnUid', { uid })
          if (authResponseByUID.status === 200) {
            let authUser = authResponseByUID.data.user
            dispatch(authUserCreateNewTransaction(authUser, registeredUser, props))
          }
        } else if (authUserExistence === false && userExistence === false) {
          dispatch(authSignInAnonymously(props))
        }
      }
    } else {
      dispatch(setLoadingStatus(false))
    }
  }
}

// To set book status to true - limit customer to only able to book once each render
const setHasBookSuccess = (data) => {
  return {
    type: 'SET_BOOK_STATUS_SUCCESS',
    payload: data
  }
}

// To handle changes from input text if error
const setNameInputError = (data) => {
  return {
    type: 'SET_CUSTOMER_NAME_ERROR',
    payload: data
  }
}

const setPhoneInputError = (data) => {
  return {
    type: 'SET_CUSTOMER_PHONE_ERROR',
    payload: data
  }
}

const setEmailInputError = (data) => {
  return {
    type: 'SET_CUSTOMER_EMAIL_ERROR',
    payload: data
  }
}

// To handle changes from input text if OK
const setNameInputOK = (data) => {
  return {
    type: 'SET_CUSTOMER_NAME_OK',
    payload: data
  }
}

const setPhoneInputOK = (data) => {
  return {
    type: 'SET_CUSTOMER_PHONE_OK',
    payload: data
  }
}

const setEmailInputOK = (data) => {
  return {
    type: 'SET_CUSTOMER_EMAIL_OK',
    payload: data
  }
}

// To check customer existence using input from phone form, then save new cookies, and create new transaction
// OR create new customer and create new transaction
export const getCustomerByPhoneAndCreateNewTransaction = (uid, props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let customerEmail = props.customerEmail
    let customerPhone = props.customerPhone
    let cookies = props.cookies

    let firestore = getFirestore()
    let customerRef = firestore.collection('customer')

    customerRef
    .where('phone', '==', customerPhone)
    .get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          let id = doc.id
          let { name, phone, picture, registeredStatus } = doc.data()
          let customerData = {
            id, name, phone, email: customerEmail, picture, registeredStatus
          }
          setNewCookies(cookies, customerData)
          dispatch(createNewTransaction(id, props))
        })
      } else {
        dispatch(createNewCustomerAndCreateNewTransaction(uid, props))
      }
    })
    .catch(err => {
      console.log('ERROR: get customer by phone and create new transaction', err)
    })
  }
}

export const authUserCreateNewTransaction = (authUser, fbUser, props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let cookies = props.cookies
    let { email } = authUser
    let { id, name, phone, picture, registeredStatus } = fbUser
    let customerData = {
      id, name, phone, email, picture, registeredStatus
    }
    setNewCookies(cookies, customerData)
    dispatch(createNewTransaction(id, props))
  }
}

// To check customer existence using decoded ID from cookies and create new transaction
// OR create new customer, save new cookies and create new transaction
export const getCustomerByIdAndCreateNewTransaction = (customerId, props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(customerId)

    customerRef.get()
    .then(doc => {
      if (doc.exists) {
        let id = doc.id
        dispatch(createNewTransaction(id, props))
      } else {
        dispatch(createNewCustomerAndCreateNewTransaction(props))
      }
    })
    .catch(err => {
      console.log('ERROR: get customer by Id and create new transaction', err)
    })
  }
}

// To create new customer with registered status false they haven't registered and then create new transaction
export const createNewCustomerAndCreateNewTransaction = (uid, props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let cookies = props.cookies
    let name = props.customerName.toLowerCase()
    let phone = props.customerPhone
    let email = props.customerEmail
    let picture = ''
    let registeredStatus = false

    let newCustomer = {
      name,
      phone,
      picture,
      registeredStatus
    }

    let firestore = getFirestore()
    let customerRef = firestore.collection('customer').doc(uid)

    customerRef.set(newCustomer)
    .then(() => {
      let customerData = {
        id: uid, name, phone, email, picture, registeredStatus
      }
      setNewCookies(cookies, customerData)
      dispatch(createNewTransaction(uid, props))
    })
    .catch(err => {
      console.log('ERROR: Get and create new customer', err)
    })

  }
}


// ---------------------------------------------- TRANSACTION ACTION ----------------------------------------------
export const createNewTransaction = (customerId, props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let params = props.params
    let shopId = params.shopName
    let branchId = `${shopId}-${params.branchName}`
    let service = props.selectedServices
    let staff = props.selectedStaff
    let appointment = props.selectedAppointment
    let appointmentId = appointment.id
    let name = props.customerName.toLowerCase()
    let phone = props.customerPhone
    let email = props.customerEmail
    let queueNo = String(Number(appointment.currentTransaction) + 1)
    let startDate = ''
    let endDate = ''
    let status = 'booking confirmed'
    let createdDate = new Date(Date.now())
    let updatedDate = new Date(Date.now())
    let createdBy = {
      type: 'customer',
      id: customerId
    }
    let updatedBy = {
      type: 'customer',
      id: customerId
    }
    let window = props.window
    
    let newTransaction = {
      shopId,
      branchId,
      service,
      staff,
      appointmentId,
      customerId,
      name,
      phone,
      email,
      queueNo,
      startDate,
      endDate,
      status,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy
    }

    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')

    // To handle no transaction is set more than max daily queue
    if (Number(appointment.currentTransaction) < Number(appointment.maxQueue)) {
      transactionRef
      .add(newTransaction)
      .then(ref => {
        let refId = ref.id
        dispatch(updateAppointmentCurrentTransaction(appointment))
        window.location.assign(`/book/success/${refId}`)
      })
      .catch(err => {
        console.log('ERROR: create new transaction', err)
      })
    } 

  }
}

export const getTransaction = (transactionId, customerId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let transaction = firestore.collection('transaction').doc(transactionId)

    transaction.get()
    .then(doc => {
      if (doc.exists) {
        let data = doc.data()
        // To handle authorization
        if (customerId === data.customerId) {
          dispatch(setTransactionSuccess(data))
        } else {
          dispatch(setAuthorizationStatus(false))
        }
      } else {
        dispatch(setAuthorizationStatus(false))
      }
    })
    .catch(err => {
      console.log('ERROR: Get transaction', err)
    })
  }
}

const setTransactionSuccess = (data) => {
  return {
    type: 'SET_TRANSACTION_SUCCESS',
    payload: data
  }
}





