let initialState = {
  cookies: '',
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
    default:
      return state;
  }
}

export default shopDataList;