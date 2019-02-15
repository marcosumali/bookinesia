import React, { Component } from 'react';

import CalenderSvg from '../svg/calendarSvg';
import NoPhoneSvg from '../svg/noPhoneSvg';
import HourGlassSvg from '../svg/hourGlassSvg';
import BellSvg from '../svg/bellSvg';

export default class homeFeatures extends Component {
  render() {
    return (
      <div>
        <div className="col s12 m12 No-margin Feature-box Feature-upper-box No-padding Container-wrap-center-cross">
          <div className="col s12 m4 No-margin No-padding Container-wrap-center">
            <CalenderSvg height="9em" width="9em" />
          </div>
          <div className="col s12 m7 No-margin No-padding Container-wrap-center-cross">
            <div className="col s12 m12 Feature-header-box">
              <div className="Feature-header-text">Online Booking</div>
            </div>
            <div className="col s12 m12 Feature-text-box">
              <div className="Feature-text">Book an appointment online anywhere and anytime as you pleased. No more frustrating experience to book an appointment at your favourite service provider.</div>
            </div>
          </div>
        </div>

        <div className="col s12 m12 No-margin Feature-box No-padding Container-wrap-center-cross">
          <div className="col s12 m4 No-margin No-padding Container-wrap-center">
            <NoPhoneSvg height="9em" width="9em" />
          </div>
          <div className="col s12 m7 No-margin No-padding Container-wrap-center-cross">
            <div className="col s12 m12 Feature-header-box">
              <div className="Feature-header-text">Speedy System</div>
            </div>
            <div className="col s12 m12 Feature-text-box">
              <div className="Feature-text">No registration are required to place a booking at your favourite service provider. Don't worry, we still keep track your transaction.</div>
            </div>
          </div>
        </div>

        <div className="col s12 m12 No-margin Feature-box No-padding Container-wrap-center-cross">
          <div className="col s12 m4 No-margin No-padding Container-wrap-center">
            <HourGlassSvg height="9em" width="9em" />
          </div>
          <div className="col s12 m7 No-margin No-padding Container-wrap-center-cross">
            <div className="col s12 m12 Feature-header-box">
              <div className="Feature-header-text">Real Time Queuing</div>
            </div>
            <div className="col s12 m12 Feature-text-box">
              <div className="Feature-text">You can monitor your queuing number in the transaction menu so you can make the most of your time doing something more important than waiting in the couch.</div>
            </div>
          </div>
        </div>

        <div className="col s12 m12 No-margin Feature-box Feature-bottom-box No-padding Container-wrap-center-cross">
          <div className="col s12 m4 No-margin No-padding Container-wrap-center">
            <BellSvg height="9em" width="9em" />
          </div>
          <div className="col s12 m7 No-margin No-padding Container-wrap-center-cross">
            <div className="col s12 m12 Feature-header-box">
              <div className="Feature-header-text">Automatic Notifications</div>
            </div>
            <div className="col s12 m12 Feature-text-box">
              <div className="Feature-text">We will send notifications to remind you about your appointment with your favourite service provider so you can arrive on time.</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
