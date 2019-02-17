import React, { Component } from 'react';

export default class locationEmbedMap extends Component {
  render() {
    // Below are width and height settings to match with size of browser's window
    const innerWidth = window.innerWidth
    const setWidth = innerWidth - 40
    const setHeight = setWidth / 3 * 2
    let { branch } = this.props
    return (
      <iframe 
        title="Map"
        src={ branch.iframeUrl } 
        width={ setWidth } 
        height={ setHeight }
        frameborder="0" 
        style={{ border: 0 }} 
        allowfullscreen
      />
    )
  }
}
