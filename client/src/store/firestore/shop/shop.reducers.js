let initialState = {
  params: {},
  routeLink: '',
  shop: {},
  shopExists: true,
  shopLoading: true,
  branches: [],
  branchesExists: true,
  branchesLoading: true,
  branch: {},
  branchExists: true,
  branchLoading: true,
  branchSchedule: [],
  branchScheduleExists: true,
  branchScheduleLoading: true,
  services: [],
  servicesExists: true,
  servicesLoading: true,
  staffs: [],
  staffsExists: true,
  staffsLoading: true,
  shops: [],
  shopsExists: true,
  shopsLoading: true,
}

const shopDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_PARAMS':
      return ({
        ...state,
        params: action.payload
      })
    case 'SET_ROUTE_LINK':
      return ({
        ...state,
        routeLink: action.payload
      })
    case 'CLEAR_SHOP_STATE':
      return ({
        ...state,
        shop: {},
        shopExists: true,
        shopLoading: true,      
        branch: {},
        branchExists: true,
        branchLoading: true,
        branchSchedule: [],
        branchScheduleExists: true,
        branchScheduleLoading: true,
        services: [],
        servicesExists: true,
        servicesLoading: true,
        staffs: [],
        staffsExists: true,
        staffsLoading: true,
      })
    case 'SET_STAFFS':
      return ({
        ...state,
        staffs: action.payload
      })
    case 'GET_SHOP_DATA_SUCCESS':
      return ({
        ...state,
        shop: action.payload,
        shopLoading: false
      })
    case 'GET_SHOP_DATA_FAILED':
      return ({
        ...state,
        shopExists: action.payload
      })
    case 'GET_BRANCHES_DATA_SUCCESS':
      return ({
        ...state,
        branches: action.payload,
        branchesLoading: false
      })
    case 'GET_BRANCHES_DATA_FAILED':
      return ({
        ...state,
        branchesExists: action.payload
      })
    case 'GET_BRANCH_DATA_SUCCESS':
      return ({
        ...state,
        branch: action.payload,
        branchLoading: false
      })
    case 'GET_BRANCH_DATA_FAILED':
      return ({
        ...state,
        branchExists: action.payload
      })
    case 'GET_BRANCH_SCHEDULE_DATA_SUCCESS':
      return ({
        ...state,
        branchSchedule: action.payload,
        branchScheduleLoading: false
      })
    case 'GET_BRANCH_SCHEDULE_DATA_FAILED':
      return ({
        ...state,
        branchScheduleExists: action.payload
      })
    case 'GET_SERVICES_DATA_SUCCESS':
      return ({
        ...state,
        services: action.payload,
        servicesLoading: false
      })
    case 'GET_SERVICES_DATA_FAILED':
      return ({
        ...state,
        servicesExists: action.payload
      })
    case 'GET_STAFFS_DATA_SUCCESS':
      return ({
        ...state,
        staffs: action.payload,
        staffsLoading: false
      })
    case 'GET_STAFFS_DATA_FAILED':
      return ({
        ...state,
        staffsExists: action.payload
      })
    case 'GET_SHOPS_DATA_SUCCESS':
      return ({
        ...state,
        shops: action.payload,
        shopsLoading: false
      })
    case 'GET_SHOPS_DATA_FAILED':
      return ({
        ...state,
        shopsExists: action.payload
      })
    default:
      return state;
  }
}

export default shopDataList;