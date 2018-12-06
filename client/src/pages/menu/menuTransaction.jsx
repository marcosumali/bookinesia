import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import TransactionCard from '../../components/menu/transaction/transactionCard';
import TransactionLoadingCard from '../../components/menu/transaction/transactionCardLoading';
import EmptyTransactionCard from '../../components/menu/transaction/emptyTransactionCard';
import TransactionHeader from '../../components/menu/transaction/transactionHeader';
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
          this.props.authenticationStatus ?
          <div>
            <TransactionHeader />
            <div>
              {
                this.props.transactionsLoading ?
                <TransactionLoadingCard />
                :
                this.props.transactions.length > 0 ?
                <div>
                  {
                    this.props.transactions && this.props.transactions.map((transaction, index) => {
                      return (
                        <TransactionCard transaction={ transaction } key={ 'transaction' + index }/>
                      )
                    })
                  }
                </div>
                :
                <EmptyTransactionCard />
              }
            </div>
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
    cookies: state.user.cookies,
    transactions: state.user.transactions,
    transactionsExists: state.user.transactionsExists,
    transactionsLoading: state.user.transactionsLoading,
    authenticationStatus: state.user.authenticationStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (menuTransaction);
