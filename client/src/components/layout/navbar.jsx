import React, { Component } from 'react';
import { Navbar , NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import './navbar.css';
import HomeSvg from '../svg/homeSvg';
import ShoppingCartSvg from '../svg/shoppingCartSvg';
import SmileyFaceSvg from '../svg/smileyFaceSvg';
import SupportSvg from '../svg/supportSvg';
import CloseSvg from '../svg/closeSvg';
import RegisterButton from './registerButton';
import LoginButton from './loginButton';
import { handleCookies } from '../../store/firestore/customer/customer.actions';
import { getAuthStatus, authSignOut, authRedirectAndSignOut } from '../../store/firestore/auth/auth.actions';

class navbar extends Component {
  componentWillMount() {
    this.props.authRedirectAndSignOut(this.props)
    this.props.handleCookies('get account', this.props.cookies, window.location.pathname)
  }

  componentDidUpdate() {
    this.props.authRedirectAndSignOut(this.props)
  }
  
  render() {
    const windowInnerWidth = window.innerWidth
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
                      <CloseSvg color="#ffffff" width="1.5rem" height="1.5rem" />
                    </div>
                  </div>
                </NavItem>
                <NavItem href="/">
                  <div className="Container-one-line Container-center-cross Height-100">
                    <div className="Margin-r-16 Margin-t-12">
                      <HomeSvg color="#ffffff" width="1.5rem" height="1.5rem" />
                    </div>
                    <div className="Navbar-text">Home</div>
                  </div>
                </NavItem>
                {
                  this.props.userExists && this.props.user !== "" ?
                  <div className="animated fadeIn">
                    <NavItem href="/transactions">
                      <div className="Container-one-line Container-center-cross Height-100">
                        <div className="Margin-r-16 Margin-t-12">
                          <ShoppingCartSvg color="#ffffff" width="1.5rem" height="1.5rem" />
                        </div>
                        <div className="Navbar-text">Transaction</div>
                      </div>
                    </NavItem>
                    <NavItem href="/account">
                      <div className="Container-one-line Container-center-cross Height-100">
                        <div className="Margin-r-16 Margin-t-12">
                          <SmileyFaceSvg color="#ffffff" width="1.5rem" height="1.5rem" />
                        </div>
                        <div className="Navbar-text">Account</div>
                      </div>
                    </NavItem>
                  </div>
                  :
                  <div></div>
                }
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
                {
                  this.props.userExists && this.props.user !== "" && this.props.user.registeredStatus === false ?
                  <RegisterButton />
                  :
                  this.props.userExists === false ?
                  <div className="Container-center Display-flex Width-100 No-padding">
                    <RegisterButton />
                    <LoginButton />
                  </div>
                  :  
                  <div></div>
                }
              </div>
            </div>
          </Navbar>
          :
          <Navbar className="Nav-box" brand='Bookinesia' right fixed>
            <div>              
              <div style={{ marginLeft: '12em' }}>
                {
                  this.props.userExists && this.props.user !== "" ?
                  <div>
                    <NavItem href="/transactions">
                      Transaction
                    </NavItem>
                    <NavItem href="/account">
                      Account
                    </NavItem>
                  </div>
                  :
                  <div></div>
                }
                <NavItem href="/support">
                  Support
                </NavItem>
              </div>
              <div className="Web-right">
                {
                  this.props.userExists && this.props.user !== "" && this.props.user.registeredStatus === false ?                  
                  <NavItem href="/register">
                    Not yet registered?
                  </NavItem>
                  :
                  this.props.userExists === false ?
                  <div>
                    <NavItem href="/register">
                      Not yet registered?
                    </NavItem>
                    <NavItem href="/login">
                      Sign In
                    </NavItem>
                  </div>
                  :
                  <div></div>
                }
              </div>
            </div>
          </Navbar>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  state.firebase.profile['email'] = state.firebase.auth.email
  return {
    cookies: state.user.cookies,
    user: state.user.user,
    userExists: state.user.userExists,
    userLoading: state.user.userLoading,
    authUser: state.firebase.profile,
    authUserIsLoaded: state.firebase.profile.isLoaded,
    window: state.user.window
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCookies,
  getAuthStatus,
  authSignOut,
  authRedirectAndSignOut,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (navbar);