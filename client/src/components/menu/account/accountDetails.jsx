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

class accountDetails extends Component {
  render() {
    // console.log('from account details', this.props)
    return (
      <div>
        {
          this.props.authenticationStatus ?
          <div>
            {
              this.props.userLoading ?
              <AccountDetailsLoading />
              :
              <div className="row No-margin Details-content-box Padding-10 Padding-l-r-20">      
                {/* Header Section */}
                <div className="col s12 No-margin No-padding Padding-10 Container-center Margin-b-10">
                  <div className="col s3 No-margin No-padding Container-center">
                    {
                      this.props.user.picture.length <= 0 ?
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
                        <div className="col s12 No-margin No-padding Container-center Settings-button-box Container-one-line">
                          <div className="Container-center Margin-r-4">
                            <SettingSvg width="18px" height="18px" color="#ffffff" />
                          </div>
                          <Link to="/settings">
                            <div className="Container-center">
                              <div className="Settings-button-text">Settings</div>
                            </div>
                          </Link>
                        </div>
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
                {
                  this.props.user.registeredStatus ?
                  <div>
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

                    <div className="Fix-bottom">
                      <a href="/">
                        <div className="col s12 No-margin No-padding Margin-b-24 Container-center" onClick={ () => this.props.removeCookies(this.props.cookies) }>
                          <div className="Blue-button Container-one-line Container-center">
                            <div className="Margin-r-4 Container-center">
                              <LogOutSvg width="18px" height="18px" color="#ffffff" />
                            </div>
                            <div className="Container-center">
                              <div className="White-text">Log Out</div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  :
                  <div></div>
                }
        
      
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
  return {
    cookies: state.user.cookies,
    user: state.user.user,
    userExists: state.user.userExists,
    userLoading: state.user.userLoading,
    authenticationStatus: state.user.authenticationStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (accountDetails);