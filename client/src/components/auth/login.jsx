import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../assets/css/swal/swal.css';
import '../../assets/css/general.css';
import '../../assets/css/materialize/form.css';
import './auth.css';
import { handleCookies, handleLoginInputChanges, customerLoginInputValidation } from '../../store/firestore/customer/customer.actions';
import EyeSvg from '../svg/eyeSvg';
import EyeOffSvg from '../svg/eyeOffSvg';
import AuthButton from '../button/authButton';
import { loginDisableError, getAuthStatus } from '../../store/firestore/auth/auth.actions';

class loginComponent extends Component {
  constructor() {
    super()
    this.state = {
      visibilityStatus: false
    }
  }

  componentWillMount() {
    this.props.handleCookies('handle authentication login', this.props.cookies)
  }

  doNothing () {
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
    // console.log('from login component', this.props)
    return (
      <div>
        {
          this.props.authenticationStatus ?
          <Redirect to="/" />
          :
          <div className="row No-margin">
        
          <div className="col s12 No-margin No-padding Container-center Margin-b-4">
            <div className="Auth-header">Log In</div>
          </div>
  
          <div className="col s12 No-margin No-padding  Container-center Margin-b-16">
            <div className="Text-auth-info">Don't have a bookinesia account ? <a className="Text-auth-info-blue" href="/register">Register</a></div>
          </div>
  
          <form className="col s12 No-margin No-padding">
            {/* Phone Input */}
            {/* <div className="input-field ">
              {
                this.props.customerPhoneError !== false?
                <div>
                  <input id="phone" type="number" className="Input-error validate No-margin" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerPhone }/>
                  <label htmlFor="phone" className="Form-text active">Phone No.</label>
                  <span className="Input-info-error">{ this.props.customerPhoneError }</span>
                </div>
                :
                <div>
                  {
                    this.props.customerPhone !== "" ?
                    <div>
                      <input id="phone" type="number" className="validate No-margin valid" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerPhone }/>
                      <label htmlFor="phone" className="Form-text active">Phone No.</label>
                    </div>
                    :
                    <div>
                      <input id="phone" type="number" className="validate No-margin" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerPhone }/>
                      <label htmlFor="phone" className="Form-text">Phone No.</label>
                    </div>
                  }
                </div>
              }
            </div> */}

            {/* Email Input */}
            <div className="input-field">
              {
                this.props.customerEmailError !== false?
                <div>
                  <input id="email" type="email" className="Input-error validate No-margin" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerEmail }/>
                  <label htmlFor="email" className="Form-text active">Email</label>
                  <span className="Input-info-error">{ this.props.customerEmailError }</span>
                </div>
                :
                <div>
                  {
                    this.props.customerEmail !== "" ?
                    <div>
                      <input id="email" type="email" className="validate No-margin valid" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerEmail }/>
                      <label htmlFor="email" className="Form-text active">Email</label>
                    </div>
                    :
                    <div>
                      <input id="email" type="email" className="validate No-margin" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerEmail }/>
                      <label htmlFor="email" className="Form-text">Email</label>
                    </div>
                  }
                </div>
              }
            </div>
            
            {/* Password Input */}
            <div className="input-field">
              {
                this.props.customerPasswordError !== false?
                <div>
                  <div className="col s11 No-margin No-padding">
                    <input id="password" type="password" className="Input-error validate No-margin" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerPassword }/>
                    <label htmlFor="password" className="Form-text active">Password</label>
                    <span className="Input-info-error">{ this.props.customerPasswordError }</span>
                  </div>
                  <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility() }>
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
                    this.props.customerPassword !== "" ?
                    <div>
                        <div className="col s11 No-margin No-padding">
                          <input id="password" type="password" className="validate No-margin valid" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerPassword }/>
                          <label htmlFor="password" className="Form-text active">Password</label>
                        </div>
                        <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility() }>
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
                        <input id="password" type="password" className="validate No-margin" onChange={ this.props.handleLoginInputChanges } value={ this.props.customerPassword } />
                        <label htmlFor="password" className="Form-text">Password</label>
                      </div>
                      <div className="col s1 No-margin No-padding Margin-t-8" onClick={ () => this.passwordVisibility() }>
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
          </form>
  
          <div className="col s12 No-margin No-padding Text-justify Margin-b-24 Margin-t-20">
            <div className="Text-error">{ this.props.loginErrorMessage }</div>
            {
              this.props.loginErrorMessage === loginDisableError ?
              <div className="Text-error">Please contact <a style={{ color: '#D00', textDecoration: 'underline' }} href="/support">our support team</a>.</div>
              :
              <div></div>
            }
          </div>
            
          <AuthButton onPage="loginPage" history={ this.props.history } />
  
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // customerPhone: state.user.loginCustomerPhone,
    // customerPhoneError: state.user.loginCustomerPhoneError,
    loginErrorMessage: state.user.loginErrorMessage,
    customerEmail: state.user.loginCustomerEmail,
    customerEmailError: state.user.loginCustomerEmailError,
    customerPassword: state.user.loginCustomerPassword,
    customerPasswordError: state.user.loginCustomerPasswordError,
    cookies: state.user.cookies,
    loadingStatus: state.user.loadingStatus,
    authenticationStatus: state.user.authenticationStatus
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleLoginInputChanges,
  handleCookies,
  customerLoginInputValidation,
  getAuthStatus
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (loginComponent);