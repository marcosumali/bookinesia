let initialState = {
  cookies: '',
  window: '',
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
  authenticationStatus: false,
  loginCustomerPhone: '',
  loginCustomerEmail: '',
  loginCustomerPassword: '',
  loginCustomerPhoneError: false,
  loginCustomerEmailError: false,
  loginCustomerPasswordError: false,
  loginErrorMessage: '',
  loadingStatus: false,
  authorizationStatus: true,
  settingsCustomerName: '',
  settingsCustomerEmail: '',
  settingsCustomerPhone: '',
  settingsCustomerPassword: '',
  settingsCustomerNameError: false,
  settingsCustomerEmailError: false,
  settingsCustomerPhoneError: false,
  settingsCustomerPasswordError: false,
  oldPassword: '',
  oldPasswordError: false,
  newPassword: '',
  newPasswordError: false,
  newPasswordConfirm: '',
  newPasswordConfirmError: false,
  changePasswordErrors: [],
}

const customerDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'CLEAR_USER_STATE':
      return ({
        ...state,
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
      })
    case 'SET_COOKIES_FUNCTION':
      return ({
        ...state,
        cookies: action.payload,
      })
    case 'SET_WINDOW_FUNCTION':
      return ({
        ...state,
        window: action.payload,
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
        transactionsExists: action.payload,
        transactionsLoading: false
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
    case 'SET_LOGIN_CUSTOMER_EMAIL':
      return ({
        ...state,
        loginCustomerEmail: action.payload,
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
    case 'SET_LOGIN_EMAIL_ERROR':
      return ({
        ...state,
        loginCustomerEmailError: action.payload
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
    case 'SET_LOGIN_EMAIL_OK':
      return ({
        ...state,
        loginCustomerEmailError: action.payload
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
    case 'SET_AUTHORIZATION_STATUS':
      return ({
        ...state,
        authorizationStatus: action.payload
      })
    case 'SET_SETTING_CUSTOMER_NAME':
      return ({
        ...state,
        settingsCustomerName: action.payload,
      })
    case 'SET_SETTING_CUSTOMER_EMAIL':
      return ({
        ...state,
        settingsCustomerEmail: action.payload,
      })
    case 'SET_SETTING_CUSTOMER_PHONE':
      return ({
        ...state,
        settingsCustomerPhone: action.payload,
      })
    case 'SET_SETTING_CUSTOMER_PASSWORD':
      return ({
        ...state,
        settingsCustomerPassword: action.payload,
      })
    case 'SET_SETTING_FORM_VALUE_BUID':
      return ({
        ...state,
        settingsCustomerName: action.payload.name,
        settingsCustomerEmail: action.payload.email,
        settingsCustomerPhone: action.payload.phone,
      })
    case 'SET_SETTING_NAME_ERROR':
      return ({
        ...state,
        settingsCustomerNameError: action.payload
      })
    case 'SET_SETTING_EMAIL_ERROR':
      return ({
        ...state,
        settingsCustomerEmailError: action.payload
      })
    case 'SET_SETTING_PHONE_ERROR':
      return ({
        ...state,
        settingsCustomerPhoneError: action.payload
      })
    case 'SET_SETTING_PASSWORD_ERROR':
      return ({
        ...state,
        settingsCustomerPasswordError: action.payload
      })
    case 'SET_SETTING_NAME_OK':
      return ({
        ...state,
        settingsCustomerNameError: action.payload
      })
    case 'SET_SETTING_EMAIL_OK':
      return ({
        ...state,
        settingsCustomerEmailError: action.payload
      })
    case 'SET_SETTING_PHONE_OK':
      return ({
        ...state,
        settingsCustomerPhoneError: action.payload
      })
    case 'SET_SETTING_PASSWORD_OK':
      return ({
        ...state,
        settingsCustomerPasswordError: action.payload
      })
    case 'SET_OLD_PASSWORD':
      return ({
        ...state,
        oldPassword: action.payload,
      })
    case 'SET_NEW_PASSWORD':
      return ({
        ...state,
        newPassword: action.payload,
      })
    case 'SET_NEW_PASSWORD_CONFIRM':
      return ({
        ...state,
        newPasswordConfirm: action.payload,
      })
    case 'SET_OLD_PASSWORD_INPUT_ERROR':
      return ({
        ...state,
        oldPasswordError: action.payload
      })
    case 'SET_NEW_PASSWORD_INPUT_ERROR':
      return ({
        ...state,
        newPasswordError: action.payload
      })
    case 'SET_NEW_PASSWORD_CONFIRM_INPUT_ERROR':
      return ({
        ...state,
        newPasswordConfirmError: action.payload
      })
    case 'SET_OLD_PASSWORD_INPUT_OK':
      return ({
        ...state,
        oldPasswordError: action.payload
      })
    case 'SET_NEW_PASSWORD_INPUT_OK':
      return ({
        ...state,
        newPasswordError: action.payload
      })
    case 'SET_NEW_PASSWORD_CONFIRM_INPUT_OK':
      return ({
        ...state,
        newPasswordConfirmError: action.payload
      })
    case 'SET_PASSWORD_CHECKING_ERRORS':
      return ({
        ...state,
        changePasswordErrors: action.payload
      })

    default:
      return state;
  }
}

export default customerDataList;