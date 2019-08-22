import React, { Component } from 'react';

export default class inputDateBasic extends Component {
  render() {
    let { inputId, inputLabel, inputLabelStatus,handleChangesDateFunction, openingStatus, openingDate, className } = this.props
    let dates = openingDate.split('-')
    let setYear = dates[0]
    let setMonth = dates[1] - 1
    let setDate = dates[2]
    let inputDate = new Date(setYear, setMonth, setDate)
    let year = inputDate.getFullYear()
    let month = inputDate.getMonth() + 1
    let date = inputDate.getDate()

    if (month < 10) {
      month = '0' + month      
    }
    
    if (date < 10) {
      date = '0' + date      
    }
    let acceptedDate = `${year}-${month}-${date}`

    return (
      <div className={ className }>
        {
          inputLabelStatus ?
          <label htmlFor={ inputId } className="Form-text-active active">{ inputLabel }</label>
          :
          <div></div>
        }
        <input 
          id={ inputId }
          className="Input-date"
          type="date"
          required="required" // to remove (x) button
          onChange={ handleChangesDateFunction }
          value={ openingStatus ? acceptedDate: "" }
        />
      </div>
    )
  }
}
