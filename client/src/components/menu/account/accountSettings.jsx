import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../../assets/css/general.css';
import '../../../assets/css/materialize/form.css';
import './account.css';
import { handleCookies, handleSettingInputChanges } from '../../../store/firestore/customer/customer.actions';
import AccountCircleSvg from '../../svg/accountCircleSvg';
import EyeSvg from '../../svg/eyeSvg';
import EyeOffSvg from '../../svg/eyeOffSvg';
import AuthButton from '../../button/authButton';

class accountSettings extends Component {
  constructor() {
    super()
    this.state = {
      visibilityStatus: false,
    }
  }

  componentWillMount() {
    this.props.handleCookies('get account settings', this.props.cookies)
  }

  passwordVisibility() {
    let x = document.getElementById("password")
    if (x.type === "password") {
      x.type = "text"
      this.setState({
        'visibilityStatus': true
      })
    } else {
      x.type = "password"
      this.setState({
        'visibilityStatus': false
      })
    }
  }

  render() {
    // console.log('from settings', this.props)
    return (
      <div className="row No-margin">
        {
          this.props.authenticationStatus && this.props.authorizationStatus && this.props.user.registeredStatus ?
          <div>
            {
              this.props.userLoading ?
              <div></div>
              :
              <div>
                {/* Picture Section */}
                <div className="col s12 No-margin No-padding Container-center Margin-t-16">
                {
                  this.props.user.picture.length <= 0 ?
                  <AccountCircleSvg width="5em" height="5em" color="#ffffff" />
                  :
                  <div></div>
                }
                </div>
                
                {/* Form Section */}
                <form className="col s12 m8 offset-m2 l4 offset-l4">
                  <div className="col s12 No-margin No-padding Margin-t-16 Form-box-white Padding-10 Padding-t-24">
                    {/* Name Input */}
                    <div className="input-field">
                      {
                        this.props.settingsCustomerNameError !== false?
                        <div>
                          <input id="name" type="text" className="Input-error validate No-margin" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerName }/>
                          <label htmlFor="name" className="Form-text active">Name</label>
                          <span className="Input-info-error">{ this.props.settingsCustomerNameError }</span>
                        </div>
                        :
                        <div>
                          {
                            this.props.settingsCustomerName !== "" ?
                            <div>
                              <input id="name" type="text" className="validate No-margin valid" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerName }/>
                              <label htmlFor="name" className="Form-text active">Name</label>
                            </div>
                            :
                            <div>
                              <input id="name" type="text" className="validate No-margin" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerName } />
                              <label htmlFor="name" className="Form-text">Name</label>
                            </div>
                          }
                        </div>
                      }
                    </div>
          
                    {/* Phone Input */}
                    <div className="input-field Margin-b-4">
                      {
                        this.props.settingsCustomerPhoneError !== false?
                        <div>
                          <input id="phone" type="number" className="Input-error validate No-margin" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerPhone }/>
                          <label htmlFor="phone" className="Form-text active">Phone No.</label>
                          <span className="Input-info-error">{ this.props.settingsCustomerPhoneError }</span>
                        </div>
                        :
                        <div>
                          {
                            this.props.settingsCustomerPhone !== "" ?
                            <div>
                              <input id="phone" type="number" className="validate No-margin valid" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerPhone }/>
                              <label htmlFor="phone" className="Form-text active">Phone No.</label>
                            </div>
                            :
                            <div>
                              <input id="phone" type="number" className="validate No-margin" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerPhone }/>
                              <label htmlFor="phone" className="Form-text">Phone No.</label>
                            </div>
                          }
                        </div>
                      }
                    </div>

                    {/* Email Input */}
                    <div className="input-field Margin-b-24">
                      {
                        this.props.settingsCustomerEmailError !== false ?
                        <div>
                          <input id="email" type="email" className="Input-error validate No-margin" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerEmail }/>
                          <label htmlFor="email" className="Form-text active">Email</label>
                          <span className="Input-info-error">{ this.props.settingsCustomerEmailError }</span>
                        </div>
                        :
                        <div>
                          {
                            this.props.settingsCustomerEmail !== "" ?
                            <div>
                              <input id="email" type="email" className="validate No-margin valid" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerEmail }/>
                              <label htmlFor="email" className="Form-text active">Email</label>
                            </div>
                            :
                            <div>
                              <input id="email" type="email" className="validate No-margin" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerEmail }/>
                              <label htmlFor="email" className="Form-text">Email</label>
                            </div>
                          }
                        </div>
                      }
                    </div>

                    <div className="Text-justify Grey-text-small">Please input your password to authorise the changes.</div>
                    {/* Password Input */}
                    <div className="col s12 No-margin No-padding Margin-b-24">
                      <div className="input-field">
                        {
                          this.props.settingsCustomerPasswordError !== false?
                          <div>
                            <div className="col s11 No-margin No-padding">
                              <input autoComplete="off" id="password" type="password" className="Input-error validate No-margin" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerPassword }/>
                              <label htmlFor="password" className="Form-text active">Password</label>
                              <span className="Input-info-error">{ this.props.settingsCustomerPasswordError }</span>
                            </div>
                            <div className="col s1 No-margin No-padding Margin-t-8 Container-center" onClick={ () => this.passwordVisibility() }>
                              {
                                this.state.visibilityStatus ?
                                <EyeSvg width="25px" height="22px" color="#666666" />
                                :
                                <EyeOffSvg width="25px" height="22px" color="#666666" />
                              }
                            </div>
                          </div>
                          :
                          <div>
                            {
                              this.props.settingsCustomerPassword !== "" ?
                              <div>
                                  <div className="col s11 No-margin No-padding">
                                    <input autoComplete="off" id="password" type="password" className="validate No-margin valid" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerPassword }/>
                                    <label htmlFor="password" className="Form-text active">Password</label>
                                  </div>
                                  <div className="col s1 No-margin No-padding Margin-t-8 Container-center" onClick={ () => this.passwordVisibility() }>
                                    {
                                      this.state.visibilityStatus ?
                                      <EyeSvg width="25px" height="22px" color="#666666" />
                                      :
                                      <EyeOffSvg width="25px" height="22px" color="#666666" />
                                    }
                                  </div>
                              </div>
                              :
                              <div>
                                <div className="col s11 No-margin No-padding">
                                  <input autoComplete="off" id="password" type="password" className="validate No-margin" onChange={ this.props.handleSettingInputChanges } value={ this.props.settingsCustomerPassword } />
                                  <label htmlFor="password" className="Form-text">Password</label>
                                </div>
                                <div className="col s1 No-margin No-padding Margin-t-8 Container-center" onClick={ () => this.passwordVisibility() }>
                                  {
                                    this.state.visibilityStatus ?
                                    <EyeSvg width="25px" height="22px" color="#666666" />
                                    :
                                    <EyeOffSvg width="25px" height="22px" color="#666666" />
                                  }
                                </div>
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </div>

                    {/* Save Button */}
                    <AuthButton onPage="settingsPage" history={ this.props.history }/>

                  </div>
                </form>
 
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
    settingsCustomerName: state.user.settingsCustomerName,
    settingsCustomerEmail: state.user.settingsCustomerEmail,
    settingsCustomerPhone: state.user.settingsCustomerPhone,
    settingsCustomerPassword: state.user.settingsCustomerPassword,
    settingsCustomerNameError: state.user.settingsCustomerNameError,
    settingsCustomerEmailError: state.user.settingsCustomerEmailError,
    settingsCustomerPhoneError: state.user.settingsCustomerPhoneError,
    settingsCustomerPasswordError: state.user.settingsCustomerPasswordError,
    authenticationStatus: state.user.authenticationStatus,
    authorizationStatus: state.user.authorizationStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCookies,
  handleSettingInputChanges
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (accountSettings);
