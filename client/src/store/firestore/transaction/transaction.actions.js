import { setRouteLink } from '../shop/shop.actions';

// ----------------------- GENERAL ACTION -----------------------
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


// ----------------------- SERVICES ACTION -----------------------
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

