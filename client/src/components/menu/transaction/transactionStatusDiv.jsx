import React, { Component } from 'react';

import '../../../assets/css/general.css';
import './transaction.css';

export default class transactionStatusDiv extends Component {
  render() {
    return (
      <div className="col s12 No-margin No-padding Container-end">
        {
          this.props.transaction.status === 'booking confirmed' || this.props.transaction.status === 'on progress' ?
          <div className="Status-box-progress">
            <div className="Status-text">Confirmed</div>
          </div>
          :
          this.props.transaction.status === 'finished' ?
          <div className="Status-box-complete">
            <div className="Status-text">Finished</div>
          </div>
          :
          this.props.transaction.status === 'canceled' ?
          <div className="Status-box-cancel">
            <div className="Status-text">Canceled</div>
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}
