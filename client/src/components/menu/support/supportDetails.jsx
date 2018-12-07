import React, { Component } from 'react';

import '../../../assets/css/general.css';
import './support.css';

export default class supportDetails extends Component {
  render() {
    return (
      <div className="row No-margin Details-content-box Padding-10">
        <div className="col s12 No-margin No-padding Margin-b-10">
          <div className="Contact-header-text">Contact Us</div>
        </div>

        <div className="col s12 No-margin No-padding Margin-b-10 Text-justify">
          <div className="Contact-info-text Margin-b-4">Questions about your transaction history or cancellation?</div>
          <div className="Contact-info-text Margin-b-4">Your barbershop wants to user our services? </div>
          <div className="Contact-info-text">We&apos;re committed to find your answers as quickly as possible.</div>
        </div>

        <div className="col s12 No-margin No-padding Margin-b-10">
          <div className="col s5 No-margin No-padding">
            <div className="Contact-text-grey">Email</div>
          </div>
          <div className="col s7 No-margin No-padding">
            <div className="Contact-text-blue">bookinesia@gmail.com</div>
          </div>
        </div>

        <div className="col s12 No-margin No-padding Margin-b-10">
          <div className="col s5 No-margin No-padding">
            <div className="Contact-text-grey">Phone No./WA</div>
          </div>
          <div className="col s7 No-margin No-padding">
            <div className="Contact-text-blue">0813 9107 7789</div>
          </div>
        </div>

        <div className="col s12 No-margin No-padding Margin-b-10">
          <div className="col s5 No-margin No-padding">
            <div className="Contact-text-grey">Office Hours</div>
          </div>
          <div className="col s7 No-margin No-padding">
            <div className="Contact-text-blue">Everyday / 9:00 - 18.00</div>
          </div>
        </div>

      </div>
    )
  }
}
