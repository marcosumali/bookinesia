let initialState = {
  cookies: '',
  transactions: [],
  transactionsExists: true,
  transactionsLoading: true,
  shop: '',
  shopExists: true,
  shopLoading: true,
  branch: '',
  branchExists: true,
  branchLoading: true,
  appointment: '',
  appointmentExists: true,
  appointmentLoading: true,
  transaction: '',
  transactionExists: true,
  transactionLoading: true,
  user: '',
  userExists: true,
  userLoading: true,
  registerCustomerName: '',
  registerCustomerEmail: '',
  registerCustomerPhone: '',
  registerCustomerPassword: '',
  registerCustomerNameError: false,
  registerCustomerEmailError: false,
  registerCustomerPhoneError: false,
  registerCustomerPasswordError: false,
  registerStatus: false,
  authenticationStatus: false,
  loginCustomerPhone: '',
  loginCustomerPassword: '',
  loginCustomerPhoneError: false,
  loginCustomerPasswordError: false,
  loginStatus: false,
  loginErrorMessage: '',
  loadingStatus: false,
}

const shopDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'CLEAR_USER_STATE':
      return ({
      })
    case 'SET_COOKIES_FUNCTION':
      return ({
        ...state,
        cookies: action.payload,
      })
    case 'GET_TRANSACTIONS_CUSTOMER_ID_SUCCESS':
      return ({
        ...state,
        transactions: action.payload,
        transactionsLoading: false
      })
    case 'GET_TRANSACTIONS_CUSTOMER_ID_FAILED':
      return ({
        ...state,
        transactionsExists: action.payload
      })
    case 'GET_TRANSACTIONS_SHOP_DATA_SUCCESS':
      return ({
        ...state,
        shop: action.payload,
        shopLoading: false
      })
    case 'GET_TRANSACTIONS_SHOP_DATA_FAILED':
      return ({
        ...state,
        shopExists: action.payload
      })
    case 'GET_TRANSACTIONS_BRANCH_DATA_SUCCESS':
      return ({
        ...state,
        branch: action.payload,
        branchLoading: false
      })
    case 'GET_TRANSACTIONS_BRANCH_DATA_FAILED':
      return ({
        ...state,
        branchExists: action.payload
      })
    case 'GET_TRANSACTIONS_APPOINTMENT_DATA_SUCCESS':
      return ({
        ...state,
        appointment: action.payload,
        appointmentLoading: false
      })
    case 'GET_TRANSACTIONS_APPOINTMENT_DATA_FAILED':
      return ({
        ...state,
        appointmentExists: action.payload
      })
    case 'GET_TRANSACTION_DATA_SUCCESS':
      return ({
        ...state,
        transaction: action.payload,
        transactionLoading: false
      })
    case 'GET_TRANSACTION_DATA_FAILED':
      return ({
        ...state,
        transactionExists: action.payload
      })
    case 'SET_CUSTOMER_DATA_SUCCESS':
      return ({
        ...state,
        user: action.payload,
        userLoading: false,
      })
    case 'SET_CUSTOMER_DATA_FAILED':
      return ({
        ...state,
        userExists: action.payload,
      })
    case 'SET_REGISTER_CUSTOMER_NAME':
      return ({
        ...state,
        registerCustomerName: action.payload,
      })
    case 'SET_REGISTER_CUSTOMER_EMAIL':
      return ({
        ...state,
        registerCustomerEmail: action.payload,
      })
    case 'SET_REGISTER_CUSTOMER_PHONE':
      return ({
        ...state,
        registerCustomerPhone: action.payload,
      })
    case 'SET_REGISTER_CUSTOMER_PASSWORD':
      return ({
        ...state,
        registerCustomerPassword: action.payload,
      })
    case 'SET_REGISTER_STATUS_SUCCESS':
    return ({
      ...state,
      registerStatus: action.payload
    })
    case 'SET_REGISTER_NAME_ERROR':
      return ({
        ...state,
        registerCustomerNameError: action.payload
      })
    case 'SET_REGISTER_EMAIL_ERROR':
      return ({
        ...state,
        registerCustomerEmailError: action.payload
      })
    case 'SET_REGISTER_PHONE_ERROR':
      return ({
        ...state,
        registerCustomerPhoneError: action.payload
      })
    case 'SET_REGISTER_PASSWORD_ERROR':
      return ({
        ...state,
        registerCustomerPasswordError: action.payload
      })
    case 'SET_REGISTER_NAME_OK':
      return ({
        ...state,
        registerCustomerNameError: action.payload
      })
    case 'SET_REGISTER_EMAIL_OK':
      return ({
        ...state,
        registerCustomerEmailError: action.payload
      })
    case 'SET_REGISTER_PHONE_OK':
      return ({
        ...state,
        registerCustomerPhoneError: action.payload
      })
    case 'SET_REGISTER_PASSWORD_OK':
      return ({
        ...state,
        registerCustomerPasswordError: action.payload
      })
    case 'SET_REGISTER_FORM_VALUE_BUID':
      return ({
        ...state,
        registerCustomerName: action.payload.name,
        registerCustomerEmail: action.payload.email,
        registerCustomerPhone: action.payload.phone,
      })
    case 'SET_AUTHENTICATION_STATUS':
      return ({
        ...state,
        authenticationStatus: action.payload
      })
    case 'SET_LOGIN_CUSTOMER_PHONE':
      return ({
        ...state,
        loginCustomerPhone: action.payload,
      })
    case 'SET_LOGIN_CUSTOMER_PASSWORD':
      return ({
        ...state,
        loginCustomerPassword: action.payload,
      })
    case 'SET_LOGIN_PHONE_ERROR':
      return ({
        ...state,
        loginCustomerPhoneError: action.payload
      })
    case 'SET_LOGIN_PASSWORD_ERROR':
      return ({
        ...state,
        loginCustomerPasswordError: action.payload
      })
    case 'SET_LOGIN_PHONE_OK':
      return ({
        ...state,
        loginCustomerPhoneError: action.payload
      })
    case 'SET_LOGIN_PASSWORD_OK':
      return ({
        ...state,
        loginCustomerPasswordError: action.payload
      })
    case 'SET_LOGIN_STATUS_SUCCESS':
      return ({
        ...state,
        loginStatus: action.payload
      })
    case 'SET_LOGIN_ERROR':
      return ({
        ...state,
        loginErrorMessage: action.payload
      })
    case 'SET_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload
      })
    default:
      return state;
  }
}

export default shopDataList;