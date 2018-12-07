import React, { Component } from 'react';

import '../../assets/css/general.css';
import './navbar.css';

export default class registerButton extends Component {
  render() {
    return (
      <a href="/register" className="Container-center Display-flex Width-100 No-padding Margin-b-16 animated fadeIn">
        <div className="Container-center Mobile-white-box-transparent">
          <div className="Mobile-white-text">Not yet registered?</div>
        </div>
      </a>
    )
  }
}
