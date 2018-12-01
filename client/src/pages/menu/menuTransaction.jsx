import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionCard from '../../components/menu/transaction/transactionCard';
import TransactionLoadingCard from '../../components/menu/transaction/transactionCardLoading';
import { handleCookies } from '../../store/firestore/customer/customer.actions';

class menuTransaction extends Component {
  componentWillMount () {
    this.props.handleCookies('get transactions', this.props.cookies)
  }

  render() {
    // console.log('from menu transactions', this.props)
    return (
      <div>
        {
          this.props.transactionsLoading ?
          <TransactionLoadingCard />
          :
          <div>
            {
              this.props.transactions && this.props.transactions.map((transaction, index) => {
                return (
                  <TransactionCard transaction={ transaction } key={ 'transaction' + index }/>
                )
              })
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: state.user.cookies,
    transactions: state.user.transactions,
    transactionsExists: state.user.transactionsExists,
    transactionsLoading: state.user.transactionsLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (menuTransaction);
