import React, { Component } from 'react'

export default class previousArrowSvg extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/>
        <path fill={ this.props.color } d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"/>
      </svg>
    )
  }
}
