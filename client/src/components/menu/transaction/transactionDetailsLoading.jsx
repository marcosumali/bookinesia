import React, { Component } from 'react'

import '../../../assets/css/general.css';
import './transaction.css';

export default class transactionDetailsLoading extends Component {
  render() {
    return (
      <div className="row No-margin No-padding Details-box">
          <div className="Details-content-box">

            {/* Detail Header */}
            <div className="Details-header-box Padding-10 Container-center Margin-b-10">
              <div className="col s12 No-margin No-padding Container-center Margin-b-4">
                <div className="Loading-box-name"></div>
              </div>
              <div className="col s12 No-margin No-padding Container-center">
                <div className="Loading-box-category"></div>
              </div>
            </div>

            {/* Transaction Queue Detail */}
            <div className="col s12 No-padding No-margin Container-center Queue-container Padding-l-r-10">
              <div className="col s12 No-padding No-margin Container-center Margin-b-8">
                <p className="No-margin Input-loading"></p>
              </div>
              <div className="col s12 No-padding No-margin Queue-no-box Container-center Margin-b-8">
                <p className="No-margin QueueNo-loading"></p>
              </div>
              <div className="col s12 No-padding No-margin Container-center Margin-b-10">
                <p className="No-margin Input-loading"></p>
              </div>
              <div className="col s12 No-padding No-margin Container-center Margin-b-16">
                <p className="No-margin Input-loading"></p>
              </div>
            </div>

            {/* Transaction Code Section */}
            <div className="Details-content-box Padding-10">
              <div className="row No-margin No-padding Margin-b-16">
                <div className="col s8 No-margin No-padding">
                  <div className="col s12 No-margin No-padding Margin-b-4">
                    <div className="Content-header-blue">Transaction Code:</div>
                  </div>
                  <div className="col s12 No-margin No-padding">
                    <p className="No-margin Input-loading"></p>
                  </div>
                </div>
                <div className="col s4 No-margin No-padding Container-end">
                  <p className="No-margin Input-loading"></p>
                </div>
              </div>

              {/* Transaction Info Section */}
              <div className="row No-margin No-padding">
                <div className="col s12 No-margin No-padding Margin-b-4">
                  <div className="Content-header-blue">Transaction Information:</div>
                </div>
                <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                  <div className="col s3 No-margin No-padding">
                    <div className="Content-text-gray ">Name</div>
                  </div>
                  <div className="col s1 No-margin No-padding Container-center">
                    <div className="Content-text-gray">:</div>
                  </div>
                  <div className="col s8 No-margin No-padding">
                    <p className="No-margin Input-loading"></p>
                  </div>
                </div>
                <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                  <div className="col s3 No-margin No-padding">
                    <div className="Content-text-gray">Email</div>
                  </div>
                  <div className="col s1 No-margin No-padding Container-center">
                    <div className="Content-text-gray">:</div>
                  </div>
                  <div className="col s8 No-margin No-padding">
                    <p className="No-margin Input-loading"></p>
                  </div>
                </div>
                <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                  <div className="col s3 No-margin No-padding">
                    <div className="Content-text-gray">Phone No.</div>
                  </div>
                  <div className="col s1 No-margin No-padding Container-center">
                    <div className="Content-text-gray">:</div>
                  </div>
                  <div className="col s8 No-margin No-padding">
                    <p className="No-margin Input-loading"></p>
                  </div>
                </div>
                <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                  <div className="col s3 No-margin No-padding">
                    <div className="Content-text-gray">Barber</div>
                  </div>
                  <div className="col s1 No-margin No-padding Container-center">
                    <div className="Content-text-gray">:</div>
                  </div>
                  <div className="col s8 No-margin No-padding">
                    <p className="No-margin Input-loading"></p>
                  </div>
                </div>
                <div className="col s12 No-margin No-padding Margin-b-4 Container-center-cross">
                  <div className="col s3 No-margin No-padding">
                    <div className="Content-text-gray">Date</div>
                  </div>
                  <div className="col s1 No-margin No-padding Container-center">
                    <div className="Content-text-gray">:</div>
                  </div>
                  <div className="col s8 No-margin No-padding">
                    <div className="Content-text-gray">
                      <p className="No-margin Input-loading"></p>
                    </div>
                  </div>
                </div>
                <div className="col s12 No-margin No-padding Margin-b-16 Container-center-cross">
                  <div className="col s3 No-margin No-padding">
                    <div className="Content-text-gray">Queue No.</div>
                  </div>
                  <div className="col s1 No-margin No-padding Container-center">
                    <div className="Content-text-gray">:</div>
                  </div>
                  <div className="col s8 No-margin No-padding">
                    <p className="No-margin Input-loading"></p>
                  </div>
                </div>

                <div className="col s12 No-margin No-padding">
                  <div className="Content-header-blue">Services:</div>
                </div>
            
                <div className="col s12 No-margin No-padding Container-one-line Margin-b-4">
                  <p className="No-margin Input-loading"></p>
                </div>

                <div className="col s12 No-margin No-padding Container-one-line">
                  <p className="No-margin Input-loading"></p>
                </div>

              </div>

              {/* Cancel Button */}
              <div className="Cancel-box Container-center" style={{ height: '2em' }}>
              </div>

            </div>
          </div>
        </div>
    )
  }
}
