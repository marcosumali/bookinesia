import React, { Component } from 'react'

import '../../../assets/css/general.css';
import './branchDetails.css';

export default class contentLocation extends Component {
  render() {
    return (
      <div className="row No-margin No-padding">
        <div className="col s12 No-padding">
          <img className="Location-img" src={ process.env.PUBLIC_URL + '/assets/img/dummy/googlemap.png' } alt="location"/>
        </div>
        <div className="col s12 No-padding">
          <p className="Card-text No-margin" style={{ fontSize: '12px' }}>Jl. Tg. Duren Raya Lama No.823, RT.1/RW.2, Tj. Duren Sel, Grogol petamburan</p>
        </div>
      </div>
    )
  }
}
