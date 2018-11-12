import React, { Component } from 'react';

import '../../../assets/css/general.css';
import './shopHeader.css';
import PreviousArrowSvg from '../../svg/arrowPreviousSvg';

export default class shopHeader extends Component {
  render() {
    return (
      <div className="row No-margin Shop-header-container Container-center-cross">
        <div className="col s2 Height-100 No-padding No-margin Container-center">
          <PreviousArrowSvg color="#666666" />
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
