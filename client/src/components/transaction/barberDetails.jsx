import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import Barber from '../../assets/data/dummy/barber';
import '../../assets/css/general.css';
import './transaction.css';
import PreviousArrowSvg from '../svg/arrowPreviousSvg';
import NextArrowSvg from '../svg/arrowNextSvg';
import { 
  setServicesIdBasedOnParams, 
  getStaffServiceDataBasedOnParams, 
  setSelectedStaff,
  setAppointmentIndex 
} from '../../store/firestore/transaction/transaction.actions';
import { setRouteLink } from '../../store/firestore/shop/shop.actions';
import { returnWhatDay, returnWhatMonth } from '../../helpers/date';

class detailBarbers extends Component {
  constructor() {
    super()
    this.state = {
      dataBarber: Barber,
      loadingBarberBox: [1,2,3,4]
    }
  }

  componentWillMount () {
    let params = this.props.params
    this.props.setServicesIdBasedOnParams(params)
    this.props.getStaffServiceDataBasedOnParams(params)
  }

  render() {
    // console.log('from barber detail transaction', this.props)
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
                            onClick={ () => this.props.setSelectedStaff(barber, this.props.params) }
                          >
                            <img className="Circle-img-64" src={ barber.picture } alt="barber" />
                          </div>  
                          :
                          // Image will be shown with opacity 0.5 to show that it is not the current selected staff
                          <div 
                            className="Barber-img-box Padding-r-4 Container-one-line animated fadeIn" 
                            onClick={ () => this.props.setSelectedStaff(barber, this.props.params) }
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
                  <div className="col s12 No-padding No-margin Date-container Container-center-cross">
                    <div></div>
                  </div>
                  {/* Queue Schedule Loading Section */}
                  <div className="col s12 No-padding No-margin Container-center Queue-container Padding-l-r-10">
                    <div className="col s12 No-padding No-margin Schedule-today-box Container-center Margin-t-b-10">
                      <p className="No-margin Input-loading"></p>
                    </div>
                    <div className="col s12 No-padding No-margin Container-center Margin-b-10">
                      <p className="No-margin Input-loading"></p>
                    </div>
                    <div className="col s12 No-padding No-margin Queue-no-box Container-center Margin-b-10">
                      <p className="No-margin QueueNo-loading"></p>
                    </div>
                    <div className="col s12 No-padding No-margin Container-center Margin-b-10">
                      <p className="No-margin Input-loading"></p>
                    </div>
                    <div className="col s12 No-padding No-margin Container-center Margin-b-24">
                      <p className="No-margin Input-loading"></p>
                    </div>
                  </div>
                </div>
                :
                <div>
                  {
                    this.props.appointments && this.props.appointments.map((appointmentData, index) => {
                      return (
                        <div key={ 'appointment' + index }>
                          {
                            this.props.appointmentIndex ===  index ?
                            <div>
                              {/* Schedule Date Section */}
                              <div className="col s12 No-padding No-margin Date-container Container-center-cross">
                                <div className="col s12 No-padding No-margin Date-container Container-center-cross animated fadeIn">
                                  {
                                    this.props.appointmentIndex === 0 ?
                                    <div className="col s1 No-padding No-margin Previous-arrow-box Container-center-cross">
                                      <div></div>
                                    </div>
                                    :
                                    <div 
                                      className="col s1 No-padding No-margin Previous-arrow-box Container-center-cross"
                                      onClick={ () => this.props.setAppointmentIndex('previous', 
                                        this.props.appointments, 
                                        this.props.appointmentIndex, 
                                        this.props.params, 
                                        this.props.selectedStaff) }
                                    >
                                      <PreviousArrowSvg color="#ffffff"/>
                                    </div>
                                  }                              
                                  <div className="col s10 No-padding No-margin Date-box Container-center">
                                    <p className="No-margin Schedule-date Text-capitalize">
                                      { returnWhatDay(Number(new Date(appointmentData.date).getDay())) },
                                      &nbsp;{ new Date(appointmentData.date).getDate() }
                                      &nbsp;{ returnWhatMonth(Number(new Date(appointmentData.date).getMonth())) }
                                      &nbsp;{ new Date(appointmentData.date).getFullYear() }
                                    </p>
                                  </div>
                                  {
                                    this.props.appointmentIndex === this.props.appointments.length-1 ?
                                    <div className="col s1 No-padding No-margin Next-arrow-box Container-center-cross">
                                      <div></div>
                                    </div>
                                    :
                                    <div 
                                      className="col s1 No-padding No-margin Next-arrow-box Container-center-cross" 
                                      onClick={ () => this.props.setAppointmentIndex('next', 
                                        this.props.appointments, 
                                        this.props.appointmentIndex, 
                                        this.props.params, 
                                        this.props.selectedStaff) }
                                    >
                                      <NextArrowSvg color="#ffffff" />
                                    </div>
                                  }
                                </div>
                              </div>
                              {/* Queue Schedule Section */}
                              <div className="col s12 No-padding No-margin Container-center Queue-container Padding-l-r-10">
                                <div className="col s12 No-padding No-margin Schedule-today-box Container-center Margin-t-b-10">
                                  <p className="No-margin Schedule-text animated fadeIn faster">Schedule: { appointmentData.startHours }.{ appointmentData.startMinutes } - { appointmentData.endHours }.{ appointmentData.endMinutes }</p>
                                </div>
                                <div className="col s12 No-padding No-margin Container-center Margin-b-10">
                                  <p className="No-margin Schedule-text animated fadeIn faster">Your Queue No.</p>
                                </div>
                                <div className="col s12 No-padding No-margin Queue-no-box Container-center Margin-b-10">
                                  <p className="No-margin Schedule-no animated fadeIn faster">{ Number(appointmentData.currentTransaction) + 1 }</p>
                                </div>
                                <div className="col s12 No-padding No-margin Container-center Margin-b-10">
                                  <p className="No-margin Schedule-text animated fadeIn faster">Max. Queue: { appointmentData.maxQueue } person</p>
                                </div>
                                <div className="col s12 No-padding No-margin Container-center Margin-b-24">
                                  <p className="No-margin Schedule-text animated fadeIn faster">You're waiting in line for { appointmentData.currentTransaction } person</p>
                                </div>
                              </div>    
                            </div>
                            :
                            <div></div>
                          }
                        </div>
                      )
                    })
                  }
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
    // primaryService: state.cart.primaryService,
    // secondaryServices: state.cart.secondaryServices,
    competentStaffs: state.cart.competentStaffs,
    competentStaffsExists: state.cart.competentStaffsExists,
    competentStaffsLoading: state.cart.competentStaffsLoading,
    selectedStaff: state.cart.selectedStaff,
    appointments: state.cart.appointments,
    appointmentsExists: state.cart.appointmentsExists,
    appointmentsLoading: state.cart.appointmentsLoading,
    appointmentIndex: state.cart.appointmentIndex,
    selectedAppointment: state.cart.selectedAppointment,
    selectedServiceParamExists: state.cart.selectedServiceParamExists,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setServicesIdBasedOnParams,
  getStaffServiceDataBasedOnParams,
  setSelectedStaff,
  setAppointmentIndex,
  setRouteLink
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (detailBarbers);