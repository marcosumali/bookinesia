let initialState = {
  selectedDate: '',
}

const customerDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DATE':
      return ({
        ...state,
        selectedDate: action.payload,
      })
    default:
      return state;
  }
}

export default customerDataList;