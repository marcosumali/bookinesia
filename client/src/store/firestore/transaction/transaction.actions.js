import { setRouteLink } from '../shop/shop.actions';
import { validateEmail, validatePhone, formatPhone } from '../../../helpers/form';
import { verifyCookies, getCookies } from '../../../helpers/auth';
import { 
  setLoadingStatus, 
  setAuthorizationStatus, 
} from '../customer/customer.actions';
import { 
  authEmailValidation, 
  authUserValidation,
  authCreateUser,
  authSignInTransaction,
} from '../auth/auth.actions';
import { 
  emptyError, 
  emailInvalidError,
  phoneInvalidError, 
  passwordMinError, 
  incorrectPasswordError, 
  tooManyRequestError 
} from '../customer/customer.actions';
import {
  setCalendarDate,
} from '../../dashboard/dasboard.actions';

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
    } else if (inputId === 'password') {
      dispatch(setCustomerPassword(value))
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

const setCustomerPassword = (data) => {
  return {
    type: 'SET_CUSTOMER_PASSWORD',
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
          if (data.disableStatus === false) {
            selectedServices.push(combineData)
          }
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

      await staffServiceRef
        .where('serviceId', '==', `${shopName}-${branchName}-${serviceCode}`)
        .where('disableStatus', '==', false)
        .get()
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

      await staffRef
        .get()
        .then(doc => {
          if (doc.exists) {
            let data = doc.data()
            let id = doc.id
            let combineData = {
              ...data,
              id
            }
            if (data.disableStatus === false) {
              detailCompetentStaffs.push(combineData)
            }
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
    await dispatch(setSelectedStaff(detailCompetentStaffs[0]))
    // To set first staff appointments as initial selected staffs to store
    let inputDate = new Date(Date.now())
    let year = inputDate.getFullYear()
    let month = inputDate.getMonth() + 1
    let date = inputDate.getDate()
    let acceptedDate = `${year}-${month}-${date}`
    await dispatch(setCalendarDate(acceptedDate))
    await dispatch(getSpecificAppointments(detailCompetentStaffs[0], params, acceptedDate))
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
export const setSelectedStaff = (data) => {
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
        if (data.disableStatus === false) {
          dispatch(getStaffBasedOnParamsSuccess(combineData))
        } else {
          dispatch(getStaffBasedOnParamsFailed(false))
        }
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
export const getSpecificAppointments = (competentStaff, params, date) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment')

    appointmentRef
    .where('staffId', '==', `${competentStaff.id}`)
    .where('date', '==', date)
    .where('disableStatus', '==', false)
    .onSnapshot(function(querySnapshot) {
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          let combineData = {
            ...data,
            id
          }
          dispatch(getSpecificAppointmentsSuccess(combineData))
          dispatch(setSelectedAppointmentSuccess(combineData))
          dispatch(setConfirmPageRouteLink(params, competentStaff, combineData))
        })
      } else {
        let data = {
          message: 'no-appointment'
        }
        dispatch(getSpecificAppointmentsSuccess(data))
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

// To set appointment index to store and to show appointment based on appoinment index and user's click request
export const setAppointmentIndex = (status, appointmentsData, selectedDate, params, selectedStaff) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let inputDate = new Date(selectedDate)
    if (status === 'next') {
      let tomorrowDate = new Date(inputDate.setDate(inputDate.getDate() + 1))
      let year = tomorrowDate.getFullYear()
      let month = tomorrowDate.getMonth() + 1
      let date = tomorrowDate.getDate()  
      let acceptedDate = `${year}-${month}-${date}`
      dispatch(setAppointmentLoading(true))
      dispatch(setCalendarDate(acceptedDate))
      dispatch(getSpecificAppointments(selectedStaff, params, acceptedDate))
    } else if (status === 'previous') {
      let yesterdayDate = new Date(inputDate.setDate(inputDate.getDate() - 1))
      let year = yesterdayDate.getFullYear()
      let month = yesterdayDate.getMonth() + 1
      let date = yesterdayDate.getDate()  
      let acceptedDate = `${year}-${month}-${date}`
      // Appointment loading to false is embedded in reducers of getSpecificAppointment data success
      dispatch(setAppointmentLoading(true))
      dispatch(setCalendarDate(acceptedDate))
      dispatch(getSpecificAppointments(selectedStaff, params, acceptedDate))
    }
  }
}


export const setAppointmentLoading = (data) => {
  return {
    type: 'SET_APPOINTMENT_LOADING',
    payload: data
  }
}

// To set appointment data to store based on user's click request from previous action setAppointmentIndex
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
    let name = props.customerName.toLowerCase()
    let phone = props.customerPhone
    let email = props.customerEmail
    let password = props.customerPassword
    let cookies = props.cookies
    let showPasswordInputStatus = props.showPasswordInputStatus

    // Input is ERROR
    if (name.length <= 0) {
      dispatch(setNameInputError(emptyError))
    } 
    
    if (phone.length <= 0) {
      dispatch(setPhoneInputError(emptyError))
    } 
    
    let phoneResult = validatePhone(phone)
    if (phone.length > 0 && phoneResult.status === false) {
      dispatch(setPhoneInputError(phoneInvalidError))
    }

    if (email.length <= 0) {
      dispatch(setEmailInputError(emptyError))
    } 
    
    if (email.length > 0 && validateEmail(email) === false) {
      dispatch(setEmailInputError(emailInvalidError))
    }

    // Input is OK
    if (name.length > 0) {
      dispatch(setNameInputError(false))
    } 
    
    if (phoneResult.status === true) {
      dispatch(setPhoneInputError(false))
    } 
    
    if (email.length > 0 && validateEmail(email)) {
      dispatch(setEmailInputError(false))
    }
    
    if (name.length > 0 && phoneResult.status === true && email.length > 0 && validateEmail(email) === true) {
      dispatch(setLoadingStatus(true))

      let BUID = getCookies(cookies)
      if (BUID) {
        let customerData = verifyCookies(BUID)
        let customerId = customerData.id
        dispatch(createNewTransaction(customerId, props))
      } else {
        let customerExistenceBasedOnEmail = await dispatch(authEmailValidation(email))
        // console.log('+++', customerExistenceBasedOnEmail)
        if (customerExistenceBasedOnEmail === true) {
          if (showPasswordInputStatus.message === false) {
            let newStatus = {
              message: true,
              user: 'registeredUser',
            }
            dispatch(setShowPasswordInputstatus(newStatus))
            dispatch(setLoadingStatus(false))
          } else {
            if (password.length <= 0) {
              dispatch(setPasswordInputError(emptyError))
              dispatch(setLoadingStatus(false))
            } 
            if (password.length > 0) {
              dispatch(setPasswordInputError(false))

              let authUser = await dispatch(authUserValidation(email, password))
              if (authUser.id) {
                // Next will sign in user, save new cookies and create new Transaction
                dispatch(authSignInTransaction(props))
              } else if (authUser === false) {
                dispatch(setPasswordInputError(incorrectPasswordError))
                dispatch(setLoadingStatus(false))
              } else if (authUser === 'too-many-requests') {
                dispatch(setPasswordInputError(tooManyRequestError))
                dispatch(setLoadingStatus(false))
              }
            } 
          }
        } else if (customerExistenceBasedOnEmail === false) {
          if (showPasswordInputStatus.message === false) {
            let newStatus = {
              message: true,
              user: 'newUser',
            }
            dispatch(setShowPasswordInputstatus(newStatus))
            dispatch(setLoadingStatus(false))
          } else if (showPasswordInputStatus.message === true) {
            if (password.length <= 0) {
              dispatch(setPasswordInputError(emptyError))
              dispatch(setLoadingStatus(false))
            }
            
            if (password.length > 0 && password.length < 8) {
              dispatch(setPasswordInputError(passwordMinError))
              dispatch(setLoadingStatus(false))
            }

            if (password.length >= 8) {
              dispatch(setPasswordInputError(false))
              // Next will create new user, save cookies and create new transaction
              dispatch(authCreateUser(props, phoneResult.phone, 'continue'))
            }
          }
        } else if (customerExistenceBasedOnEmail === 'too-many-requests') {
          dispatch(setPasswordInputError(tooManyRequestError))
          dispatch(setLoadingStatus(false))
        }
      }
    }
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

export const setPasswordInputError = (data) => {
  return {
    type: 'SET_CUSTOMER_PASSWORD_ERROR',
    payload: data
  }
}

const setShowPasswordInputstatus = (data) => {
  return {
    type: 'SET_SHOW_PASSWORD_INPUT_STATUS',
    payload: data
  }
}


// ---------------------------------------------- TRANSACTION ACTION ----------------------------------------------
export const createNewTransaction = (customerId, props) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let shop = props.shop
    let branch = props.branch
    let service = props.selectedServices
    let staff = props.selectedStaff
    let appointment = props.selectedAppointment
    let name = props.customerName.toLowerCase()
    let phone = formatPhone(props.customerPhone, 'NATIONAL')
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
    let paymentMethod = ''
    let paymentInformation = ''
    let window = props.window
    
    let newTransaction = {
      shop,
      branch,
      service,
      staff,
      appointment,
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
      updatedBy,
      paymentMethod,
      paymentInformation,
    }

    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')

    // To handle no transaction is set more than max daily queue
    if (Number(appointment.currentTransaction) < Number(appointment.maxQueue)) {
      transactionRef.add(newTransaction)
      .then(async ref => {
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
