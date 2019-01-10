import React, { Component } from 'react'

import '../../../assets/css/general.css';
import './transaction.css';

export default class transactionLoadingCard extends Component {
  render() {
    return (
      <div className="row No-margin Card-container">
        <div className="Card-box-no-p Container-center-cross">

          {/* Transaction Card Header */}
          <div className="Branch-header-container Container-center-cross Padding-10">
            <div className="col s3 Height-100 No-padding No-margin Container-center">
              <div className="Loading-square-64"></div>
            </div>
            <div className="col s9 Height-100 No-margin No-padding Container-center">
              <div className="col s12 No-padding Container-center">
                <div className="col s12 No-padding No-margin Margin-b-4">
                  <div className="Loading-box-category"></div>
                </div>
                <div className="col s12 No-padding No-margin Margin-b-4">
                  <div className="Loading-box-name"></div>
                </div>
                <div className="col s12 No-padding No-margin Margin-b-4">
                  <div className="Loading-box-category"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="Branch-header-container Container-center-cross Padding-10">
            <div className="col s3 Height-100 No-padding No-margin Container-center">
              <div className="Loading-circle-64"></div>
            </div>
            <div className="col s9 Height-100 No-margin No-padding Container-center">
              <div className="col s12 No-padding Container-center" style={{ justifyContent: 'space-between' }}>
                <div className="col s7 No-padding No-margin Margin-b-4" style={{ marginRight: '0px' }}>
                  <div className="Loading-box-category"></div>
                </div>
                <div className="col s4 No-padding No-margin Margin-b-4">
                  <div className="Loading-box-status"></div>
                </div>
                <div className="col s12 No-padding No-margin Margin-b-4">
                  <div className="Loading-box-name"></div>
                </div>
                <div className="col s12 No-padding No-margin Margin-b-4">
                  <div className="Loading-box-category"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details Button */}
          <div className="Button-details-box-loading Container-center">
          </div>
          
        </div>
      </div>
    )
  }
}
