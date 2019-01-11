import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DropDownSvg from '../../svg/dropDownSvg';
import DropUpSvg from '../../svg/dropUpSvg';
import '../../../assets/css/general.css';
import './branchDetails.css';
import { getStaffsData } from '../../../store/firestore/shop/shop.actions';

class contentBarber extends Component {
  constructor() {
    super()
    this.state = {
      barbers: [],
      loadingBox: [0, 1, 2, 3, 4]
    }

  }

  handleData = () => {
    this.props.staffs && this.props.staffs.map((staff) => {
      this.createState(staff)
      return '';
    })
  }
  
  createState (staff) {
    this.state.barbers.push(staff)
  }

  showSchedule(index) {
    let barber = this.state.barbers[index] 
    let barbers = this.state.barbers
    if (barber.showStatus === false) {
      barbers.splice(index, 1, {
        ...barber,
        showStatus: true
      })
      this.setState({
        'barbers': barbers
      })
    } else {
      barbers.splice(index, 1, {
        ...barber,
        showStatus: false
      })
      this.setState({
        'barbers': barbers
      })
    }
  }

  componentWillMount() {
    let shopName = this.props.params.shopName
    let branchName = this.props.params.branchName
    this.props.getStaffsData(shopName, branchName)
  }
  
  render() {
    // console.log('state from content barber', this.state)
    // console.log('props from content barber', this.props)

    // To handle data during first rendering from redux state to local state to manage showStatus
    if (this.state.barbers.length === 0) {
      this.handleData()
    }

    return (
      <div className="row No-margin Card-content-m-10">
        {
          this.props.staffsLoading ?
          <div>
            {
              this.state.loadingBox.map((num, index) => {
                return (
                  <div className="col s12 No-padding Container-one-line-only Margin-t-b-4 Padding-b-4" style={{ borderBottom: '1px solid #EAEAEA' }} key={ 'loading' + index }>
                    <div className="Barber-img-box col s3 No-margin No-padding Container-center-axis">
                      <div className="Loading-circle-56"></div>
                    </div>
                    <div className="Barber-name-box col s8 No-margin No-padding Margin-t-15">
                      <div className="Barbers-name-loading"></div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          :
          <div>
            {
              this.state.barbers && this.state.barbers.map((barber, index) => {
                return (
                  <div className="col s12 No-padding Container-one-line-only Margin-t-b-4 Padding-b-4 animated fadeIn" style={{ borderBottom: '1px solid #EAEAEA' }} key={ 'staff' + index } onClick={ () => this.showSchedule(index) }>
                    <div className="Barber-img-box col s3 No-margin No-padding Container-center-axis">
                      <img className="Circle-img-56" src={ barber.picture } alt="barber" />
                    </div>
                    <div className="Barber-name-box col s8 No-margin No-padding Margin-t-15">
                      <p className="Card-text-black No-margin Padding-b-4 Text-capitalize">{ barber.name }</p>
                      {
                        barber.showStatus === true ?
                        <div className="Padding-b-4">
                          {
                            barber.schedules.map((schedule, index) => {
                              return (
                                <div className="Container-one-line Margin-t-b-4 animated fadeIn faster" key={ 'schedule' + index }>
                                  <p className="Card-text-inner No-margin col s5 No-padding Text-capitalize">{ schedule.day }</p>
                                  <p className="Card-text-inner No-margin col s2 No-padding Text-center">{ schedule.startHours }.{ schedule.startMinutes }</p>
                                  <p className="Card-text-inner No-margin col s1 No-padding Text-center">-</p>
                                  <p className="Card-text-inner No-margin col s2 No-padding Text-center">{ schedule.endHours }.{ schedule.endMinutes }</p>
                                  <p className="Card-text-inner No-margin col s2 No-padding Text-center Text-uppercase">{ this.props.branch.timezone }</p>
                                </div>
                              )
                            })
                          }
                        </div>
                        :
                        <div></div>
                      }
                    </div>
                    <div className="Drop-down col s1 No-margin No-padding Margin-t-10">
                      {
                        barber.showStatus === false ?
                        <div className="animated rotateIn faster">
                          <DropDownSvg />
                        </div>
                        :
                        <div className="animated rotateOut">
                          <DropUpSvg />
                        </div>
                      }
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
    staffs: state.shop.staffs,
    staffsExists: state.shop.staffsExists,
    staffsLoading: state.shop.staffsLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getStaffsData,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (contentBarber);
