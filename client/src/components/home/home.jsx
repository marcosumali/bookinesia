import React, { Component } from 'react';

import '../../assets/css/general.css';
import './home.css';
import HomeHeader from './homeHeader';
import HomeFeatures from './homeFeatures';
import HomeContactUs from './homeContactUs';
// import RegisteredShops from './homeRegShop';

export default class home extends Component {
  render() {
    return (
      <div className="row No-margin">
        <div className="col s12 m12 No-margin No-padding">
          <HomeHeader />
        </div>
        <div className="col s12 m12 No-margin No-padding">
          <HomeFeatures />
        </div>
        {/* <div className="col s12 m12 No-margin No-padding">
          <RegisteredShops />
        </div> */}
        <div className="col s12 m12 No-margin No-padding">
          <HomeContactUs />
        </div>
      </div>
    )
  }
}
