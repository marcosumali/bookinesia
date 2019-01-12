import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BranchHeader from '../components/shop/branchHeader/branchHeader';
import BranchDetailsPage from '../pages/shop/branchDetails';
import TransactionServicePage from '../pages/transaction/transactionService';
import TransactionBarberPage from '../pages/transaction/transactionBarber';
import TransactionConfirmPage from '../pages/transaction/transactionConfirm';
import { setParams } from '../store/firestore/shop/shop.actions';
import { setCookies, setWindow } from '../store/firestore/customer/customer.actions';

class branchHeaderPage extends Component {
  componentWillMount() {
    let params = this.props.match.params
    this.props.setParams(params)
    let cookiesFunction = this.props.cookies
    this.props.setCookies(cookiesFunction)
    this.props.setWindow(window)
  }

  render() {
    return (
      <div>
        <BranchHeader history={ this.props.history } />
        {
          this.props.match.path === '/detail/:shopName/:branchName' ?
          <BranchDetailsPage currentParams={ this.props.match.params } />
          :
          this.props.match.path === '/book/now/:shopName/:branchName' ?
          <TransactionServicePage currentParams={ this.props.match.params } history={ this.props.history } />
          :
          this.props.match.path === '/book/service/:shopName/:branchName/:services' ?
          <TransactionBarberPage currentParams={ this.props.match.params } />
          :
          this.props.match.path === '/book/confirm/:shopName/:branchName/service/:services/provider/:provider/date/:date' ?
          <TransactionConfirmPage currentParams={ this.props.match.params } history={ this.props.history } />
          :
          <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setParams,
  setCookies,
  setWindow
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (branchHeaderPage);