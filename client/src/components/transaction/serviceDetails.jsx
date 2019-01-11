import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

// import Data from '../../assets/data/dummy/service.jsx';
import '../../assets/css/general.css';
import '../../assets/css/materialize/form.css';
import './transaction.css';
import { formatMoney } from '../../helpers/currency';
import { getServicesData, setRouteLink, getBranchData } from '../../store/firestore/shop/shop.actions';
import { setPrimaryService, setSecondaryServices } from '../../store/firestore/transaction/transaction.actions';

class detailServices extends Component {
  constructor () {
    super()
    this.state = {
      // data: Data,
      services: [],
      loadingBox: [1, 2],
    }    
  }

  // handleChange = (e) => {
  //   let target = e.target
  //   let id = target.id            // id represent key of product in firestore
  //   let type = target.type        // type of input e.g. radio or checkbox
  //   let status = target.checked   // true or false

  //   let serviceSelected = {
  //     id,
  //     type
  //   }
  //   console.log('service: ', serviceSelected)

  //   if (type === 'radio') {
  //     if (this.state.services.length <= 0 && status === true) {
  //       this.state.services.push(serviceSelected)
  //     } else {
  //       this.state.services.map((service) => {
  //         if (service.type === 'radio') {
  //           let index = this.state.services.findIndex(stateService => stateService.id === service.id)
  //           // console.log('check radio index', index)
  //           this.state.services.splice(index, 1, serviceSelected)
  //         }
  //         return ''
  //       })
  //     }
  //   } else if (type === 'checkbox') {
  //     // console.log('check status checkbox', status)
  //     // console.log('check isi array', this.state.services)
  //     let index = this.state.services.findIndex(service => service.id === serviceSelected.id)
  //     // console.log('check index bos', index)
  //     if (status === true && index === -1) {
  //       // console.log('check index true', index)
  //       this.state.services.push(serviceSelected)
  //     } else if (status === false && index !== -1) {
  //       // console.log('check index false', index)
  //       this.state.services.splice(index, 1)
  //     }  
  //   }
  //   console.log('check final state service', this.state.services)
  // }

  componentWillMount() {
    let params = this.props.params
    let shopName = params.shopName
    let branchName = params.branchName
    this.props.getBranchData(shopName, branchName)
    this.props.getServicesData(shopName, branchName)
    // Set secondary services in purpose of setting route link:
    // 1). When user refreshes, the route link will be undefined but it's okay since the user will pick atleast one service which will trigger setRouteLink
    // 2). When user on barber page choose to go back to service page but do not edit any services choosen and continue to barber page
    this.props.setSecondaryServices(params, this.props.secondaryServices, this.props.primaryService)
  }

  handleSecondaryServices = (e) => {
    let target = e.target
    let id = target.id            // id represent key of product in firestore
    let type = target.type        // type of input e.g. radio or checkbox
    let status = target.checked   // true or false

    let storeSecondaryServices = this.props.secondaryServices
    let checkedIndex = storeSecondaryServices.indexOf(id)
    // console.log('handle props', storeSecondaryServices, checkedIndex)

    if (type === 'checkbox' && status) {
      if (checkedIndex <= -1) {
        storeSecondaryServices.push(id)
      } 
    } else if (type === 'checkbox' && status === false) {
      if (checkedIndex >= 0) {
        storeSecondaryServices.splice(checkedIndex, 1)
      }
    }
    this.props.setSecondaryServices(this.props.params, storeSecondaryServices, this.props.primaryService)     
  }

  handleCheckbox = (service) => {
    let status = false
    let breakStatus = false
    this.props.secondaryServices && this.props.secondaryServices.map(storeSecondaryServiceId => {
      if (service.id === storeSecondaryServiceId && breakStatus === false) {
        status = true
        breakStatus = true
      }
      return ''
    })
    return status
  }

