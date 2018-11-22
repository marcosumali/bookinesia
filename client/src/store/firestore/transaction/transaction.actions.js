import { setRouteLink } from '../shop/shop.actions';

// ---------------------------------------------- GENERAL ACTION ----------------------------------------------
// To clear transaction state when user go back
export const clearCartState = () => {
  return {
    type: 'CLEAR_CART_STATE',
  }
}

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


// ---------------------------------------------- SERVICES ACTION ----------------------------------------------
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


// ---------------------------------------------- SERVICES ACTION ----------------------------------------------
// To set services based on params on redux store to mitigate user behaviour in refreshing the browser
export const setServicesBasedOnParams = (params) => {
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
        console.log('ERROR: Set Store Services', err)
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
          console.log('ERROR: Get staffServices data', err)
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
    await dispatch(getCompetentStaffsData(competentStaffsId))
  }
}


// ---------------------------------------------- STAFF ACTION ----------------------------------------------
// To get selected staffs based on previous action getStaffServiceDataBasedOnParams
export const getCompetentStaffsData = (competentStaffsId) => {
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
          console.log('ERROR: Get specific staffs data', err)
        })
      return ''
    }))
    await dispatch(getCompetentStaffsDataSuccess(detailCompetentStaffs))
    // To show first staff as initial selected staffs to store
    await dispatch(setSelectedStaff(detailCompetentStaffs[0]))
    // To show first staff appointments as initial selected staffs to store
    await dispatch(getSpecificAppointments(detailCompetentStaffs[0]))
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
export const setSelectedStaff = (selectedStaff) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // To show selected staff to store each time user click staff image
    dispatch(setSelectedStaffSuccess(selectedStaff))
    // To show selected staff appointments to store each time user click staff image
    dispatch(getSpecificAppointments(selectedStaff))
  }
}

const setSelectedStaffSuccess = (data) => {
  return {
    type: 'SET_SELECTED_STAFFS',
    payload: data
  }
}


// ---------------------------------------------- APPOINMENT ACTION ----------------------------------------------
// To get appoinment data for specific service provicer
export const getSpecificAppointments = (competentStaff) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment')
    let appointmentsData = []

    await appointmentRef
    .where('staffId', '==', `${competentStaff.id}`)
    .orderBy('date', 'desc')
    .limit(7)
    .get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          let data = doc.data()
          appointmentsData.unshift(data)
        })
      } else {
        dispatch(getSpecificAppointmentsFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR: Get selected appointment staffs data', err)
    })
    dispatch(getSpecificAppointmentsSuccess(appointmentsData))
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

// To set selected staffs to store based on customer request / click
export const setAppointmentIndex = (status, appoinmentIndex) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    if (status === 'next') {
      dispatch(setAppointmentIndexSuccess(appoinmentIndex+1))
    } else if (status === 'previous') {
      dispatch(setAppointmentIndexSuccess(appoinmentIndex-1))
    }
  }
}

const setAppointmentIndexSuccess = (data) => {
  return {
    type: 'SET_APPOINTMENT_INDEX',
    payload: data
  }
}
