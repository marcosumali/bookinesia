import React, { Component } from 'react'

import '../../../assets/css/general.css';
import './branchDetails.css';

export default class branchImage extends Component {
  render() {
    return (
      <div className="col s12">
        <img className="Branch-details-image" src={ process.env.PUBLIC_URL + '/assets/img/dummy/gentology-barber-shop-area-depan.jpg' } alt="branch-img" />
      </div>
    )
  }
}
