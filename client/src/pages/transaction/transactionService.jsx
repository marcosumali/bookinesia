import React, { Component } from 'react'

import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import TransactionCard from '../../components/transaction/transactionCard';
import NextButton from '../../components/button/nextButton';

export default class transactionService extends Component {
  render() {
    return (
      <div>
        <ShopHeader />

        <TransactionCard section="Choose Your Services" />

        <br></br>
        <br></br>
        <br></br>

        <div className="Fix-bottom">
          <NextButton text="Continue" />
        </div>

      </div>
    )
  }
}
