let initialState = {
  primaryService: '',
  primaryServiceExists: true,
  secondaryServices: [],
  secondaryServicesExists: true,
  selectedServiceParamExists: true,
  competentStaffs: [],
  competentStaffsExists: true,
  competentStaffsLoading: true,
  selectedStaff: '',
  selectedStaffLoading: true,
  selectedStaffExists: true,
  appointments: [],
  appointmentsExists: true,
  appointmentsLoading: true,
  appointmentIndex: 0,
  selectedAppointment: '',
  selectedAppointmentLoading: true,
  selectedAppointmentExists: true,
  selectedServices: [],
  selectedServicesLoading: true,
  selectedServicesExists: true,
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerPassword: '',
  customerNameError: false,
  customerEmailError: false,
  customerPhoneError: false,
  customerPasswordError: false,
  transaction: '',
  noServiceSelectedStatus: false,
  showPasswordInputStatus: false,
}

const transactionDataList = (state = { ...initialState }, action) => {
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
      })
    case 'SET_PRIMARY_SERVICE_SUCCESS':
      return ({
        ...state,
        primaryService: action.payload,
        noServiceSelectedStatus: false
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
        noServiceSelectedStatus: false
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
        selectedServiceParamExists: action.payload,
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
        selectedStaff: action.payload,
        appointmentsLoading: true,
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
    case 'SET_SELECTED_APPOINTMENT':
      return ({
        ...state,
        selectedAppointment: action.payload,
      })
    case 'GET_SELETED_SERVICES_PARAM_SUCCESS':
      return ({
        ...state,
        selectedServices: action.payload,
        selectedServicesLoading: false,
      })
    case 'GET_SELETED_SERVICES_PARAM_FAILED':
      return ({
        ...state,
        selectedServicesExists: action.payload
      })
    case 'GET_SELETED_STAFF_PARAM_SUCCESS':
      return ({
        ...state,
        selectedStaff: action.payload,
        selectedStaffLoading: false,
      })
    case 'GET_SELETED_STAFF_PARAM_FAILED':
      return ({
        ...state,
        selectedStaffExists: action.payload
      })
    case 'GET_SELETED_APPOINTMENT_PARAM_SUCCESS':
      return ({
        ...state,
        selectedAppointment: action.payload,
        selectedAppointmentLoading: false,
      })
    case 'GET_SELETED_APPOINTMENT_PARAM_FAILED':
      return ({
        ...state,
        selectedAppointmentExists: action.payload
      })
    case 'SET_CUSTOMER_NAME':
      return ({
        ...state,
        customerName: action.payload
      })
    case 'SET_CUSTOMER_EMAIL':
      return ({
        ...state,
        customerEmail: action.payload
      })
    case 'SET_CUSTOMER_PHONE':
      return ({
        ...state,
        customerPhone: action.payload
      })
    case 'SET_CUSTOMER_PASSWORD':
      return ({
        ...state,
        customerPassword: action.payload
      })
    case 'SET_CUSTOMER_NAME_ERROR':
      return ({
        ...state,
        customerNameError: action.payload
      })
    case 'SET_CUSTOMER_EMAIL_ERROR':
      return ({
        ...state,
        customerEmailError: action.payload
      })
    case 'SET_CUSTOMER_PHONE_ERROR':
      return ({
        ...state,
        customerPhoneError: action.payload
      })
    case 'SET_CUSTOMER_PASSWORD_ERROR':
      return ({
        ...state,
        customerPasswordError: action.payload
      })
    case 'SET_CUSTOMER_NAME_OK':
      return ({
        ...state,
        customerNameError: action.payload
      })
    case 'SET_CUSTOMER_EMAIL_OK':
      return ({
        ...state,
        customerEmailError: action.payload
      })
    case 'SET_CUSTOMER_PHONE_OK':
      return ({
        ...state,
        customerPhoneError: action.payload
      })
    case 'SET_CUSTOMER_PASSWORD_OK':
      return ({
        ...state,
        customerPasswordError: action.payload
      })
    case 'SET_FORM_VALUE_BUID':
      return ({
        ...state,
        customerName: action.payload.name,
        customerEmail: action.payload.email,
        customerPhone: action.payload.phone,
      })
    case 'SET_TRANSACTION_SUCCESS':
      return ({
        ...state,
        transaction: action.payload
      })
    case 'SET_ERROR_NO_SERVICE_SELECTED':
      return ({
        ...state,
        noServiceSelectedStatus: action.payload
      })
    case 'SET_SHOW_PASSWORD_INPUT_STATUS':
      return ({
        ...state,
        showPasswordInputStatus: action.payload
      })
    default:
      return state;
  }
}

export default transactionDataList;