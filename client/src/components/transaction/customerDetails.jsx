import React, { Component } from 'react'

import '../../assets/css/general.css';
import './transaction.css';
import CheckSvg from '../svg/checkSvg';

export default class customerDetails extends Component {
  render() {
    return (
      <div className="row No-margin Margin-l-b-r-10">

        {/* Detail Barber Booked by customer */}
        <div className="col s12 No-margin No-padding Barber-booked-container Container-one-line Margin-b-10">
          <div className="col s2 No-margin No-padding Barber-img-box Margin-r-10 Container-center">
            <img className="Circle-img-56" src={ process.env.PUBLIC_URL +  '/assets/svg/barber0.svg' } alt="barber" />
          </div>
          <div className="col s10 No-margin No-padding Barber-booked-details">
            <div className="col s12 No-margin No-padding Barber-booked-name-box Margin-b-8">
              <div className="col s2 No-margin No-padding">
                <p className="No-margin Confirm-text">Barber</p>
              </div>
              <div className="col s1 No-margin No-padding Container-center">
                <p className="No-margin Confirm-text">:</p>
              </div>
              <div className="col s9 No-margin No-padding ">
                <p className="No-margin Confirm-text">Trisno</p>
              </div>
            </div>
            <div className="col s12 No-margin No-padding Barber-booked-date-box Margin-b-8">
              <div className="col s2 No-margin No-padding">
                <p className="No-margin Confirm-text">Date</p>
              </div>
              <div className="col s1 No-margin No-padding Container-center">
                <p className="No-margin Confirm-text">:</p>
              </div>
              <div className="col s9 No-margin No-padding">
                <p className="No-margin Confirm-text">Monday, 5 October 2018</p>
              </div>
            </div>
            <div className="col s12 No-margin No-padding">
              <p className="No-margin Confirm-text">Queue No. 8</p>
            </div>
          </div>
        </div>

        {/* Detail Chosen Service by customer */}
        <div className="col s12 No-margin No-padding Service-booked-container Margin-b-10">
          <div className="col s12 No-margin No-padding Margin-b-4">
            <p className="No-margin Confirm-header">Services:</p>
          </div>
          <div className="col s12 No-margin No-padding Container-one-line">
            <div className="col s1 No-margin No-padding Container-center">
              <CheckSvg color="#666666" size="12px" />
            </div>
            <div className="col s8 No-margin No-padding Container-center-cross">
              <p className="No-margin Confirm-text">Signatire haircut (inc. hairwash)</p>
            </div>
            <div className="col s3 No-margin No-padding Container-center-cross Justify-end">
              <p className="No-margin Confirm-text">Rp 40.000</p>
            </div>
          </div>
          <div className="col s12 No-margin No-padding Container-one-line">
            <div className="col s6 No-margin No-padding">
              <p className="No-margin Confirm-header">Total</p>
            </div>
            <div className="col s6 No-margin No-padding Container-center-cross Justify-end">
              <p className="No-margin Confirm-header">Rp 40.000</p>
            </div>
          </div>
        </div>

        {/* Customer Information Section */}
        <div className="col s12 No-margin No-padding Customer-details-container Margin-b-10">
          <div className="col s12 No-margin No-padding Margin-b-4">
            <p className="No-margin Confirm-header">Customer Details:</p>
          </div>
          <div className="col s12 No-margin No-padding">
            <p className="No-margin Confirm-text Text-justify">Barbershop and us will use this contact information to reach out to you and send out notifications. Please ensure you input active contact information.</p>
          </div>
          <form className="col s12 No-margin No-padding">
            <div class="input-field">
              <input id="name" type="text" className="validate No-margin" />
              <label htmlFor="name" className="Form-text">Name</label>
            </div>
            <div class="input-field">
              <input id="email" type="email" className="validate No-margin" />
              <label htmlFor="email" className="Form-text">Email</label>
            </div>
            <div class="input-field Margin-b-10">
              <input id="phone" type="text" className="validate No-margin" />
              <label htmlFor="phone" className="Form-text">Phone No.</label>
            </div>
          </form>
          <div className="col s12 No-margin No-padding">
            <p className="No-margin Confirm-text Text-justify">I hereby declare to agree with <span className="Text-underline">Cancellation Policy</span>. I also agree to pay in total of stated amount.</p>
          </div>

        </div>

      </div>
    )
  }
}
