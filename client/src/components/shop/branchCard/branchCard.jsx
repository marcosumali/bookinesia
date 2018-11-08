import React, { Component } from 'react';
import '../../../assets/css/general.css';
import './branchCard.css';

export default class branchCard extends Component {
  render() {
    return (
      <div className="row No-margin">
        <div className="Branch-card-container">
          <div className="Branch-image">
            <img className="Branch-image" src={ process.env.PUBLIC_URL + '/assets/img/dummy/gentology-barber-shop-area-depan.jpg' } alt="branch-img" />
          </div>
          <div className="Branch-description-box Container-center-cross">
            <div className="col s8 Branch-description-container No-padding">
              <div className="col s12 No-padding Container-one-line Margin-b-4">
                <p className="Branch-name No-margin">Tj. Duren</p>
                <div className="Branch-status-box Container-center">
                  <p className="Branch-status No-margin">Open</p>
                </div>
              </div>
              <p className="Branch-opening-hours No-margin">Opening Hours: 10.00 - 22.00 </p>
            </div>
            <div className="col s4 No-padding Book-button-container Container-end">
              <div className="Book-button-box Container-center">
                <p className="Book-button-text No-margin">Book Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
