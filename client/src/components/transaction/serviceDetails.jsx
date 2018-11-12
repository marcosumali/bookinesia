import React, { Component } from 'react';

import Data from '../../assets/data/dummy/service.jsx';
import '../../assets/css/general.css';
import './transaction.css';
import { formatMoney } from '../../helpers/currency';

export default class detailServices extends Component {
  constructor () {
    super()
    this.state = {
      data: Data,
      primaryServices: [],
      secondaryServices: [],
      services: []
    }
  
  }

  handleChange = (e) => {
    let target = e.target
    let id = target.id            // id represent key of product in firestore
    let type = target.type        // type of input e.g. radio or checkbox
    let status = target.checked   // true or false

    let serviceSelected = {
      id,
      type
    }
    // console.log('service:', serviceSelected)

    if (type === 'radio') {
      if (this.state.services.length <= 0 && status === true) {
        this.state.services.push(serviceSelected)
      } else {
        this.state.services.map((service) => {
          if (service.type === 'radio') {
            let index = this.state.services.findIndex(stateService => stateService.id === service.id)
            // console.log('check radio index', index)
            this.state.services.splice(index, 1, serviceSelected)
          }
          return ''
        })
      }
    } else if (type === 'checkbox') {
      // console.log('check status checkbox', status)
      // console.log('check isi array', this.state.services)
      let index = this.state.services.findIndex(service => service.id === serviceSelected.id)
      // console.log('check index bos', index)
      if (status === true && index === -1) {
        // console.log('check index true', index)
        this.state.services.push(serviceSelected)
      } else if (status === false && index !== -1) {
        // console.log('check index false', index)
        this.state.services.splice(index, 1)
      }  
    }
    console.log('check final state service', this.state.services)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  handleData = () => {
    this.state.data && this.state.data.map((data, index) => {
      if (data.type === 'primary') {
        this.state.primaryServices.push(data)
      } else {
        this.state.secondaryServices.push(data)
      }
      return ''
    })
  }

  componentWillMount() {
    this.handleData()
  }

  componentDidMount(){
    // console.log(this.state.primaryServices)
    // console.log(this.state.secondaryServices)
    // console.log(this.state.services)
  }

  render() {
    return (
      <div className="row No-margin Margin-l-b-r-10">
        <form className="" onSubmit={this.handleSubmit}>
          {
            this.state.primaryServices.map((data, index) => {
              return (
                <div className="row No-margin Container-center-cross Margin-b-4" key={ 'service' + index }>
                  <p className="col s12 No-margin No-padding">
                    <input className="with-gap" name="group1" type="radio" id={ data.id } onChange={ this.handleChange } style={{ border: '10px solid black' }} />
                    <label className="col s12 No-padding Padding-left-check Card-text" htmlFor={ data.id }>{ data.name } { data.description }</label>
                  </p>
                  <div className="col s12 Container-one-line No-padding Padding-left-check">
                    <p className="col s6 No-margin No-padding Card-text">{ data.duration } min</p>
                    <p className="col s6 No-margin No-padding Card-text" style={{ textAlign: 'right' }}>{ data.currency } { formatMoney(data.price) }</p>
                  </div>

                </div>  
              )
            })
          }
          <p className="Card-header No-margin Margin-b-8">Additional Services:</p>
          {
            this.state.secondaryServices.map((data, index) => {
              return (
                <div className="row No-margin Container-center-cross Margin-b-4" key={ 'service' + index }>
                  <input className="filled-in" name="group2" type="checkbox" id={ data.id } onChange={ this.handleChange } />
                  <label className="col s12 No-padding Padding-left-check Card-text" htmlFor={ data.id }>{ data.name } { data.description }</label>
                  <div className="col s12 Container-one-line No-padding Padding-left-check">
                    <p className="col s6 No-margin No-padding Card-text">{ data.duration } min</p>
                    <p className="col s6 No-margin No-padding Card-text" style={{ textAlign: 'right' }}>{ data.currency } { formatMoney(data.price) }</p>
                  </div>

                </div>  
              )
            })
          }
        </form>
      </div>
    )
  }
}
