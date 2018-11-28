import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import { customerInputValidation, customerServiceInputValidation } from '../../store/firestore/transaction/transaction.actions';

class nextButton extends Component {
  render() {
    // console.log('check props in next', this.props)
    return (
      <div>
        {
          this.props.text === 'Confirm and Book' ?
            this.props.hasBookStatus ?
            <div>
              <div className="Next-button Container-center">
                <p className="Next-text">{ this.props.text }</p>
              </div>
            </div>
            :
            <div onClick={ () => this.props.customerInputValidation(this.props) }>
              <div className="Next-button Container-center">
                <p className="Next-text">{ this.props.text }</p>
              </div>
            </div>
          :
          this.props.text === 'Continue' && this.props.onPage === 'ServicePage' ?
          <div onClick={ () => this.props.customerServiceInputValidation(this.props) }>
            <div className="Next-button Container-center">
              <p className="Next-text">{ this.props.text }</p>
            </div>
          </div>
          :
          <Link to={ this.props.routeLink }>
            <div className="Next-button Container-center">
                <p className="Next-text">{ this.props.text }</p>
            </div>
          </Link>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // General Needs
    cookies: state.user.cookies,
    routeLink: state.shop.routeLink,
    params: state.shop.params,
    // Confirm Transaction Page Needs
    customerName: state.cart.customerName,
    customerEmail: state.cart.customerEmail,
    customerPhone: state.cart.customerPhone,
    selectedStaff: state.cart.selectedStaff,
    selectedAppointment: state.cart.selectedAppointment,
    selectedServices: state.cart.selectedServices,
    hasBookStatus: state.cart.hasBookStatus,
    // Service Transaction Page Needs
    primaryService: state.cart.primaryService,
    secondaryServices: state.cart.secondaryServices,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  customerInputValidation,
  customerServiceInputValidation
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (nextButton);
