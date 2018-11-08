import React, { Component } from 'react';
import '../../../assets/css/general.css';
import './shopHeader.css';

export default class shopHeader extends Component {
  render() {
    return (
      <div className="row No-margin Shop-header-container Container-center-cross">
        <div className="col s2 Height-100 No-padding No-margin Container-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/>
            <path className="Back-arrow" d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"/>
          </svg>
        </div>

        <div className="col s2 Height-100 No-padding No-margin Container-center">
          <img src={ process.env.PUBLIC_URL + '/assets/img/dummy/gentology-logo.jpg' } className="No-padding Shop-logo" alt="Shop-logo" />
        </div>

        <div className="col s8 Height-100 No-margin No-padding Container-center Padding-l-10">
          <div className="col s12 No-padding Container-center">
              <p className="No-margin Shop-header-category">Barbershop</p>
              <p className="No-margin Shop-header-name">Marco's Chop Shop</p>
          </div>
        </div>
      </div>
    )
  }
}
