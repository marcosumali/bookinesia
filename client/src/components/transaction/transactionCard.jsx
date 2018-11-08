import React, { Component } from 'react'

import '../../assets/css/general.css';
import './transaction.css';
import ServiceSvg from  '../svg/serviceSvg';
import FaceSvg from  '../svg/faceSvg';

export default class transactionCard extends Component {
  render() {
    return (
      <div className="Card-container">
        <div className="col s12 Card-box">
          {/* Card Header - Svg and Name */}
          <div className="col s12 Container-one-line Margin-b-8">
            {
            this.props.section === 'Choose Your Services' ?
              <ServiceSvg />
              :
              this.props.section === `Barber's Schedule` ?
              <FaceSvg />
              :
              <div></div>
            }
            <p className="Card-header No-margin">{ this.props.section }</p>
          </div>
          
          {/* Content Details */}
          {/* <ContentCard content={ this.props.section } /> */}

        </div>
      </div>
    )
  }
}
