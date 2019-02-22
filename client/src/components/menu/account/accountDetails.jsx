import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';

import '../../../assets/css/general.css';
import './account.css';
import AccountCircleSvg from '../../svg/accountCircleSvg.jsx';
import AccountDetailsLoading from './accountDetailsLoading';
import LogOutSvg from '../../svg/logOutSvg';
import KeySvg from '../../svg/keySvg';
import SettingSvg from '../../svg/settingSvg';
import { removeCookies } from '../../../helpers/auth';
import { authSignOut } from '../../../store/firestore/auth/auth.actions';

class accountDetails extends Component {
  logOut() {
    this.props.authSignOut(this.props.cookies)
  }

  render() {
    return (
      <div className="row No-margin">
        {
          this.props.authorizationStatus ?
          <div>
            {
              this.props.userLoading ?
              <AccountDetailsLoading />
              :
              <div className="row No-margin Details-content-box Padding-20">
                <div className="col s12 m8 offset-m2">
                  {/* Header Section */}
                  <div className="col s12 No-margin No-padding Padding-10 Container-center Margin-b-10">
                    <div className="col s3 No-margin No-padding Container-center">
                      {
                        this.props.user.picture.length <= 0 || this.props.user.picture === 'noPicture' ?
                        <AccountCircleSvg width="4em" height="4em" color="#EAEAEA" />
                        :
                        <div></div>
                      }
                    </div>
                    <div className="col s9 No-margin No-padding">
                      <div className="col s12 No-margin No-padding Margin-b-4">
                        <div className="Account-name-text Text-capitalize">{ this.props.user.name }</div>
                      </div>
                      <div className="col s12 No-margin No-padding">
                        <div className="col s5 No-margin No-padding">
                          <Link to="/settings">
                            <div className="col s12 No-margin No-padding Container-center Settings-button-box Container-one-line">
                              <div className="Container-center Margin-r-4">
                                <SettingSvg width="18px" height="18px" color="#ffffff" />
                              </div>
                              <div className="Container-center">
                                <div className="Settings-button-text">Settings</div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
          
                  {/* Customer Info Section */}
                  <div className="col s12 No-margin No-padding Padding-10 Info-box">
                    <div className="col s12 No-margin No-padding Margin-b-4">
                      <div className="Account-info-header">Email</div>
                    </div>
                    <div className="col s12 No-margin No-padding Margin-b-4">
                      <div className="Account-info-text">{ this.props.user.email }</div>
                    </div>
                    <div className="col s12 No-margin No-padding Margin-b-4">
                      <div className="Account-info-header">Phone No.</div>
                    </div>
                    <div className="col s12 No-margin No-padding Margin-b-4">
                      <div className="Account-info-text">{ this.props.user.phone }</div>
                    </div>
                  </div>

                  {/* Change Password Button */}
                  <div>
                    <Link to="/change-password">
                      <div className="col s12 No-margin No-padding Margin-b-16 Container-center">
                        <div className="Blue-button-pass Container-one-line Container-center Width-100">
                          <div className="Margin-r-4 Container-center">
                            <KeySvg width="18px" height="18px" color="#ffffff" />
                          </div>
                            <div className="Container-center">
                              <div className="White-text">Change Password</div>
                            </div>
                        </div>
                      </div>
                    </Link>

                    <div className="Fix-bottom">
                      <a href="/">
                        <div className="col s12 m8 offset-m2 Margin-b-24 Container-center" onClick={ () => this.logOut() }>
                          <div className="Blue-button Container-one-line Container-center">
                            <div className="Margin-r-4 Container-center">
                              <LogOutSvg width="18px" height="18px" color="#ffffff" />
                            </div>
                            <div className="Container-center">
                              <div className="White-text">Sign Out</div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    
                  </div>
                </div>
              </div>
            }
          </div>
          :
          <Redirect to="/" />
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
    authorizationStatus: state.user.authorizationStatus,
    authUser: state.firebase.profile,
    authUserIsLoaded: state.firebase.profile.isLoaded,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeCookies,
  authSignOut,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (accountDetails);