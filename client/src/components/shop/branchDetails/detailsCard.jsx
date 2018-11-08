import React, { Component } from 'react'

import '../../../assets/css/general.css';
import './branchDetails.css';
import ContentCard from './contentCard';
import TimeSvg from './svg/timeSvg';
import ServiceSvg from './svg/serviceSvg';
import FaceSvg from './svg/faceSvg';
import LocationSvg from './svg/locationSvg';

export default class detailsCard extends Component {
  render() {
    console.log('from card', this.props);
    return (
      <div className="Card-container">
        <div className="col s12 Card-box">
          {/* Card Header - Svg and Name */}
          <div className="col s12 Container-one-line Margin-b-8">
            {
            this.props.section === 'Opening Hours' ?
              <TimeSvg />
              :
              this.props.section === 'Services' ?
              <ServiceSvg />
              :
              this.props.section === `Barber's Schedule` ?
              <FaceSvg />
              :
              this.props.section === 'Location' ?
              <LocationSvg />
              :
              <div></div>
            }
            <p className="Card-header No-margin">{ this.props.section }</p>
          </div>
          
          {/* Content Details */}
          <ContentCard content={ this.props.section } />

        </div>
      </div>
    )
  }
}
