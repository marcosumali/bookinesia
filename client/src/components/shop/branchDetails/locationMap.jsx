import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class locationMap extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  onMarkerClick(props, marker, e) {
  }

  render() {
    return (
      <a href={ `https://www.google.com/maps/place/${this.props.branch.latitude},${this.props.branch.longitude}` } target="_blank" rel="noopener noreferrer">
        <Map
          // Classname size-inherit is to remove google map npm settings of height and width to 100%
          className="Size-inherit"
          google={this.props.google}
          style={mapStyles}
          initialCenter={{
            lat: Number(this.props.branch.latitude),
            lng: Number(this.props.branch.longitude)
          }}
          center={{
            lat: Number(this.props.branch.latitude),
            lng: Number(this.props.branch.longitude)
          }}
          zoom={15}>
          
          <Marker 
            onClick={this.onMarkerClick} 
            position={{ lat: Number(this.props.branch.latitude), lng: Number(this.props.branch.longitude) }}     
            name={'Shop Location'} />

        </Map>
      </a>
    )
  }
}

// Below are width and height settings to match with size of browser's window
const innerWidth = window.innerWidth
const setWidth = innerWidth - 40
const setHeight = setWidth / 3 * 2
const mapStyles = {}

mapStyles['width'] = `${setWidth}px`
mapStyles['height'] = `${setHeight}px`

// Loading container section
const loadingStyles = {
  backgroundColor: `#EAEAEA`,
  width: `${setWidth}px`,
  height: `${setHeight}px`
}
const LoadingContainer = (props) => (
  <div style={ loadingStyles }></div>
)

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCYTTfeSqvEH4PrN3_7zKr5TIa509fkcTE'),
  LoadingContainer: LoadingContainer
})(locationMap)