import React, { Component } from 'react'

import '../../../assets/css/general.css';
import './branchDetails.css';

export default class contentServices extends Component {
  render() {
    return (
      <div className="row No-margin">
        <div className="col s12 Container-one-line Margin-t-b-4 No-padding">
          <div className="col s6 No-margin No-padding Self-flex-start">
            <p className="Card-text No-margin">Signature haircut</p>
            <p className="Card-text No-margin">(inc. hairwash)</p>
          </div>
          <p className="col s2 Card-text No-margin No-padding Self-flex-start Text-center">40 min</p>
          <p className="col s4 Card-text No-margin No-padding Self-flex-start Text-center">Rp 80.000</p>
        </div>
        <div className="col s12 Container-one-line Margin-t-b-4 No-padding">
          <div className="col s6 No-margin No-padding">
            <p className="Card-text No-margin">Signature haircut</p>
            <p className="Card-text No-margin">(exc. hairwash)</p>
          </div>
          <p className="col s2 Card-text No-margin No-padding Self-flex-start Text-center">30 min</p>
          <p className="col s4 Card-text No-margin No-padding Self-flex-start Text-center">Rp 60.000</p>
        </div>
        <div className="col s12 Container-one-line Margin-t-b-4 No-padding">
          <div className="col s6 No-margin No-padding Self-flex-start">
            <p className="Card-text No-margin">Traditional shaving</p>
            <p className="Card-text No-margin"></p>
          </div>
          <p className="col s2 Card-text No-margin No-padding Self-flex-start Text-center">20 min</p>
          <p className="col s4 Card-text No-margin No-padding Self-flex-start Text-center">Rp 40.000</p>
        </div>
        <div className="col s12 Container-one-line Margin-t-b-4 No-padding">
          <div className="col s6 No-margin No-padding Self-flex-start">
            <p className="Card-text No-margin">Hair tattoo</p>
            <p className="Card-text No-margin"></p>
          </div>
          <p className="col s2 Card-text No-margin No-padding Self-flex-start Text-center">40 min</p>
          <p className="col s4 Card-text No-margin No-padding Self-flex-start Text-center">Rp 40.000</p>
        </div>
        <div className="col s12 Container-one-line Margin-t-b-4 No-padding">
          <div className="col s6 No-margin No-padding Self-flex-start">
            <p className="Card-text No-margin">Hair Polish</p>
            <p className="Card-text No-margin"></p>
          </div>
          <p className="col s2 Card-text No-margin No-padding Self-flex-start Text-center">40 min</p>
          <p className="col s4 Card-text No-margin No-padding Self-flex-start Text-center">Rp 80.000</p>
        </div>

     </div>
    )
  }
}
