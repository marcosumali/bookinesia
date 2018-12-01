import React, { Component } from 'react';
import { Navbar , NavItem } from 'react-materialize';

import '../../assets/css/general.css';
import './navbar.css';
import HomeSvg from '../svg/homeSvg';
import ShoppingCartSvg from '../svg/shoppingCartSvg';
import SmileyFaceSvg from '../svg/smileyFaceSvg';
import SupportSvg from '../svg/supportSvg';
import CloseSvg from '../svg/closeSvg';
import LoginSvg from '../svg/loginSvg';

export default class navbar extends Component {
  render() {
    const windowInnerWidth = window.innerWidth
    // console.log('from navbar component', this.props)
    return (
      <div>
        {
          windowInnerWidth < 1024 ?
          <Navbar className="Nav-box" brand='Bookinesia' right fixed>
            <div>  
              <div>
                <NavItem>
                  <div className="Container-center-cross Height-100 Justify-end" style={{ marginTop: '5px' }}>
                    <div className="Margin-r-16 ">
                      <CloseSvg color="#ffffff" width="1.5em" height="1.5em" />
                    </div>
                  </div>
                </NavItem>
                <NavItem href="/">
                  <div className="Container-one-line Container-center-cross Height-100">
                    <div className="Margin-r-16 Margin-t-12">
                      <HomeSvg color="#ffffff" width="1.5em" height="1.5em" />
                    </div>
                    <div className="Navbar-text">Home</div>
                  </div>
                </NavItem>
                <NavItem href="/transactions">
                  <div className="Container-one-line Container-center-cross Height-100">
                    <div className="Margin-r-16 Margin-t-12">
                      <ShoppingCartSvg color="#ffffff" width="1.5em" height="1.5em" />
                    </div>
                    <div className="Navbar-text">Transaction</div>
                  </div>
                </NavItem>
                <NavItem href="/account">
                  <div className="Container-one-line Container-center-cross Height-100">
                    <div className="Margin-r-16 Margin-t-12">
                      <SmileyFaceSvg color="#ffffff" width="1.5em" height="1.5em" />
                    </div>
                    <div className="Navbar-text">Account</div>
                  </div>
                </NavItem>
                <NavItem href="/support">
                  <div className="Container-one-line Container-center-cross Height-100">
                    <div className="Margin-r-16 Margin-t-12">
                      <SupportSvg color="#ffffff" width="1.5em" height="1.5em" />
                    </div>
                    <div className="Navbar-text">Support</div>
                  </div>
                </NavItem>
              </div>
              <div className="Container-center Mobile-bottom">
                <div className="Container-center Mobile-white-box-transparent Margin-b-16">
                  <div className="Mobile-white-text">Not yet registered?</div>
                </div>
                <div className="Container-center Mobile-white-box-filled">
                  <div className="Container-center Margin-r-10">
                    <LoginSvg color="#5499c3" width="1.5em" height="1.5em" />
                  </div>
                  <div className="Mobile-blue-text">Log In Bookinesia</div>
                </div>
              </div>
            </div>
          </Navbar>
          :
          <Navbar className="Nav-box" brand='Bookinesia' right fixed>
            <div>              
              <div style={{ marginLeft: '10em' }}>
                <NavItem href="/transactions">
                  Transaction
                </NavItem>
                <NavItem href="/account">
                  Account
                </NavItem>
                <NavItem href="/support">
                  Support
                </NavItem>
              </div>
              <div className="Web-right">
                <NavItem onClick={() => console.log('test click')}>
                  Not yet registered?
                </NavItem>
                <NavItem onClick={() => console.log('test click')}>
                  Log In
                </NavItem>
              </div>
            </div>
          </Navbar>
        }
      </div>
    )
  }
}
