import React, { Component } from 'react';

import AccountCircleSvg from '../../svg/accountCircleSvg';

export default class accountSettingsLoading extends Component {
  render() {
    return (
      <div className="row No-margin">
        <div>
          <div>
            {/* Picture Section */}
            <div className="col s12 No-margin No-padding Container-center Margin-t-16">
              <AccountCircleSvg width="5em" height="5em" color="#ffffff" />
            </div>
            
            {/* Form Section */}
            <form className="col s12 m8 offset-m2 l4 offset-l4">
              <div className="col s12 No-margin No-padding Margin-t-16 Form-box-white Padding-10 Padding-t-24">
                {/* Name Input */}
                <div className="input-field Margin-b-16">
                  <div className="Input-loading" style={{ height: '2em' }}></div>
                </div>
      
                {/* Phone Input */}
                <div className="input-field Margin-b-16">
                  <div className="Input-loading" style={{ height: '2em' }}></div>
                </div>

                {/* Email Input */}
                <div className="input-field Margin-b-16">
                  <div className="Input-loading" style={{ height: '2em' }}></div>
                </div>

                <div className="Text-justify Grey-text-small">Please input your password to authorise the changes.</div>
                {/* Password Input */}
                <div className="input-field Margin-b-16">
                  <div className="Input-loading" style={{ height: '2em' }}></div>
                </div>

                {/* Save Button */}
                <div className="Margin-b-24">
                  <div className="Input-loading" style={{ height: '2.5em' }}></div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}