let initialState = {
  primaryService: '',
  primaryServiceExists: true,
  secondaryServices: [],
  secondaryServicesExists: true,
}

const shopDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'CLEAR_STATE':
      return ({
        ...state,
      })
    case 'SET_PRIMARY_SERVICE_SUCCESS':
      return ({
        ...state,
        primaryService: action.payload,
      })
    case 'SET_PRIMARY_SERVICE_FAILED':
      return ({
        ...state,
        primaryServiceExists: action.payload
      })
    case 'SET_SECONDARY_SERVICES_SUCCESS':
      return ({
        ...state,
        secondaryServices: action.payload,
      })
    case 'SET_SECONDARY_SERVICES_FAILED':
      return ({
        ...state,
        secondaryServicesExists: action.payload
      })
    default:
      return state;
  }
}

export default shopDataList;