import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import BarberFullComponent from './barberFullyBooked';
import NoAppointmentComponent from './noAppointment';
import ScheduleDateLoading from './loading/scheduleDateLoading';
import AppointmentLoading from './loading/appointmentLoading';
import '../../assets/css/general.css';
import './transaction.css';
import PreviousArrowSvg from '../svg/arrowPreviousSvg';
import NextArrowSvg from '../svg/arrowNextSvg';
import BasicDateInput from '../form/inputDateBasic';
import { 
  setServicesIdBasedOnParams, 
  getStaffServiceDataBasedOnParams, 
  setSelectedStaff,
  setAppointmentIndex,
  getSpecificAppointments,
} from '../../store/firestore/transaction/transaction.actions';
import { handleBasicDateInput } from '../../store/dashboard/dasboard.actions';
import { setRouteLink } from '../../store/firestore/shop/shop.actions';

class detailBarbers extends Component {
  constructor() {
    super()
    this.state = {
      loadingBarberBox: [1,2,3,4]
    }
  }

  componentWillMount () {
    let params = this.props.params
    this.props.setServicesIdBasedOnParams(params)
    this.props.getStaffServiceDataBasedOnParams(params)
  }
  
  render() {
    let appointmentData = this.props.appointments
    return (
      <div className="row No-margin">
        {
          this.props.selectedServiceParamExists ?
          <div>
            {/* Barber Picture Section */}
              <div className="col s12 No-padding No-margin Container-center Padding-l-r-10">
                {
                  this.props.competentStaffsLoading ?
                  this.state.loadingBarberBox.map((num, index) => {
                    return (
                      <div className="Barber-img-box Padding-r-4 Container-one-line" key={ 'barberLoading' + index }>
                        <div className="Loading-circle-64"></div>
                      </div>
                    )
                  })
                  :
                  this.props.competentStaffs.map((barber, index) => {
                    return (
                      <div  key={ 'barber' + index }>
                        {
                          this.props.selectedStaff.id === barber.id ?
                          // Image will be shown with opacity 1 to show that it is the current selected staff
                          <div 
                            className="Barber-img-box Padding-r-4 Container-one-line animated fadeIn" 
                            onClick={ () => { this.props.setSelectedStaff(barber); this.props.getSpecificAppointments(barber, this.props.params, this.props.selectedDate) }}
                          >
                            <img className="Circle-img-64" src={ barber.picture } alt="barber" />
                          </div>  
                          :
                          // Image will be shown with opacity 0.5 to show that it is not the current selected staff
                          <div 
                            className="Barber-img-box Padding-r-4 Container-one-line animated fadeIn" 
                            onClick={ () => { this.props.setSelectedStaff(barber); this.props.getSpecificAppointments(barber, this.props.params, this.props.selectedDate) }}
                          >
                            <img className="Circle-img-64 Img-opacity-5" src={ barber.picture } alt="barber" />
                          </div>
                        }
                      </div>
                    )
                  })
                }
              </div>

              {/* Barber Name Section */}
              <div className="col s12 No-padding No-margin Container-center Padding-l-r-10">
                {
                  this.props.competentStaffsLoading ?  
                  <p className="Input-loading"></p>
                  :
                  <p className="No-margin Barber-name Margin-t-b-10 Text-capitalize animated fadeIn">{ this.props.selectedStaff.name }</p>
                }
              </div>
              
              {
                this.props.appointmentsLoading ?
                <div>
                  {/* Schedule Date Loading Section */}
                  <ScheduleDateLoading />
                  {/* Queue Schedule Loading Section */}
                  <AppointmentLoading />
                </div>
                :
                <div>
                  <div>
                    {/* Schedule Date Section */}
                    <div className="col s12 No-padding No-margin Date-container Container-center-cross">
                      <div className="col s12 No-padding No-margin Date-container Container-center-cross animated fadeIn">
                        <div className="col s4 No-padding No-margin Previous-arrow-box Container-center-cross">
                          <div
                            className="col s4 No-padding No-margin Previous-arrow-box Container-center-cross"
                            onClick={ () => this.props.setAppointmentIndex(
                              'previous', 
                              appointmentData, 
                              this.props.selectedDate, 
                              this.props.params, 
                              this.props.selectedStaff) }
                          >
                            <PreviousArrowSvg color="#ffffff"/>
                          </div>
                        </div>
                        <div className="col s4 No-padding No-margin Date-box Container-center">
                          <BasicDateInput 
                            inputId="calendarDate"
                            className="input-field No-margin Schedule-date Width-100"
                            inputLabelStatus={ false }
                            inputLabel=""
                            openingStatus={ true }
                            openingDate={ this.props.selectedDate }
                            handleChangesDateFunction={ (e) => this.props.handleBasicDateInput(e, this.props.selectedStaff, this.props.params) }       
                          />
                        </div>
                        <div className="col s4 No-padding No-margin Next-arrow-box Container-nowrap-end">
                          <div
                            className="col s4 No-padding No-margin Next-arrow-box Container-nowrap-end" 
                            onClick={ () => this.props.setAppointmentIndex(
                              'next', 
                              appointmentData, 
                              this.props.selectedDate, 
                              this.props.params, 
                              this.props.selectedStaff) }
                          >
                            <NextArrowSvg color="#ffffff" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Queue Schedule Section */}
                    {
                      appointmentData.message === 'no-appointment' ?
                      <NoAppointmentComponent />
                      :
                      <div>
                        {
                          Number(appointmentData.currentTransaction) >= Number(appointmentData.maxQueue) ?
                          <BarberFullComponent appointmentData={ appointmentData } />
                          :
                          <div className="col s12 No-padding No-margin Container-center Queue-container Padding-l-r-10">
                            <div className="col s12 No-padding No-margin Schedule-today-box Container-center Margin-t-b-10">
                              <p className="No-margin Schedule-text animated fadeIn faster">Schedule: { appointmentData.startHours }.{ appointmentData.startMinutes } - { appointmentData.endHours }.{ appointmentData.endMinutes }</p>
                            </div>
                            <div className="col s12 No-padding No-margin Container-center">
                              <p className="No-margin Schedule-text animated fadeIn faster">Your Queue No.</p>
                            </div>
                            <div className="col s12 No-padding No-margin Queue-no-box Container-center">
                              <p className="No-margin Schedule-no animated fadeIn faster">{ Number(appointmentData.currentTransaction) + 1 }</p>
                            </div>
                            <div className="col s12 No-padding No-margin Container-center Margin-b-10">
                              <p className="No-margin Schedule-text animated fadeIn faster">Max. Queue: { appointmentData.maxQueue } person</p>
                            </div>
                            <div className="col s12 No-padding No-margin Container-center Margin-b-24">
                              <p className="No-margin Schedule-text animated fadeIn faster">You're waiting in line for { appointmentData.currentTransaction } person</p>
                            </div>
                          </div>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
          </div>
          :
          <Redirect to="/service-not-found"/>
        }        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    params: state.shop.params,
    branch: state.shop.branch,
    routeLink : state.shop.routeLink,
    competentStaffs: state.cart.competentStaffs,
    competentStaffsExists: state.cart.competentStaffsExists,
    competentStaffsLoading: state.cart.competentStaffsLoading,
    selectedStaff: state.cart.selectedStaff,
    appointments: state.cart.appointments,
    appointmentsExists: state.cart.appointmentsExists,
    appointmentsLoading: state.cart.appointmentsLoading,
    appointmentIndex: state.cart.appointmentIndex,
    selectedServiceParamExists: state.cart.selectedServiceParamExists,
    selectedDate: state.nav.selectedDate,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setServicesIdBasedOnParams,
  getStaffServiceDataBasedOnParams,
  setSelectedStaff,
  setAppointmentIndex,
  setRouteLink,
  handleBasicDateInput,
  getSpecificAppointments,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (detailBarbers);