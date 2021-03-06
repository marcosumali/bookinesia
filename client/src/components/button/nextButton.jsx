import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import { customerInputValidation, customerServiceInputValidation } from '../../store/firestore/transaction/transaction.actions';
import LoadingDotSvg from '../svg/loadingDotSvg';

class nextButton extends Component {
  render() {
    return (
      <div>
        {
          this.props.text === 'Confirm and Book' ?
            Number(this.props.selectedAppointment.currentTransaction) >= Number(this.props.selectedAppointment.maxQueue) ||
            this.props.selectedStaffLoading ||
            this.props.selectedAppointmentLoading ||
            this.props.selectedServicesLoading ||
            this.props.selectedAppointment.disableStatus ?
            <div className="Next-button-disable Container-center">
              <p className="Next-text-disable">{ this.props.text }</p>
            </div>
            :
            <div>
            {
              this.props.loadingStatus ?
              <div>
                <div className="Next-button Container-center">
                  <LoadingDotSvg width="4.5em" height="4.5em" />
                </div>
              </div>
              :
              <div onClick={ () => this.props.customerInputValidation(this.props) }>
                <div className="Next-button Container-center">
                  <p className="Next-text">{ this.props.text }</p>
                </div>
              </div>
            }
            </div>
          :
          this.props.text === 'Continue' && this.props.onPage === 'ServicePage' ?
            this.props.servicesLoading ?
            <div className="Next-button-disable Container-center">
              <p className="Next-text-disable">{ this.props.text }</p>
            </div>
            :
            <div onClick={ () => this.props.customerServiceInputValidation(this.props) }>
              <div className="Next-button Container-center">
                <p className="Next-text">{ this.props.text }</p>
              </div>
            </div>
          :
          this.props.text === 'Continue' && this.props.onPage === 'BarberPage' ?
            this.props.selectedAppointment.length <= 0 ||
            this.props.competentStaffsLoading || 
            this.props.appointmentsLoading ? 
            <div className="Next-button-disable Container-center">
              <p className="Next-text-disable">{ this.props.text }</p>
            </div>
            :
            Number(this.props.selectedAppointment.currentTransaction) >= Number(this.props.selectedAppointment.maxQueue) || 
            this.props.selectedAppointment.message === 'no-appointment' ? 
            <div className="Next-button-disable Container-center">
              <p className="Next-text-disable">{ this.props.text }</p>
            </div>
            :
            <Link to={ this.props.routeLink }>
              <div className="Next-button Container-center">
                  <p className="Next-text">{ this.props.text }</p>
              </div>
            </Link>
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
    window: state.user.window,
    // Loading Needs
    servicesLoading: state.shop.servicesLoading,
    competentStaffsLoading: state.cart.competentStaffsLoading,
    appointmentsLoading: state.cart.appointmentsLoading,
    selectedStaffLoading: state.cart.selectedStaffLoading,
    selectedAppointmentLoading: state.cart.selectedAppointmentLoading,
    selectedServicesLoading: state.cart.selectedServicesLoading,
    // Confirm Transaction Page Needs
    customerName: state.cart.customerName,
    customerEmail: state.cart.customerEmail,
    customerPhone: state.cart.customerPhone,
    customerPassword: state.cart.customerPassword,
    selectedStaff: state.cart.selectedStaff,
    selectedAppointment: state.cart.selectedAppointment,
    selectedServices: state.cart.selectedServices,
    loadingStatus: state.user.loadingStatus,
    shop: state.shop.shop,
    branch: state.shop.branch,
    showPasswordInputStatus: state.cart.showPasswordInputStatus,
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
