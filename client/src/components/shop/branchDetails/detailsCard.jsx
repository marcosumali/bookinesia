import React, { Component } from 'react'

import '../../../assets/css/general.css';
import './branchDetails.css';
import ContentCard from './contentCard';
import TimeSvg from '../../svg/timeSvg';
import ServiceSvg from '../../svg/serviceSvg';
import FaceSvg from '../../svg/faceSvg';
import LocationSvg from '../../svg/locationSvg';

export default class detailsCard extends Component {
  render() {
    return (
      <div className="col s12 Card-container Margin-b-24">
        <div className="col s12 Card-box Padding-10">
          {/* Card Header - Svg and Name */}
          <div className="col s12 Container-one-line Margin-b-8">
            {
            this.props.section === 'Opening Hours' ?
              <TimeSvg height="1.5em" width="1.5em" color="#5499c3" />
              :
              this.props.section === 'Services' ?
              <ServiceSvg height="1.5em" width="1.5em" color="#5499c3" />
              :
              this.props.section === `Barber's Schedule` ?
              <FaceSvg height="1.5em" width="1.5em" color="#5499c3" />
              :
              this.props.section === 'Location' ?
              <LocationSvg height="1.5em" width="1.5em" color="#5499c3" />
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
