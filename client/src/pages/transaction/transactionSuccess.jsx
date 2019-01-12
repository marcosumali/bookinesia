import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionCard from '../../components/transaction/transactionCard';
import { setParams } from '../../store/firestore/shop/shop.actions';

class transactionSuccess extends Component {
  componentWillMount () {
    let params = this.props.currentParams
    this.props.setParams(params)
  }
  
  render() {
    return (
      <div>
        <TransactionCard section="" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setParams,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (transactionSuccess);
