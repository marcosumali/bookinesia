import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../assets/css/general.css';
import './transaction.css';
import CashRegisterSvg from '../svg/cashRegisterSvg';
import { handleCookies } from '../../store/firestore/customer/customer.actions';
import { getTransaction } from '../../store/firestore/transaction/transaction.actions';
import { formatMoney, getTotalTransaction } from '../../helpers/currency';

class successDetails extends Component {
  componentWillMount () {
    let params = this.props.params
    let transactionId = params.transactionId
    this.props.handleCookies('handle authorization success', this.props.cookies, transactionId)
  }

  render() {
    return (
      <div>
        {
          this.props.authorizationStatus ?
          <div className="row No-margin Margin-b-10">
            <div className="col s12 No-margin No-padding Thanks-container Container-center Margin-b-10">
              <p className="No-margin Thanks-text Padding-t-b-8">Thank you !</p>
            </div>
            <div className="col s12 No-margin No-padding Container-center">
              <p className="No-margin Card-text">Your booking has been confirmed.</p>
            </div>
            <div className="col s12 No-margin No-padding Container-center Margin-t-b-16">
              <div className="No-margin No-padding Margin-r-10">
                <CashRegisterSvg color="#5499c3" size="4em" />
              </div>
              <div className="No-margin No-padding">
                <p className="No-margin Confirm-text-blue Margin-b-4">Your Transaction Code:</p>
                <p className="No-margin Confirm-text Margin-b-4">{ this.props.params.transactionId.toUpperCase() }</p>
                {
                  this.props.transaction !== '' ?
                  <div className="animated fadeIn faster">
                    <p className="No-margin Confirm-text-blue Margin-b-4">Transaction Amount:</p>
                    <p className="No-margin Confirm-text">Rp { formatMoney(getTotalTransaction(this.props.transaction.service)) }</p>
                  </div>
                  :
                  <div></div>
                }
              </div>
            </div>
            <div className="col s12 No-margin No-padding Container-center Padding-l-b-r-20">
              <p className="No-margin Confirm-text Text-justify">You can always check your live transaction queue number in your transaction history section.</p>
            </div>
          </div>
          :
          <Redirect to="/" />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    params: state.shop.params,
    transaction: state.cart.transaction,
    cookies: state.user.cookies,
    authorizationStatus: state.user.authorizationStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getTransaction,
  handleCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (successDetails);
