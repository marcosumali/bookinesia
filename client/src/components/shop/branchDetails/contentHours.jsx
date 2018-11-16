import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../assets/css/general.css';
import './branchDetails.css';
import { getBranchScheduleData } from '../../../store/firestore/shop/shop.actions';

class contentHours extends Component {
  constructor() {
    super()
    this.state = {
      loadingBox: [0, 1, 2, 3, 4, 5, 6]
    }
  }

  componentWillMount() {
    let shopName = this.props.params.shopName
    let branchName = this.props.params.branchName
    this.props.getBranchScheduleData(shopName, branchName)
  }

  render() {
    // console.log('from content hours', this.props)
    return (
      <div className="col s12 Card-content-m-28">
        {
          this.props.branchScheduleLoading ?
          <div>
            {
              this.state.loadingBox.map((num, index) => {
                return (
                  <div className="col s12 Margin-t-b-4 Hours-loading" key={ 'loading' + index }></div>
                )
              })
            }
          </div>
          :
          <div>
            {
              this.props.branchSchedule && this.props.branchSchedule.map((schedule, index) => {
                return (
                  <div className="col s12 Margin-t-b-4" key={ 'schedule' + index }>
                    <div className="row No-margin Container-one-line animated fadeIn">
                      <p className="col s5 No-padding Card-text No-margin Text-capitalize">{ schedule.day }</p>
                      <p className="col s2 No-padding Card-text No-margin Text-center">{ schedule.openHours }.{ schedule.openMinutes }</p>
                      <p className="col s1 No-padding Card-text No-margin Text-center">-</p>
                      <p className="col s2 No-padding Card-text No-margin Text-center">{ schedule.closeHours }.{ schedule.closeMinutes }</p>
                      <p className="col s2 No-padding Card-text No-margin Text-center Text-uppercase">{ this.props.branch.timezone }</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
    
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    params: state.shop.params,
    branch: state.shop.branch,
    branchSchedule: state.shop.branchSchedule,
    branchScheduleExists: state.shop.branchScheduleExists,
    branchScheduleLoading: state.shop.branchScheduleLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getBranchScheduleData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (contentHours);


