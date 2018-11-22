let initialState = {
  primaryService: '',
  primaryServiceExists: true,
  secondaryServices: [],
  secondaryServicesExists: true,
  selectedServicesExists: true,
  competentStaffs: [],
  competentStaffsExists: true,
  competentStaffsLoading: true,
  selectedStaffs: '',
  appointments: [],
  appointmentsExists: true,
  appointmentsLoading: true,
  appointmentIndex: 0,
}

const shopDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'CLEAR_SHOP_STATE':
      return ({
        ...state,
        competentStaffs: [],
        competentStaffsExists: true,
        competentStaffsLoading: true,
        appointments: [],
        appointmentsExists: true,
        appointmentsLoading: true,
        selectedAppoinment : '',
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
    case 'SET_PRIMARY_SERVICE_PARAM_SUCCESS':
      return ({
        ...state,
        primaryService: action.payload,
      })
    case 'SET_SECONDARY_SERVICE_PARAM_SUCCESS':
      return ({
        ...state,
        secondaryServices: action.payload,
      })
    case 'SET_ONE_OF_SERVICE_PARAM_FAILED':
      return ({
        ...state,
        selectedServicesExists: action.payload,
      })
    case 'GET_COMPETENT_STAFFS_DATA_SUCCESS':
      return ({
        ...state,
        competentStaffs: action.payload,
        competentStaffsLoading: false,
      })
    case 'GET_COMPETENT_STAFFS_DATA_FAILED':
      return ({
        ...state,
        competentStaffsExists: action.payload,
      })
    case 'SET_SELECTED_STAFFS':
      return ({
        ...state,
        selectedStaffs: action.payload,
        appointmentIndex: 0,
      })
    case 'GET_SPECIFIC_APPOINTMENTS_DATA_SUCCESS':
      return ({
        ...state,
        appointments: action.payload,
        appointmentsLoading: false,
      })
    case 'GET_SPECIFIC_APPOINTMENTS_DATA_FAILED':
      return ({
        ...state,
        appointmentsExists: action.payload,
      })
    case 'SET_APPOINTMENT_INDEX':
      return ({
        ...state,
        appointmentIndex: action.payload,
      })
    default:
      return state;
  }
}

export default shopDataList;