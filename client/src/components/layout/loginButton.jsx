import React, { Component } from 'react';

import '../../assets/css/general.css';
import './navbar.css';
import LoginSvg from '../svg/loginSvg';

export default class loginButton extends Component {
  render() {
    return (
      <a href="/login" className="Container-center Display-flex Width-100 No-padding Margin-b-16">
        <div className="Container-center Mobile-white-box-filled">
          <div className="Container-center Margin-r-10">
            <LoginSvg color="#5499c3" width="1.5em" height="1.5em" />
          </div>
          <div className="Mobile-blue-text">Sign In Bookinesia</div>
        </div>
      </a>
    )
  }
}
