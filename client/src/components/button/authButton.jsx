import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import '../auth/auth.css';
import LoadingInfiniteSvg from '../svg/loadingInfiniteSvg';
import { 
  customerLoginInputValidation, 
  customerRegisterInputValidation, 
  customerSettingsInputValidation,
  customerChangePasswordInputValidation
} from '../../store/firestore/customer/customer.actions';

class authButton extends Component {
  doNothing () {
  }

  render() {
    // console.log('from auth button', this.props)
    return (
      <div>
        {
          this.props.onPage === 'loginPage' ?
          <div>
            {
              this.props.loadingStatus ?
              <div className="Container-center Auth-button-box">
                <LoadingInfiniteSvg width="24px" height="24px"/>
              </div>
              :
              <div className="Container-center Auth-button-box" onClick={ () => this.props.customerLoginInputValidation(this.props) }>
                <div className="Auth-button-text">Log In</div>
              </div>
            }
          </div>
          :
          this.props.onPage === 'registerPage' ?
          <div>
             {
              this.props.loadingStatus ?
              <div className="Container-center Auth-button-box">
                <LoadingInfiniteSvg width="24px" height="24px"/>
              </div>
              :
              <div className="Container-center Auth-button-box" onClick={ this.props.registerStatus === false? () => this.props.customerRegisterInputValidation(this.props) : () => this.doNothing }>
                <div className="Auth-button-text">Register</div>
              </div>
             }
          </div>
          :
          this.props.onPage === 'settingsPage' ?
          <div>
             {
              this.props.loadingStatus ?
              <div className="Container-center Auth-button-box Margin-b-16 Margin-t-8">
                <LoadingInfiniteSvg width="24px" height="24px"/>
              </div>
              :
              <div className="Container-center Auth-button-box Margin-b-16 Margin-t-8" onClick={ () => this.props.customerSettingsInputValidation(this.props) }>
                <div className="Auth-button-text">Save</div>
              </div>
             }
          </div>
          :
          this.props.onPage === 'changePasswordPage' ?
          <div>
             {
              this.props.loadingStatus ?
              <div className="Container-center Auth-button-box Margin-b-16">
                <LoadingInfiniteSvg width="24px" height="24px"/>
              </div>
              :
              <div className="Container-center Auth-button-box Margin-b-16" onClick={ () => this.props.customerChangePasswordInputValidation(this.props) }>
                <div className="Auth-button-text">Save</div>
              </div>
             }
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // General Needs
    cookies: state.user.cookies,
    loadingStatus: state.user.loadingStatus,
    window: state.user.window,
    // Login Section
    loginCustomerPhone: state.user.loginCustomerPhone,
    loginCustomerPassword: state.user.loginCustomerPassword,
    loginStatus: state.user.loginStatus,
    // Register Section
    customerName: state.user.registerCustomerName,
    customerEmail: state.user.registerCustomerEmail,
    customerPhone: state.user.registerCustomerPhone,
    customerPassword: state.user.registerCustomerPassword,
    registerStatus: state.user.registerStatus,
    // Settings Section
    settingsCustomerName: state.user.settingsCustomerName,
    settingsCustomerEmail: state.user.settingsCustomerEmail,
    settingsCustomerPhone: state.user.settingsCustomerPhone,
    // Change Password Section
    oldPassword: state.user.oldPassword,
    newPassword: state.user.newPassword,
    newPasswordConfirm: state.user.newPasswordConfirm,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  customerLoginInputValidation,
  customerRegisterInputValidation,
  customerSettingsInputValidation,
  customerChangePasswordInputValidation
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (authButton);
