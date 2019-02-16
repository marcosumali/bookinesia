import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../../assets/css/general.css';
import './transaction.css';
import CheckSvg from '../../svg/checkSvg';
import TransactionDetailsLoading from './transactionDetailsLoading';
import { 
  handleCookies,
  customerCancelTransaction
} from '../../../store/firestore/customer/customer.actions';
import { returnWhatDay, returnWhatMonth } from '../../../helpers/date';
import { formatMoney, getTotalTransaction } from '../../../helpers/currency';
import TransactionStatusDiv from './transactionStatusDiv';

class transactionDetails extends Component {
  componentWillMount () {
    let params = this.props.currentParams
    let transactionId = params.transactionId
    this.props.handleCookies('handle authorization transaction', this.props.cookies, transactionId)
  }

  render() {
    let heightStyle = {
      height: window.innerHeight
    }
    return (
      <div>
        {
          this.props.authorizationStatus ?
          <div>
            {
              this.props.transactionLoading || this.props.appointmentLoading ?
              <TransactionDetailsLoading />
              :
              <div className="row No-margin No-padding Details-box animated fadeIn" style={ heightStyle }>
                <div className="col s12 m8 offset-m2 l4 offset-l4 No-padding">
                  <div className="Details-content-box">
                    {/* Detail Header */}
                    <div className="Details-header-box Padding-10 Container-center">
                      <div className="col s12 No-margin No-padding Container-center">
                        <div className="Header-text-blue Text-capitalize">{ this.props.transaction.shop.name }</div>
                      </div>
                      <div className="col s12 No-margin No-padding Container-center">
                        <div className="Header-text-orange Text-capitalize">{ this.props.transaction.branch.name }</div>
                      </div>
                    </div>
      
                    {/* Transaction Queue Detail */}
                    <div className="col s12 No-padding No-margin Container-center Queue-container-details Padding-10 ">
                      <div className="col s12 No-padding No-margin Container-center Margin-t-16">
                        <p className="No-margin Schedule-text-white animated fadeIn faster">Current Queue No.</p>
                      </div>
                      <div className="col s12 No-padding No-margin Queue-no-box Container-center">
                        <p className="No-margin Schedule-no-white animated fadeIn faster">{ this.props.appointment.currentQueue }</p>
                      </div>
                      <div className="Margin-b-16">
                        <div className="col s12 No-padding No-margin Container-center Margin-b-10">
                          <p className="No-margin Schedule-text-white animated fadeIn faster">Your Queue No. { this.props.transaction.queueNo }</p>
                        </div>
                        {
                          this.props.transaction.status === 'canceled' ?
                          <div className="col s12 No-padding No-margin Container-center">
                            <p className="No-margin Schedule-text-white animated fadeIn faster">The appointment has been canceled.</p>
                          </div>
                          :
                          this.props.transaction.status !== 'canceled' && Number(this.props.appointment.currentQueue) === 0 ?
                          <div className="col s12 No-padding No-margin Container-center">
                            <p className="No-margin Schedule-text-white animated fadeIn faster">The queue hasn't started.</p>
                          </div>
                          :
                          this.props.transaction.status !== 'canceled' && Number(this.props.appointment.currentQueue) ===  Number(this.props.transaction.queueNo) ?
                          <div className="col s12 No-padding No-margin Container-center">
                            <p className="No-margin Schedule-text-white animated fadeIn faster">You're up.</p>
                          </div>
                          :
                          this.props.transaction.status !== 'canceled' && Number(this.props.appointment.currentQueue) >  Number(this.props.transaction.queueNo) ?
                          <div className="col s12 No-padding No-margin Container-center">
                            <p className="No-margin Schedule-text-white animated fadeIn faster">Your appointment has finished.</p>
                          </div>
                          :
                          <div className="col s12 No-padding No-margin Container-center">
                            <p className="No-margin Schedule-text-white animated fadeIn faster">Remaining Queue: { Number(this.props.transaction.queueNo) - Number(this.props.appointment.currentQueue) } person</p>
                          </div>
                        }
                      </div>
                    </div>
          
                    {/* Transaction Code Section */}
                    <div className="col s12 No-padding No-margin Details-content-box Padding-10 Padding-t-20">
                      <div className="col s12 No-margin No-padding Margin-b-16">
                        <div className="col s8 No-margin No-padding">
                          <div className="col s12 No-margin No-padding Margin-b-4">
                            <div className="Content-header-blue">Transaction Code:</div>
                          </div>
                          <div className="col s12 No-margin No-padding">
                            <div className="Content-text-gray Text-uppercase">{ this.props.transaction.id }</div>
                          </div>
                        </div>
                        <div className="col s4 No-margin No-padding Container-end">
                          <TransactionStatusDiv transaction={ this.props.transaction }/>
                        </div>
                      </div>
          
                      {/* Transaction Info Section */}
                      <div className="col s12 No-padding No-margin">
                        <div className="col s12 No-margin No-padding Margin-b-4">
                          <div className="Content-header-blue">Transaction Information:</div>
                        </div>
                        <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                          <div className="col s3 No-margin No-padding">
                            <div className="Content-text-gray ">Name</div>
                          </div>
                          <div className="col s1 No-margin No-padding Container-center">
                            <div className="Content-text-gray">:</div>
                          </div>
                          <div className="col s8 No-margin No-padding">
                            <div className="Content-text-gray Text-capitalize">{ this.props.transaction.name }</div>
                          </div>
                        </div>
                        <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                          <div className="col s3 No-margin No-padding">
                            <div className="Content-text-gray">Email</div>
                          </div>
                          <div className="col s1 No-margin No-padding Container-center">
                            <div className="Content-text-gray">:</div>
                          </div>
                          <div className="col s8 No-margin No-padding">
                            <div className="Content-text-gray">{ this.props.transaction.email }</div>
                          </div>
                        </div>
                        <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                          <div className="col s3 No-margin No-padding">
                            <div className="Content-text-gray">Phone No.</div>
                          </div>
                          <div className="col s1 No-margin No-padding Container-center">
                            <div className="Content-text-gray">:</div>
                          </div>
                          <div className="col s8 No-margin No-padding">
                            <div className="Content-text-gray">{ this.props.transaction.phone }</div>
                          </div>
                        </div>
                        <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                          <div className="col s3 No-margin No-padding">
                            <div className="Content-text-gray">Date</div>
                          </div>
                          <div className="col s1 No-margin No-padding Container-center">
                            <div className="Content-text-gray">:</div>
                          </div>
                          <div className="col s8 No-margin No-padding">
                            <div className="Content-text-gray Text-capitalize">
                              { returnWhatDay(Number(new Date(this.props.appointment.date).getDay())) },
                              &nbsp;{ new Date(this.props.appointment.date).getDate() }
                              &nbsp;{ returnWhatMonth(Number(new Date(this.props.appointment.date).getMonth())) }
                              &nbsp;{ new Date(this.props.appointment.date).getFullYear() }
                            </div>
                          </div>
                        </div>
                        <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                          <div className="col s3 No-margin No-padding">
                            <div className="Content-text-gray">Barber</div>
                          </div>
                          <div className="col s1 No-margin No-padding Container-center">
                            <div className="Content-text-gray">:</div>
                          </div>
                          <div className="col s8 No-margin No-padding">
                            <div className="Content-text-gray Text-capitalize">{ this.props.transaction.staff.name }</div>
                          </div>
                        </div>
                        <div className="col s12 No-margin No-padding Margin-b-16 Container-center-cross">
                          <div className="col s3 No-margin No-padding">
                            <div className="Content-text-gray">Queue No.</div>
                          </div>
                          <div className="col s1 No-margin No-padding Container-center">
                            <div className="Content-text-gray">:</div>
                          </div>
                          <div className="col s8 No-margin No-padding">
                            <div className="Content-text-gray">{ this.props.transaction.queueNo }</div>
                          </div>
                        </div>
          
                        <div className="col s12 No-margin No-padding">
                          <div className="Content-header-blue">Services:</div>
                        </div>
                        {
                          this.props.transaction.service && this.props.transaction.service.map((service, index) => {
                            return (
                              <div className="col s12 No-margin No-padding Container-one-line Margin-b-4" key={ 'service' + index }>
                                <div className="col s1 No-margin No-padding Container-center">
                                  <CheckSvg color="#666666" size="1em" />
                                </div>
                                <div className="col s8 No-margin No-padding Container-center-cross">
                                  <p className="No-margin Confirm-text Text-capitalize">{ service.name }</p>
                                </div>
                                <div className="col s3 No-margin No-padding Container-center-cross Justify-end">
                                  <p className="No-margin Confirm-text">Rp { formatMoney((Number(service.price))) }</p>
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
                            <p className="No-margin Confirm-header">Rp { formatMoney(Number(getTotalTransaction(this.props.transaction.service))) }</p>
                          </div>
                        </div>
          
                      </div>
          
                      {/* Cancel Button */}
                      {
                        this.props.transaction.status === 'booking confirmed' ?
                        <div 
                          className="col s12 No-margin No-padding Cancel-box Container-center" 
                          onClick={ () => this.props.customerCancelTransaction(this.props.transaction, this.props.appointment) }
                        >
                          <div className="Cancel-text">Cancel</div>
                        </div>
                        :
                        <div className="col s12 No-margin No-padding Margin-b-24"></div>
                      }
          
                    </div>
                  </div>
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
    transaction: state.user.transaction,
    transactionExists: state.user.transactionExists,
    transactionLoading: state.user.transactionLoading,
    shop: state.user.shop,
    shopExists: state.user.shopExists,
    shopLoading: state.user.shopLoading,
    branch: state.user.branch,
    branchExists: state.user.branchExists,
    branchLoading: state.user.branchLoading,  
    appointment: state.user.appointment,
    appointmentExists: state.user.appointmentExists,
    appointmentLoading: state.user.appointmentLoading,
    cookies: state.user.cookies,
    authorizationStatus: state.user.authorizationStatus
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCookies,
  customerCancelTransaction
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (transactionDetails);