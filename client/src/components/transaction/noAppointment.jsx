import React, { Component } from 'react';

import WarningSvg from '../svg/warningSvg';
import '../../assets/css/general.css';
import './transaction.css';

export default class noAppointment extends Component {
  render() {
    return (
      <div className="col s12 No-padding No-margin Container-center Queue-container Padding-l-r-10">
        <div className="col s12 No-padding No-margin Schedule-today-box Container-center Margin-t-b-10">
          <p className="No-margin Schedule-text animated fadeIn faster"></p>
        </div>
        <div className="col s12 No-padding No-margin Queue-no-box Container-center">
          <div className="No-margin Schedule-no animated fadeIn faster" style={{ maxHeight: '130px' }}>
            <WarningSvg width="2em" height="2em" color="#F68606" />
          </div>
        </div>
        <div className="col s12 No-padding No-margin Container-center">
          <p className="No-margin Schedule-text-full animated fadeIn faster">No Schedule</p>
        </div>
        <div className="col s12 No-padding No-margin Schedule-today-box Container-center Margin-t-b-10">
          <p className="No-margin Schedule-text animated fadeIn faster Text-center">Please select other schedule or provider to continue.</p>
        </div>
      </div> 
    )
  }
}
