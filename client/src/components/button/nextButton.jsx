import React, { Component } from 'react'

import '../../assets/css/general.css';

export default class nextButton extends Component {
  render() {
    return (
      <div className="Next-button Container-center">
        <p className="Next-text">{ this.props.text }</p>
      </div>
    )
  }
}
