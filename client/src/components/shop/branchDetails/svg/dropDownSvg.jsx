import React, { Component } from 'react'

import '../branchDetails.css';
import '../../../../assets/css/general.css';

export default class dropDownSvg extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }} >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <path d="M7 10l5 5 5-5z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </div>
    )
  }
}
