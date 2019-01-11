import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../assets/css/swal/swal.css';
import '../../assets/css/general.css';
import '../../assets/css/materialize/form.css';
import './auth.css';
import { handleRegisterInputChanges, customerRegisterInputValidation, handleCookies } from '../../store/firestore/customer/customer.actions';
import EyeSvg from '../svg/eyeSvg';
import EyeOffSvg from '../svg/eyeOffSvg';
import AuthButton from '../button/authButton';

class registerComponent extends Component {
  constructor() {
    super()
    this.state = {
      visibilityStatus: false
    }
  }

  componentWillMount() {
    this.props.handleCookies('handle authentication register', this.props.cookies)
    this.props.handleCookies('during register', this.props.cookies)
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
    // console.log('from register component', this.props)
    return (
      <div className="row No-margin">
        {
          this.props.authenticationStatus ?
          <Redirect to="/" />
          :
          <div className="col s12 m8 offset-m2 l4 offset-l4">
        
            <div className="col s12 No-margin No-padding Container-center Margin-b-4">
              <div className="Auth-header">Register Now</div>
            </div>
          
            {
              this.props.userExists ?
              <div></div>
              :
              <div className="col s12 No-margin No-padding  Container-center">
                <div className="Text-auth-info">Have a bookinesia account ? <a className="Text-auth-info-blue" href="/login">Sign In</a></div>
              </div>
            }
  
            <form className="col s12 No-margin No-padding Margin-t-16">
              {/* Name Input */}
              <div className="input-field">
                {
                  this.props.customerNameError !== false?
                  <div>
                    <input id="name" type="text" className="Input-error validate No-margin" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerName }/>
                    <label htmlFor="name" className="Form-text active">Name</label>
                    <span className="Input-info-error">{ this.props.customerNameError }</span>
                  </div>
                  :
                  <div>
                    {
                      this.props.customerName !== "" ?
                      <div>
                        <input id="name" type="text" className="validate No-margin valid" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerName }/>
                        <label htmlFor="name" className="Form-text active">Name</label>
                      </div>
                      :
                      <div>
                        <input id="name" type="text" className="validate No-margin" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerName } />
                        <label htmlFor="name" className="Form-text">Name</label>
                      </div>
                    }
                  </div>
                }
              </div>
    
              {/* Phone Input */}
              <div className="input-field ">
                {
                  this.props.customerPhoneError !== false?
                  <div>
                    <input id="phone" type="number" className="Input-error validate No-margin" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerPhone }/>
                    <label htmlFor="phone" className="Form-text active">Phone No.</label>
                    <span className="Input-info-error">{ this.props.customerPhoneError }</span>
                  </div>
                  :
                  <div>
                    {
                      this.props.customerPhone !== "" ?
                      <div>
                        <input id="phone" type="number" className="validate No-margin valid" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerPhone }/>
                        <label htmlFor="phone" className="Form-text active">Phone No.</label>
                      </div>
                      :
                      <div>
                        <input id="phone" type="number" className="validate No-margin" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerPhone }/>
                        <label htmlFor="phone" className="Form-text">Phone No.</label>
                      </div>
                    }
                  </div>
                }
              </div>
                
              {/* Email Input */}
              <div className="input-field">
                {
                  this.props.customerEmailError !== false?
                  <div>
                    <input id="email" type="email" className="Input-error validate No-margin" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerEmail }/>
                    <label htmlFor="email" className="Form-text active">Email</label>
                    <span className="Input-info-error">{ this.props.customerEmailError }</span>
                  </div>
                  :
                  <div>
                    {
                      this.props.customerEmail !== "" ?
                      <div>
                        <input id="email" type="email" className="validate No-margin valid" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerEmail }/>
                        <label htmlFor="email" className="Form-text active">Email</label>
                      </div>
                      :
                      <div>
                        <input id="email" type="email" className="validate No-margin" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerEmail }/>
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
                      <input autoComplete="off" id="password" type="password" className="Input-error validate No-margin" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerPassword }/>
                      <label htmlFor="password" className="Form-text active">Password</label>
                      <span className="Input-info-error">{ this.props.customerPasswordError }</span>
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
                      this.props.customerPassword !== "" ?
                      <div>
                          <div className="col s11 No-margin No-padding">
                            <input autoComplete="off" id="password" type="password" className="validate No-margin valid" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerPassword }/>
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
                          <input autoComplete="off" id="password" type="password" className="validate No-margin" onChange={ this.props.handleRegisterInputChanges } value={ this.props.customerPassword } />
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
            </form>
  
            <div className="col s12 No-margin No-padding Text-justify Margin-b-24 Margin-t-20">
              <div className="Text-auth-info">Barbershop and us will use this contact information to reach out to you and send out notifications.</div>
              <div className="Text-auth-info">Please ensure you input active contact information.</div>
            </div>
          
            <AuthButton onPage="registerPage" history={ this.props.history } />

          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    customerName: state.user.registerCustomerName,
    customerEmail: state.user.registerCustomerEmail,
    customerPhone: state.user.registerCustomerPhone,
    customerPassword: state.user.registerCustomerPassword,
    customerNameError: state.user.registerCustomerNameError,
    customerEmailError: state.user.registerCustomerEmailError,
    customerPhoneError: state.user.registerCustomerPhoneError,
    customerPasswordError: state.user.registerCustomerPasswordError,
    cookies: state.user.cookies,
    authenticationStatus: state.user.authenticationStatus,
    userExists: state.user.userExists,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleRegisterInputChanges,
  customerRegisterInputValidation,
  handleCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (registerComponent);