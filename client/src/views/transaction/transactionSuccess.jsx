import React, { Component } from 'react'

import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import TransactionCard from '../../components/transaction/transactionCard';

export default class transactionSuccess extends Component {
  render() {
    return (
      <div>
        <ShopHeader />

        <TransactionCard section="" />
      </div>
    )
  }
}
