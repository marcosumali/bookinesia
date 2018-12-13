import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../assets/css/general.css';
import '../../assets/css/materialize/form.css';
import './transaction.css';
import CheckSvg from '../svg/checkSvg';
import { 
  getServicesBasedOnParams,
  getStaffBasedOnParams,
  getAppointmentBasedOnParams,
  handleInputChanges,
} from '../../store/firestore/transaction/transaction.actions';
import { handleCookies } from '../../store/firestore/customer/customer.actions';
import { returnWhatDay, returnWhatMonth } from '../../helpers/date';
import { formatMoney, getTotalTransaction } from '../../helpers/currency';

class customerDetails extends Component {
  componentWillMount() {
    let params = this.props.params
    this.props.getStaffBasedOnParams(params)
    this.props.getAppointmentBasedOnParams(params)
    this.props.getServicesBasedOnParams(params)
    this.props.handleCookies('during input', this.props.cookies)
  }

  render() {
    // console.log('from customer detail', this.props)
    return (
      <div className="row No-margin Margin-l-b-r-10">
        {
          this.props.selectedServicesExists && this.props.selectedStaffExists && this.props.selectedAppointmentExists ?
          <div>
            {
              this.props.selectedStaffLoading || this.props.selectedServicesLoading || this.props.selectedAppointmentLoading ?
              <div>
                {/* Detail Barber Booked by customer Loading */}
                <div className="col s12 No-margin No-padding Barber-booked-container Container-one-line Margin-b-10">
                  <div className="col s2 No-margin No-padding Barber-img-box Margin-r-10 Container-center">
                    <div className="Loading-circle-56"></div>
                  </div>
                  <div className="col s10 No-margin No-padding Barber-booked-details">
                    <div className="col s12 No-margin No-padding Barber-booked-name-box Margin-b-8">
                      <div className="Label-loading"></div>
                    </div>
                    <div className="col s12 No-margin No-padding Barber-booked-date-box Margin-b-8">
                      <div className="Label-loading"></div>
                    </div>
                    <div className="col s12 No-margin No-padding">
                      <div className="Label-loading"></div>
                    </div>
                  </div>
                </div>

                {/* Detail Chosen Service by customer Loading */}
                <div className="col s12 No-margin No-padding Service-booked-container Margin-b-10">
                  <div className="col s12 No-margin No-padding Margin-b-4">
                    <p className="No-margin Confirm-header">Services:</p>
                  </div>
                  <div className="col s12 No-margin No-padding Margin-b-4">
                    <div className="Label-loading Margin-b-4"></div>
                    <div className="Label-loading"></div>
                  </div>
                </div>
              </div>
              :
              <div>
                {/* Detail Barber Booked by customer */}
                <div className="col s12 No-margin No-padding Barber-booked-container Container-one-line Margin-b-10 animated fadeIn">
                  <div className="col s2 No-margin No-padding Barber-img-box Margin-r-10 Container-center">
                    <img className="Circle-img-56" src={ this.props.selectedStaff.picture } alt="barber" />
                  </div>
                  <div className="col s10 No-margin No-padding Barber-booked-details">
                    <div className="col s12 No-margin No-padding Barber-booked-name-box Margin-b-8">
                      <div className="col s2 No-margin No-padding">
                        <p className="No-margin Confirm-text">Barber</p>
                      </div>
                      <div className="col s1 No-margin No-padding Container-center">
                        <p className="No-margin Confirm-text">:</p>
                      </div>
                      <div className="col s9 No-margin No-padding ">
                        <p className="No-margin Confirm-text Text-capitalize">{ this.props.selectedStaff.name }</p>
                      </div>
                    </div>
                    <div className="col s12 No-margin No-padding Barber-booked-date-box Margin-b-8">
                      <div className="col s2 No-margin No-padding">
                        <p className="No-margin Confirm-text">Date</p>
                      </div>
                      <div className="col s1 No-margin No-padding Container-center">
                        <p className="No-margin Confirm-text">:</p>
                      </div>
                      <div className="col s9 No-margin No-padding">
                        <p className="No-margin Confirm-text Text-capitalize">
                          { returnWhatDay(Number(new Date(this.props.selectedAppointment.date).getDay())) },
                          &nbsp;{ new Date(this.props.selectedAppointment.date).getDate() }
                          &nbsp;{ returnWhatMonth(Number(new Date(this.props.selectedAppointment.date).getMonth())) }
                          &nbsp;{ new Date(this.props.selectedAppointment.date).getFullYear() }
                        </p>
                      </div>
                    </div>
                    <div className="col s12 No-margin No-padding">
                      {
                        Number(this.props.selectedAppointment.currentTransaction) >= Number(this.props.selectedAppointment.maxQueue) ?
                        <p className="No-margin Confirm-text-full">The barber is fully booked. Please go back and select other schedule or barber to continue.</p>
                        :
                        <p className="No-margin Confirm-text">Queue No. { Number(this.props.selectedAppointment.currentTransaction)+1 }</p>
                      }
                    </div>
                  </div>
                </div>

                {/* Detail Chosen Service by customer */}
                <div className="col s12 No-margin No-padding Service-booked-container Margin-b-10">
                  <div className="col s12 No-margin No-padding Margin-b-4">
                    <p className="No-margin Confirm-header">Services:</p>
                  </div>
                  {
                    this.props.selectedServices && this.props.selectedServices.map((service, index) => {
                      return (
                        <div className="col s12 No-margin No-padding Container-one-line Margin-b-4" key={ 'service' + index }>
                          <div className="col s1 No-margin No-padding Container-center">
                            <CheckSvg color="#666666" size="1em" />
                          </div>
                          <div className="col s8 No-margin No-padding Container-center-cross">
                            <p className="No-margin Confirm-text Text-capitalize">{ service.name }</p>
                          </div>
                          <div className="col s3 No-margin No-padding Container-center-cross Justify-end">
                            <p className="No-margin Confirm-text">Rp { formatMoney(service.price) }</p>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className="col s12 No-margin No-padding Container-one-line">
                    <div className="col s6 No-margin No-padding">
                      <p className="No-margin Confirm-header">Total</p>
                    </div>
                    <div className="col s6 No-margin No-padding Container-center-cross Justify-end">
                      <p className="No-margin Confirm-header">Rp { formatMoney(getTotalTransaction(this.props.selectedServices)) }</p>
                    </div>
                  </div>
                </div>
              </div>
            }

            {/* Customer Information Section */}
            <div className="col s12 No-margin No-padding Customer-details-container Margin-b-10">
              <div className="col s12 No-margin No-padding Margin-b-4">
                <p className="No-margin Confirm-header">Customer Details:</p>
              </div>
              <div className="col s12 No-margin No-padding">
                <p className="No-margin Confirm-text Text-justify">Barbershop and us will use this contact information to reach out to you and send out notifications. Please ensure you input active contact information.</p>
              </div>
              <form className="col s12 No-margin No-padding">
                <div className="input-field">
                  {
                    this.props.customerNameError !== false?
                    <div>
                      <input id="name" type="text" className="Input-error validate No-margin" onChange={ this.props.handleInputChanges } value={ this.props.customerName }/>
                      <label htmlFor="name" className="Form-text active">Name</label>
                      <span className="Input-info-error">{ this.props.customerNameError }</span>
                    </div>
                    :
                    <div>
                      {
                        this.props.customerName !== "" ?
                        <div>
                          <input id="name" type="text" className="validate No-margin valid" onChange={ this.props.handleInputChanges } value={ this.props.customerName }/>
                          <label htmlFor="name" className="Form-text active">Name</label>
                        </div>
                        :
                        <div>
                          <input id="name" type="text" className="validate No-margin" onChange={ this.props.handleInputChanges } value={ this.props.customerName } />
                          <label htmlFor="name" className="Form-text">Name</label>
                        </div>
                      }
                    </div>
                  }
                </div>
                <div className="input-field ">
                  {
                    this.props.customerPhoneError !== false?
                    <div>
                      <input id="phone" type="number" className="Input-error validate No-margin" onChange={ this.props.handleInputChanges } value={ this.props.customerPhone }/>
                      <label htmlFor="phone" className="Form-text active">Phone No.</label>
                      <span className="Input-info-error">{ this.props.customerPhoneError }</span>
                    </div>
                    :
                    <div>
                      {
                        this.props.customerPhone !== "" ?
                        <div>
                          <input id="phone" type="number" className="validate No-margin valid" onChange={ this.props.handleInputChanges } value={ this.props.customerPhone }/>
                          <label htmlFor="phone" className="Form-text active">Phone No.</label>
                        </div>
                        :
                        <div>
                          <input id="phone" type="number" className="validate No-margin" onChange={ this.props.handleInputChanges } value={ this.props.customerPhone }/>
                          <label htmlFor="phone" className="Form-text">Phone No.</label>
                        </div>
                      }
                    </div>
                  }
                </div>
                <div className="input-field Margin-b-10">
                  {
                    this.props.customerEmailError !== false?
                    <div>
                      <input id="email" type="email" className="Input-error validate No-margin" onChange={ this.props.handleInputChanges } value={ this.props.customerEmail }/>
                      <label htmlFor="email" className="Form-text active">Email</label>
                      <span className="Input-info-error">{ this.props.customerEmailError }</span>
                    </div>
                    :
                    <div>
                      {
                        this.props.customerEmail !== "" ?
                        <div>
                          <input id="email" type="email" className="validate No-margin valid" onChange={ this.props.handleInputChanges } value={ this.props.customerEmail }/>
                          <label htmlFor="email" className="Form-text active">Email</label>
                        </div>
                        :
                        <div>
                          <input id="email" type="email" className="validate No-margin" onChange={ this.props.handleInputChanges } value={ this.props.customerEmail }/>
                          <label htmlFor="email" className="Form-text">Email</label>
                        </div>
                      }
                    </div>
                  }
                </div>
              </form>
              {/* <div className="col s12 No-margin No-padding">
                <p className="No-margin Confirm-text Text-justify">I hereby declare to agree with <span className="Text-underline">Cancellation Policy</span>. I also agree to pay in total of stated amount.</p>
              </div> */}
            </div>

          </div>
          :
          this.props.selectedServicesExists === false?
          <Redirect to="/service-not-found" />
          :
          this.props.selectedStaffExists === false?
          <Redirect to="/provider-not-found" />
          :
          this.props.selectedAppointmentExists === false?
          <Redirect to="/appointment-not-found" />
          :
          <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    params: state.shop.params,
    routeLink : state.shop.routeLink,
    selectedStaff: state.cart.selectedStaff,
    selectedStaffExists: state.cart.selectedStaffExists,
    selectedStaffLoading: state.cart.selectedStaffLoading,
    selectedAppointment: state.cart.selectedAppointment,
    selectedAppointmentExists: state.cart.selectedAppointmentExists,
    selectedAppointmentLoading: state.cart.selectedAppointmentLoading,
    selectedServices: state.cart.selectedServices,
    selectedServicesExists: state.cart.selectedServicesExists,
    selectedServicesLoading: state.cart.selectedServicesLoading,
    customerName: state.cart.customerName,
    customerEmail: state.cart.customerEmail,
    customerPhone: state.cart.customerPhone,
    customerNameError: state.cart.customerNameError,
    customerEmailError: state.cart.customerEmailError,
    customerPhoneError: state.cart.customerPhoneError,
    cookies: state.user.cookies
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getServicesBasedOnParams,
  getStaffBasedOnParams,
  getAppointmentBasedOnParams,
  handleInputChanges,
  handleCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (customerDetails);