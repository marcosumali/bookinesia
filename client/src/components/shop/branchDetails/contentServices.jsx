import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../assets/css/general.css';
import './branchDetails.css';
import { getServicesData } from '../../../store/firestore/shop/shop.actions';
import { formatMoney } from '../../../helpers/currency';

class contentServices extends Component {
  constructor() {
    super()
    this.state = {
      loadingBox: [0, 1, 2, 3, 4]
    }
  }

  componentWillMount() {
    let shopName = this.props.params.shopName
    let branchName = this.props.params.branchName
    this.props.getServicesData(shopName, branchName)
  }

  render() {
    // console.log('from contentServices', this.props)
    return (
      <div className="row No-margin">
        {
          this.props.servicesLoading ?
          <div>
            {
              this.state.loadingBox.map((num, index) => {
                return (
                  <div className="col s12 Margin-t-b-4 Services-loading" key={ 'loading' + index }></div>
                )
              })
            }
          </div>
          :
          <div>
            {
              this.props.services && this.props.services.map((service, index) => {
                return (
                  <div className="col s12 Container-one-line Margin-t-b-4 No-padding animated fadeIn" key={ 'service' + index }>
                    <div className="col s6 No-margin No-padding Self-flex-start">
                      <p className="Card-text No-margin Text-capitalize">{ service.name }</p>
                      <p className="Card-text No-margin Text-capitalize">{ service.description }</p>
                    </div>
                    <p className="col s2 Card-text No-margin No-padding Self-flex-start Text-center">{ service.duration } min</p>
                    <p className="col s4 Card-text No-margin No-padding Self-flex-start Text-center Text-capitalize">{ service.currency } { formatMoney(service.price) }</p>
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
    services: state.shop.services,
    servicesExists: state.shop.servicesExists,
    servicesLoading: state.shop.servicesLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getServicesData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (contentServices);


