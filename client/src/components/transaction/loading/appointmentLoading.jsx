import React, { Component } from 'react';

export default class appointmentLoading extends Component {
  render() {
    return (
      <div className="col s12 No-padding No-margin Container-center Queue-container Padding-l-r-10">
        <div className="col s12 No-padding No-margin Schedule-today-box Container-center Margin-t-b-10">
          <p className="No-margin Input-loading"></p>
        </div>
        <div className="col s12 No-padding No-margin Container-center Margin-b-10">
          <p className="No-margin Input-loading"></p>
        </div>
        <div className="col s12 No-padding No-margin Queue-no-box Container-center Margin-b-10">
          <p className="No-margin QueueNo-loading"></p>
        </div>
        <div className="col s12 No-padding No-margin Container-center Margin-b-10">
          <p className="No-margin Input-loading"></p>
        </div>
        <div className="col s12 No-padding No-margin Container-center Margin-b-24">
          <p className="No-margin Input-loading"></p>
        </div>
      </div>
    )
  }
}
