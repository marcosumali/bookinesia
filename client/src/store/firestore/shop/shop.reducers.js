let initialState = {
  dataList: []
}

const dataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'GET_DATA_SUCCESS':
      return ({
        ...state,
        dataList: action.payload
      })
    default:
      return state;
  }
}

export default dataList;