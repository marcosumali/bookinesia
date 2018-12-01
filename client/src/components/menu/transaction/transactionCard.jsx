import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import '../../../assets/css/general.css';
import './transaction.css';
import TransactionLoadingCard from './transactionCardLoading';
import { getTransactionShopData, getTransactionBranchData, getTransactionAppointmentData } from '../../../store/firestore/customer/customer.actions';
import { returnWhatDay, returnWhatMonth } from '../../../helpers/date';

class transactionCard extends Component {
  componentWillMount () {
    let transaction = this.props.transaction
    let shopId = transaction.shopId
    let branchId = transaction.branchId
    let appointmentId = transaction.appointmentId
    this.props.getTransactionShopData(shopId)
    this.props.getTransactionBranchData(branchId)
    this.props.getTransactionAppointmentData(appointmentId)
  }

  render() {
    // console.log('from card', this.props)
    return (
      <div>
        {
          this.props.shopLoading || this.props.branchLoading || this.props.appointmentLoading ?
          <TransactionLoadingCard />
          :
          <div className="row No-margin Card-container">
            <div className="Card-box-no-p Container-center-cross">
    
              {/* Transaction Card Header */}
              <div className="Branch-header-container Container-center-cross Padding-10">
                <div className="col s3 Height-100 No-padding No-margin Container-center">
                  <img src={ this.props.shop.logo } className="No-padding Shop-logo animated fadeIn" alt="Shop-logo" />
                </div>
                <div className="col s9 Height-100 No-margin No-padding Container-center">
                  <div className="col s12 No-padding Container-center">
                    <div className="col s12 No-padding No-margin">
                      <p className="No-margin Branch-header-date Text-capitalize animated fadeIn">
                        { returnWhatDay(Number(new Date(this.props.appointment.date).getDay())) },
                        &nbsp;{ new Date(this.props.appointment.date).getDate() }
                        &nbsp;{ returnWhatMonth(Number(new Date(this.props.appointment.date).getMonth())) }
                        &nbsp;{ new Date(this.props.appointment.date).getFullYear() }
                      </p>
                    </div>
                    <div className="col s12 No-padding No-margin">
                      <p className="No-margin Shop-header-name Text-capitalize animated fadeIn">{ this.props.shop.name }</p>
                    </div>
                    <div className="col s12 No-padding No-margin">
                      <p className="No-margin Branch-header-name Text-capitalize animated fadeIn">{ this.props.branch.name }</p>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Transaction Card Detail */}
              <div className="col s12 No-padding No-margin Container-center Queue-container Padding-l-r-10">
                <div className="col s12 No-padding No-margin Container-center">
                  <p className="No-margin Schedule-text animated fadeIn faster">Current Queue No.</p>
                </div>
                <div className="col s12 No-padding No-margin Queue-no-box Container-center">
                  <p className="No-margin Schedule-no animated fadeIn faster">{ this.props.appointment.currentQueue }</p>
                </div>
                <div className="col s12 No-padding No-margin Container-center Margin-b-10">
                  <p className="No-margin Schedule-text animated fadeIn faster">Your Queue No. { this.props.transaction.queueNo }</p>
                </div>
                <div className="col s12 No-padding No-margin Container-center Margin-b-16">
                  <p className="No-margin Schedule-text animated fadeIn faster">Remaining Queue: { Number(this.props.transaction.queueNo) - Number(this.props.appointment.currentQueue) } person</p>
                </div>
              </div>
    
              {/* Transaction Details Button */}
              <Link to={ `/transaction/details/${this.props.transaction.id}` } style={{ width: '100%' }} >
                <div className="Button-details-box Container-center">
                    <div className="Schedule-text-white">Transaction Details</div>
                </div>
              </Link>
    
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shop: state.user.shop,
    shopExists: state.user.shopExists,
    shopLoading: state.user.shopLoading,
    branch: state.user.branch,
    branchExists: state.user.branchExists,
    branchLoading: state.user.branchLoading,  
    appointment: state.user.appointment,
    appointmentExists: state.user.appointmentExists,
    appointmentLoading: state.user.appointmentLoading,  
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getTransactionShopData, 
  getTransactionBranchData,
  getTransactionAppointmentData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (transactionCard);

