// ----------------------- SERVICES ACTION -----------------------
export const setPrimaryService = (service) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setPrimaryServiceSuccess(service.id))
  }
}

const setPrimaryServiceSuccess = (data) => {
  return {
    type: 'SET_PRIMARY_SERVICE_SUCCESS',
    payload: data
  }
}

export const setSecondaryServices = (services) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let newServices = []
    services && services.map((service) => {
      newServices.push(service)
      return ''
    })
    dispatch(setSecondaryServicesSuccess(newServices))
  }
}

const setSecondaryServicesSuccess = (data) => {
  return {
    type: 'SET_SECONDARY_SERVICES_SUCCESS',
    payload: data
  }
}

