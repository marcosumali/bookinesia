import React, { Component } from 'react';

import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import TransactionCard from '../../components/transaction/transactionCard';
import NextButton from '../../components/button/nextButton';

export default class transactionConfirm extends Component {
  render() {
    return (
      <div>
        <ShopHeader />

        <TransactionCard section="Transaction Details" />

        <br></br>
        <br></br>
        <br></br>

        <div className="Fix-bottom">
          <NextButton text="Confirm and Book" />
        </div>
        
      </div>
    )
  }
}
