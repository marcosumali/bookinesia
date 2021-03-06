import React, { Component } from 'react'

import '../../assets/css/general.css';
import './transaction.css';
import ServiceSvg from  '../svg/serviceSvg';
import FaceSvg from  '../svg/faceSvg';
import ShoppingCartSvg from '../svg/shoppingCartSvg';
import TransactionDetails from './transactionDetails';

export default class transactionCard extends Component {
  render() {
    return (
      <div className="row No-margin No-padding">
        <div className="col s12 m8 offset-m2 l4 offset-l4 Card-container">
          <div className="col s12 No-padding Card-box-no-p">
          
            {/* Card Header - Svg and Name */}
            <div className="col s12 No-padding Container-one-line Margin-10">
              {
              this.props.section === 'Choose Your Services' ?
                <ServiceSvg height="1.5em" width="1.5em" color="#5499c3"/>
                :
                this.props.section === `Choose Your Provider & Schedule` ?
                <FaceSvg height="1.5em" width="1.5em" color="#5499c3"/>
                :
                this.props.section === `Transaction Details` ?
                <ShoppingCartSvg color="#5499c3" width="24" height="24" />
                :
                <div></div>
              }
              <p className="Card-header No-margin">{ this.props.section }</p>
            </div>
            
            {/* Content Details */}
            <TransactionDetails content={ this.props.section } />

          </div>
        </div>
      </div>
    )
  }
}
