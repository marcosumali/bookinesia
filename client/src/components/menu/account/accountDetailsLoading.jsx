import React, { Component } from 'react'

import './account.css';

export default class accountDetailsLoading extends Component {
  render() {
    return (
      <div className="row No-margin Details-content-box Padding-10">
        {/* Header Section */}
        <div className="col s12 No-margin No-padding Padding-10 Container-center Margin-b-10">
          <div className="col s3 No-margin No-padding Container-center">
            <div className="Loading-circle-64"></div>
          </div>
          <div className="col s9 No-margin No-padding">
            <div className="col s12 No-margin No-padding Margin-b-8">
              <div className="Input-loading"></div>
            </div>
            <div className="col s12 No-margin No-padding">
              <div className="Input-loading"></div>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="col s12 No-margin No-padding Padding-10 Info-box Margin-b-24">
          <div className="col s12 No-margin No-padding Margin-b-4">
            <div className="Input-loading"></div>
          </div>
          <div className="col s12 No-margin No-padding Margin-b-4">
            <div className="Input-loading"></div>
          </div>
          <div className="col s12 No-margin No-padding Margin-b-4">
            <div className="Input-loading"></div>
          </div>
          <div className="col s12 No-margin No-padding">
            <div className="Input-loading"></div>
          </div>
        </div>

        {/* Change Password Button */}
        <div className="col s12 No-margin No-padding Margin-b-16 Container-center">
          <div className="Input-loading"></div>
        </div>
        
        <div className="col s12 No-margin No-padding Margin-b-24 Container-center">
          <div className="Input-loading"></div>
        </div>

      </div>
    )
  }
}
