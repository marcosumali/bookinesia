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
    default:
      return state;
  }
}

export default shopDataList;