import React, { Component } from 'react'

import '../../../assets/css/general.css';
import './branchDetails.css';
import OpeningHoursContent from './contentHours';
import ServicesContent from './contentServices';
import BarberContent from './contentBarber';
import LocationContent from './contentLocation';

export default class detailsContent extends Component {
  render() {
    // console.log('from content', this.props)
    return (
      <div className="Content-card">
        {/* Purpose of Content Card is to route the exact section with the correct content details from the server */}
        {
          this.props.content === 'Opening Hours' ?
          <OpeningHoursContent />
          :
          this.props.content === 'Services' ?
          <ServicesContent />
          :
          this.props.content === `Barber's Schedule` ?
          <BarberContent />
          :
          this.props.content === 'Location' ?
          <LocationContent />
          :
          <div></div>
        }
      </div>
    )
  }
}
