import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../../assets/css/general.css';
import '../../../assets/css/materialize/form.css';
import '../../../assets/css/swal/swal.css';
import './account.css';
import EyeSvg from '../../svg/eyeSvg';
import EyeOffSvg from '../../svg/eyeOffSvg';
import CheckSvg from '../../svg/checkSvg';
import { handleChangePasswordInputChanges } from '../../../store/firestore/customer/customer.actions';
import AuthButton from '../../button/authButton';

class accountChangePassword extends Component {
  constructor() {
    super()
    this.state = {
      oldPassword: false,
      newPassword: false,
      newPasswordConfirm: false,
    }
  }

  passwordVisibility(inputId) {
    let x = document.getElementById(inputId)
    if (x.type === "password") {
      x.type = "text"
      this.setState({
        [inputId]: true
      })
    } else {
      x.type = "password"
      this.setState({
        [inputId]: false
      })
    }
  }

  render() {
    // console.log('from change password', this.props)
    return (
      <div>
        {
          this.props.authenticationStatus && this.props.authorizationStatus ?
          <div className="row No-margin">
            <div className="col s12 No-margin No-padding Form-box-white Padding-10 Margin-t-20">
    
              {/* Old Password Input */}
              <div className="col s12 No-margin No-padding">
                <div className="input-field">
                  {
                    this.props.oldPasswordError !== false?
                    <div>
                      <div className="col s11 No-margin No-padding">
                        <input id="oldPassword" type="password" className="Input-error validate No-margin" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.oldPassword }/>
                        <label htmlFor="oldPassword" className="Form-text active">Old Password</label>
                        <span className="Input-info-error">{ this.props.oldPasswordError }</span>
                      </div>
                      <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('oldPassword') }>
                        {
                          this.state.oldPassword ?
                          <EyeSvg width="25px" height="22px" color="#666666" />
                          :
                          <EyeOffSvg width="25px" height="22px" color="#666666" />
                        }
                      </div>
                    </div>
                    :
                    <div>
                      {
                        this.props.oldPassword !== "" ?
                        <div>
                            <div className="col s11 No-margin No-padding">
                              <input id="oldPassword" type="password" className="validate No-margin valid" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.oldPassword }/>
                              <label htmlFor="oldPassword" className="Form-text active">Old Password</label>
                            </div>
                            <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('oldPassword') }>
                              {
                                this.state.oldPassword ?
                                <EyeSvg width="25px" height="22px" color="#666666" />
                                :
                                <EyeOffSvg width="25px" height="22px" color="#666666" />
                              }
                            </div>
                        </div>
                        :
                        <div>
                          <div className="col s11 No-margin No-padding">
                            <input id="oldPassword" type="password" className="validate No-margin" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.oldPassword } />
                            <label htmlFor="oldPassword" className="Form-text">Old Password</label>
                          </div>
                          <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('oldPassword') }>
                            {
                              this.state.oldPassword ?
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
    
              {/* New Password Input */}
              <div className="col s12 No-margin No-padding">
                <div className="input-field">
                  {
                    this.props.newPasswordError !== false?
                    <div>
                      <div className="col s11 No-margin No-padding">
                        <input id="newPassword" type="password" className="Input-error validate No-margin" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.newPassword }/>
                        <label htmlFor="newPassword" className="Form-text active">New Password</label>
                        <span className="Input-info-error">{ this.props.newPasswordError }</span>
                      </div>
                      <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('newPassword') }>
                        {
                          this.state.newPassword ?
                          <EyeSvg width="25px" height="22px" color="#666666" />
                          :
                          <EyeOffSvg width="25px" height="22px" color="#666666" />
                        }
                      </div>
                    </div>
                    :
                    <div>
                      {
                        this.props.newPassword !== "" ?
                        <div>
                            <div className="col s11 No-margin No-padding">
                              <input id="newPassword" type="password" className="validate No-margin valid" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.newPassword }/>
                              <label htmlFor="newPassword" className="Form-text active">New Password</label>
                            </div>
                            <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('newPassword') }>
                              {
                                this.state.newPassword ?
                                <EyeSvg width="25px" height="22px" color="#666666" />
                                :
                                <EyeOffSvg width="25px" height="22px" color="#666666" />
                              }
                            </div>
                        </div>
                        :
                        <div>
                          <div className="col s11 No-margin No-padding">
                            <input id="newPassword" type="password" className="validate No-margin" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.newPassword } />
                            <label htmlFor="newPassword" className="Form-text">New Password</label>
                          </div>
                          <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('newPassword') }>
                            {
                              this.state.newPassword ?
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
    
              {/* New Password Confirm Input */}
              <div className="col s12 No-margin No-padding Margin-b-16">
                <div className="input-field">
                  {
                    this.props.newPasswordConfirmError !== false?
                    <div>
                      <div className="col s11 No-margin No-padding">
                        <input id="newPasswordConfirm" type="password" className="Input-error validate No-margin" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.newPasswordConfirm }/>
                        <label htmlFor="newPasswordConfirm" className="Form-text active">New Password Confirmation</label>
                        <span className="Input-info-error">{ this.props.newPasswordConfirmError }</span>
                      </div>
                      <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('newPasswordConfirm') }>
                        {
                          this.state.newPasswordConfirm ?
                          <EyeSvg width="25px" height="22px" color="#666666" />
                          :
                          <EyeOffSvg width="25px" height="22px" color="#666666" />
                        }
                      </div>
                    </div>
                    :
                    <div>
                      {
                        this.props.newPasswordConfirm !== "" ?
                        <div>
                            <div className="col s11 No-margin No-padding">
                              <input id="newPasswordConfirm" type="password" className="validate No-margin valid" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.newPasswordConfirm }/>
                              <label htmlFor="newPasswordConfirm" className="Form-text active">New Password Confirmation</label>
                            </div>
                            <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('newPasswordConfirm') }>
                              {
                                this.state.newPasswordConfirm ?
                                <EyeSvg width="25px" height="22px" color="#666666" />
                                :
                                <EyeOffSvg width="25px" height="22px" color="#666666" />
                              }
                            </div>
                        </div>
                        :
                        <div>
                          <div className="col s11 No-margin No-padding">
                            <input id="newPasswordConfirm" type="password" className="validate No-margin" onChange={ this.props.handleChangePasswordInputChanges } value={ this.props.newPasswordConfirm } />
                            <label htmlFor="newPasswordConfirm" className="Form-text">New Password Confirmation</label>
                          </div>
                          <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility('newPasswordConfirm') }>
                            {
                              this.state.newPasswordConfirm ?
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
              
    
              <div className="col s12 No-margin No-padding Margin-t-8 Margin-b-8 Error-box">
              {
                this.props.changePasswordErrors && this.props.changePasswordErrors.map((inputError, index) => {
                  return(
                    <div className="col s12 No-margin No-padding Margin-b-8" key={ 'error' + index }>
                      <div className="col s1 No-margin No-padding Container-center">
                        <CheckSvg color="#d00" size="1em" />
                      </div>
                      <div className="col s11 No-margin No-padding">
                        <div className="Text-error Text-justify">{ inputError }</div>
                      </div>
                    </div>
                  )
                })
              }
              </div>
    
              {/* Save Button */}
              <AuthButton onPage="changePasswordPage" history={ this.props.history }/>
      
            </div>
          </div>
          :
          <Redirect to="/" />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    oldPassword: state.user.oldPassword,
    oldPasswordError: state.user.oldPasswordError,
    newPassword: state.user.newPassword,
    newPasswordError: state.user.newPasswordError,
    newPasswordConfirm: state.user.newPasswordConfirm,
    newPasswordConfirmError: state.user.newPasswordConfirmError,
    authenticationStatus: state.user.authenticationStatus,
    authorizationStatus: state.user.authorizationStatus,
    changePasswordErrors: state.user.changePasswordErrors
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangePasswordInputChanges
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (accountChangePassword);