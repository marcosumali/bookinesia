import React, { Component } from 'react'

import Barber from '../../assets/data/dummy/barber';
import '../../assets/css/general.css';
import './transaction.css';
import PreviousArrowSvg from '../svg/arrowPreviousSvg';
import NextArrowSvg from '../svg/arrowNextSvg';

export default class detailBarbers extends Component {
  constructor() {
    super()
    this.state = {
      dataBarber: Barber
    }
  }

  render() {
    return (
      <div className="row No-margin">
        {/* Barber Picture Section */}
        <div className="col s12 No-padding No-margin Container-center Padding-l-r-10">
          {
            this.state.dataBarber.map((barber, index) => {
              return (
                <div className="Barber-img-box Padding-r-4 Container-one-line" key={ 'barber' + index }>
                  <img className="Circle-img-56" src={ process.env.PUBLIC_URL +  barber.picture } alt="barber" />
                </div>
              )
            })
          }
        </div>

        {/* Barber Name Section */}
        <div className="col s12 No-padding No-margin Container-center Padding-l-r-10">
          <p className="No-margin Barber-name Margin-t-b-10">Name</p>
        </div>
        
        {/* Schedule Date Section */}
        <div className="col s12 No-padding No-margin Date-container Container-center-cross">
          <div className="col s1 No-padding No-margin Previous-arrow-box Container-center-cross">
            <PreviousArrowSvg color="#ffffff"/>
          </div>
          <div className="col s10 No-padding No-margin Date-box Container-center">
            <p className="No-margin Schedule-date">Date</p>
          </div>
          <div className="col s1 No-padding No-margin Next-arrow-box Container-center-cross">
            <NextArrowSvg color="#ffffff" />
          </div>
        </div>
        
        {/* Queue Schedule Section */}
        <div className="col s12 No-padding No-margin Container-center Queue-container Padding-l-r-10">
          <div className="col s12 No-padding No-margin Schedule-today-box Container-center Margin-t-b-10">
            <p className="No-margin Schedule-text">Schedule: 10.00 - 22.00 WIB</p>
          </div>
          <div className="col s12 No-padding No-margin Container-center Margin-b-10">
            <p className="No-margin Schedule-text">Your Queue No.</p>
          </div>
          <div className="col s12 No-padding No-margin Queue-no-box Container-center Margin-b-10">
            <p className="No-margin Schedule-no">3</p>
          </div>
          <div className="col s12 No-padding No-margin Container-center Margin-b-24">
            <p className="No-margin Schedule-text">You're waiting in line for 2 person</p>
          </div>
        </div>
        
      </div>
    )
  }
}
