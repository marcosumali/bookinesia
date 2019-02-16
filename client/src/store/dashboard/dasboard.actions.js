import { getSpecificAppointments, setAppointmentLoading } from '../firestore/transaction/transaction.actions';

// To handle date input
export const handleBasicDateInput = (e, selectedStaff, params) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value
    let inputDate = new Date(value)
    let year = inputDate.getFullYear()
    let month = inputDate.getMonth() + 1
    let date = inputDate.getDate()
    let acceptedDate = `${year}-${month}-${date}`

    if (inputId === 'calendarDate') {
      dispatch(setAppointmentLoading(true))
      dispatch(setCalendarDate(acceptedDate))
      dispatch(getSpecificAppointments(selectedStaff, params, acceptedDate))
    } 
  }
}

export const setCalendarDate = (data) => {
  return {
    type: 'SET_SELECTED_DATE',
    payload: data
  }
}