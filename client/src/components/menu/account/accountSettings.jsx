import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../../assets/css/general.css';
import '../../../assets/css/materialize/form.css';
import './account.css';
import { handleCookies, handleSettingInputChanges } from '../../../store/firestore/customer/customer.actions';
import AccountCircleSvg from '../../svg/accountCircleSvg';
import AuthButton from '../../button/authButton';

class accountSettings extends Component {
  componentWillMount() {
    this.props.handleCookies('get account settings', this.props.cookies)
  }

  render() {
    // console.log('from settings', this.props)
    return (
      <div className="row No-margin">
        {
          this.props.authenticationStatus && this.props.authorizationStatus ?
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
                      this.props.settingsCustomerEmailError !== false?
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

                  {/* Save Button */}
                  <AuthButton onPage="settingsPage" history={ this.props.history }/>

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
  return {
    cookies: state.user.cookies,
    user: state.user.user,
    userExists: state.user.userExists,
    userLoading: state.user.userLoading,
    settingsCustomerName: state.user.settingsCustomerName,
    settingsCustomerEmail: state.user.settingsCustomerEmail,
    settingsCustomerPhone: state.user.settingsCustomerPhone,
    settingsCustomerNameError: state.user.settingsCustomerNameError,
    settingsCustomerEmailError: state.user.settingsCustomerEmailError,
    settingsCustomerPhoneError: state.user.settingsCustomerPhoneError,
    authenticationStatus: state.user.authenticationStatus,
    authorizationStatus: state.user.authorizationStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCookies,
  handleSettingInputChanges
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (accountSettings);
