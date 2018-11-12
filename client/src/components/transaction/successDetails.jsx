import React, { Component } from 'react'

import '../../assets/css/general.css';
import './transaction.css';
import CashRegisterSvg from '../svg/cashRegisterSvg';

export default class successDetails extends Component {
  render() {
    return (
      <div className="row No-margin Margin-b-10">
        <div className="col s12 No-margin No-padding Thanks-container Container-center Margin-b-10">
          <p className="No-margin Thanks-text Padding-t-b-8">Thank you !</p>
        </div>
        <div className="col s12 No-margin No-padding Container-center">
          <p className="No-margin Card-text">Your booking has been confirmed.</p>
        </div>
        <div className="col s12 No-margin No-padding Container-center Margin-t-b-16">
          <div className="No-margin No-padding Margin-r-10">
            <CashRegisterSvg color="#5499c3" size="4em" />
          </div>
          <div className="No-margin No-padding">
            <p className="No-margin Confirm-text-blue">Your Transaction Code:</p>
            <p className="No-margin Confirm-text">AA123BB456CC789</p>
            <p className="No-margin Confirm-text-blue">Transaction Amount:</p>
            <p className="No-margin Confirm-text">Rp 120.000</p>
          </div>
        </div>
        <div className="col s12 No-margin No-padding Container-center Padding-l-b-r-20">
          <p className="No-margin Confirm-text Text-justify">You can always check your live transaction queue number in your transaction history section.</p>
        </div>
      </div>
    )
  }
}