  render() {    
    // console.log('props from service details', this.props)
    return (
      <div className="row No-margin Margin-l-b-r-10">
        {
          this.props.branchExists ?
            <form className="col s12 No-margin No-padding">
            {
              this.props.servicesLoading ?
              <div>
                {/* Primary Service Loading Section */}
                {
                  this.state.loadingBox && this.state.loadingBox.map((num, index) => {
                    return (
                      <div key={ 'primeService' + index }>
                        <div className="Container-center-cross Margin-b-4">
                          <div className="Input-loading Margin-b-4"></div>
                          <div className="col s12 Container-one-line No-padding Padding-left-check" style={{ justifyContent: 'space-between' }}>
                            <div className="col s5 No-margin No-padding">
                              <div className="Label-loading"></div>
                            </div>
                            <div className="col s5 No-margin No-padding">
                              <div className="Label-loading"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                {/* Secondary Service Loading Section */}
                <p className="Card-header No-margin Margin-b-8 Margin-t-8">Additional Services:</p>
                {
                  this.state.loadingBox && this.state.loadingBox.map((num, index) => {
                    return (
                      <div key={ 'secondService' + index }>
                        <div className="Container-center-cross Margin-b-4">
                          <div className="Input-loading Margin-b-4"></div>
                          <div className="col s12 Container-one-line No-padding Padding-left-check" style={{ justifyContent: 'space-between' }}>
                            <div className="col s5 No-margin No-padding">
                              <div className="Label-loading"></div>
                            </div>
                            <div className="col s5 No-margin No-padding">
                              <div className="Label-loading"></div>
                            </div>                          
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              :
              <div>
              {/* Primary Service Section */}
              {
                this.props.services && this.props.services.map((service, index) => {
                  return (
                    <div key={ 'primeService' + index } className="animated fadeIn faster">
                      {
                        service.type === 'primary' ?
                        <div className="Container-center-cross Margin-b-4" onClick={ () => this.props.setPrimaryService(this.props.params, service, this.props.secondaryServices) }>
                          <p className="col s12 No-margin No-padding" >
                            <input 
                              className="radio-blue with-gap" 
                              name="group1" 
                              type="radio" 
                              id={ service.id } 
                              value={ service }
                              checked={ this.props.primaryService === service.id }
                              readOnly
                            />
                            <label className="col s12 No-padding Padding-left-check Card-text Text-capitalize" htmlFor={ service.id }>{ service.name } { service.description }</label>
                          </p>
                          <div className="col s12 Container-one-line No-padding Padding-left-check" style={{ justifyContent: 'space-between' }}>
                            <div className="col s6 No-margin No-padding">
                              <p className="No-margin Card-text">{ service.duration } min</p>
                            </div>
                            <div className="col s6 No-margin No-padding">
                              <p className="No-margin Card-text Text-right Text-capitalize">{ service.currency } { formatMoney(service.price) }</p>
                            </div>
                          </div>

                        </div>
                        :
                        <div></div>
                      }
                    </div>
                  )
                })
              }
              {/* Secondary Service Section */}
              <p className="Card-header No-margin Margin-b-8 Margin-t-8">Additional Services:</p>
              {
                this.props.services && this.props.services.map((service, index) => {
                  return (
                    <div key={ 'secondService' + index } className="animated fadeIn faster">
                      {
                        service.type === 'secondary' ?
                        <div className="Container-center-cross Margin-b-4">
                          <input 
                            className="checkbox-blue filled-in" 
                            name="group2" 
                            type="checkbox" 
                            id={ service.id }
                            value={ service }
                            onChange={ this.handleSecondaryServices }
                            checked={ this.handleCheckbox(service) }
                          />
                          <label className="col s12 No-padding Padding-left-check Card-text Text-capitalize" htmlFor={ service.id }>{ service.name } { service.description }</label>
                          <div className="col s12 Container-one-line No-padding Padding-left-check">
                            <p className="col s6 No-margin No-padding Card-text">{ service.duration } min</p>
                            <p className="col s6 No-margin No-padding Card-text Text-right Text-capitalize">{ service.currency } { formatMoney(service.price) }</p>
                          </div>
                        </div>  
                        :
                        <div></div>
                      }
                    </div>
                  )
                })
              }
            </div>
            }
          </form>
          :
          <Redirect to="/branch-not-found" />
        }
        {
          this.props.noServiceSelectedStatus ?
          <div className="col s12 No-margin No-padding Container-center Margin-t-8 Margin-b-4">
            <div className="Confirm-text-error">Choose one of the provided services to continue.</div>
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    params: state.shop.params,
    services: state.shop.services,
    servicesExists: state.shop.servicesExists,
    servicesLoading: state.shop.servicesLoading,
    routeLink : state.shop.routeLink,
    primaryService: state.cart.primaryService,
    secondaryServices: state.cart.secondaryServices,
    branchExists: state.shop.branchExists,
    noServiceSelectedStatus: state.cart.noServiceSelectedStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getServicesData,
  setPrimaryService,
  setSecondaryServices,
  setRouteLink,
  getBranchData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (detailServices);