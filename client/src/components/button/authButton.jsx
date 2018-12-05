import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import '../auth/auth.css';
import LoadingInfiniteSvg from '../svg/loadingInfiniteSvg';
import { customerLoginInputValidation, customerRegisterInputValidation } from '../../store/firestore/customer/customer.actions';

class authButton extends Component {
  doNothing () {
  }

  render() {
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
    // Login Section
    loginCustomerPhone: state.user.loginCustomerPhone,
    loginCustomerPassword: state.user.loginCustomerPassword,
    loginStatus: state.user.loginStatus,
    loadingStatus: state.user.loadingStatus,
    // Register Section
    customerName: state.user.registerCustomerName,
    customerEmail: state.user.registerCustomerEmail,
    customerPhone: state.user.registerCustomerPhone,
    customerPassword: state.user.registerCustomerPassword,
    registerStatus: state.user.registerStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  customerLoginInputValidation,
  customerRegisterInputValidation
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (authButton);
