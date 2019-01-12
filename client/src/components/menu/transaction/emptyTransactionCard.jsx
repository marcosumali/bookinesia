import React, { Component } from 'react';

import '../../../assets/css/general.css';
import './transaction.css';
import ServiceSvg from '../../svg/serviceSvg';

export default class emptyTransactionCard extends Component {
  render() {
    return (
      <div className="row No-margin Card-container">
        <div className="Card-box Container-center-cross Padding-20">
          <div className="col s12 No-margin No-padding Container-center Margin-b-8">
            <ServiceSvg width="10em" height="10em" color="#000000" />
          </div>
          <div className="col s12 No-margin No-padding Container-center Margin-b-8">
            <div className="Schedule-text-big">No Transactions</div>
          </div>
          <div className="col s12 No-margin No-padding Container-center">
            <div className="Schedule-text Text-center">You don't have any appointment history.</div>
          </div>
        </div>
      </div>
    )
  }
}
