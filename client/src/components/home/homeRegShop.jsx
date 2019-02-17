import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getShopsData } from '../../store/firestore/shop/shop.actions';

class homeRegShop extends Component {
  constructor() {
    super()
    this.state = {
      loadingBox: [1,2,3,4]
    }
  }

  componentWillMount() {
    this.props.getShopsData()
  }

  render() {
    return (
      <div className="row No-margin Provider-outer-box">
        <div className="col s12 Container-center Partner-box">
          <div className="Partner-text-header">Our Registered Service Provider</div>
        </div>
        <div className="col s12 No-margin No-padding Container-center Margin-b-40">
          {
            this.props.shopsLoading ?
            <div className="col s12 No-margin No-padding Container-center">
              {
                this.state.loadingBox.map((shopLoading, index) => {
                  return (
                    <div className="col s3 No-margin No-padding Container-center Shop-box" key={ 'shop' + index }>
                      <div className="col s12 No-margin No-padding Container-center">
                        <div className="Home-shop-loading"></div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            :
            <div className="col s12 No-margin No-padding Container-center">
              {
                this.props.shops && this.props.shops.map((shop, index) => {
                  return (
                    <Link className="col s3 No-margin No-padding Container-center Shop-box animated fadeIn faster" to={ `/shop/${shop.id}` } key={ 'shop' + index }>
                      <div className="col s12 No-margin No-padding Container-center">
                        <div className="col s12 No-margin No-padding Container-center Margin-b-8">
                          <img className="Home-shop-logo" src={ shop.logo } alt={ 'image' + index } />
                        </div>
                        <div className="col s12 No-margin No-padding Container-center">
                          <div className="Text-capitalize Home-shop-name">{ shop.name }</div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    shops: state.shop.shops,
    shopsExist: state.shop.shopsExist,
    shopsLoading: state.shop.shopsLoading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getShopsData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (homeRegShop);
