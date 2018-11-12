import React, { Component } from 'react'

import Data from '../../../assets/data/dummy/barber';
import DropDownSvg from '../../svg/dropDownSvg';
import DropUpSvg from '../../svg/dropUpSvg';
import '../../../assets/css/general.css';
import './branchDetails.css';

export default class contentBarber extends Component {
  constructor() {
    super()
    this.state = {
      data: Data, 
      barbers: []
    }

  }

  createState (index, name, picture, schedule) {
    let newBarber = {
      name,
      picture,
      schedule,
      status: false
    }

    this.state.barbers.push(newBarber)
  }

  showSchedule(index) {
    let barber = this.state.barbers[index] 
    let barbers = this.state.barbers
    if (barber.status === false) {
      barbers.splice(index, 1, {
        ...barber,
        status: true
      })
      this.setState({
        'barbers': barbers
      })
    } else {
      barbers.splice(index, 1, {
        ...barber,
        status: false
      })
      this.setState({
        'barbers': barbers
      })
    }

    // console.log(barbers)
  }

  handleData = () => {
    this.state.data && this.state.data.map((data, index) => {
      this.createState(index, data.name, data.picture, data.schedule)
      return '';
    })
  }
  
  componentWillMount() {
    this.handleData()
  }

  componentDidMount() {
    console.log('from content barber', this.state)
  }

  render() {
    return (
      <div className="row No-margin Card-content-m-10">
        {
          this.state.barbers.map((barber, index) => {
            return (
              <div className="col s12 No-padding Container-one-line-only Margin-t-b-4 Padding-b-4" style={{ borderBottom: '1px solid #EAEAEA' }} key={ index } onClick={ () => this.showSchedule(index) }>
                <div className="Barber-img-box col s3 No-margin No-padding">
                  <img className="Circle-img-56" src={ process.env.PUBLIC_URL + barber.picture } alt="barber" />
                </div>
                <div className="Barber-name-box col s8 No-margin No-padding Margin-t-15">
                  <p className="Card-text-black No-margin Padding-b-4">{ barber.name }</p>
                  {
                    barber.status === true ?
                    <div className="Padding-b-4">
                      {
                        barber.schedule.map((schedule, index) => {
                          return (
                            <div className="Container-one-line Margin-t-b-4" key={ 'sch' + index }>
                              <p className="Card-text-inner No-margin col s5 No-padding">{ schedule.day }</p>
                              <p className="Card-text-inner No-margin col s2 No-padding Text-center">{ schedule.startHour }</p>
                              <p className="Card-text-inner No-margin col s1 No-padding Text-center">-</p>
                              <p className="Card-text-inner No-margin col s2 No-padding Text-center">{ schedule.endHour }</p>
                              <p className="Card-text-inner No-margin col s2 No-padding Text-center">WIB</p>
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
                    barber.status === false ?
                    <DropDownSvg />
                    :
                    <DropUpSvg />
                  }
                </div>
              </div>
            )
          })
        }

      </div>
    )
  }
}
