import React, { Component } from 'react'

import ServiceDetails from './serviceDetails';
import BarberDetails from './barberDetails';
import CustomerDetails from './customerDetails';
import SuccessDetails from './successDetails';

export default class transactionDetail extends Component {
  render() {
    return (
      <div className="Content-card">
        {/* Purpose of Content Card is to route the exact section with the correct content details from the server */}
        {
          this.props.content === 'Choose Your Services' ?
          <ServiceDetails />
          :
          this.props.content === `Choose Your Barber & Schedule` ?
          <BarberDetails />
          :
          this.props.content === `Transaction Details` ?
          <CustomerDetails />
          :
          this.props.content === "" ?
          <SuccessDetails />
          :
          <div></div>
        }
        
      </div>
    )
  }
}
