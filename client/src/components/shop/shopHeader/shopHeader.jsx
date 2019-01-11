import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../../assets/css/general.css';
import './shopHeader.css';
import PreviousArrowSvg from '../../svg/arrowPreviousSvg';
import { getShopData, clearShopState } from '../../../store/firestore/shop/shop.actions';
import { clearCartState } from '../../../store/firestore/transaction/transaction.actions';

class shopHeader extends Component {

  componentWillMount () {
    this.props.getShopData(this.props.params.shopName)
  }
  
  render() {
    // console.log('from shopHeader', this.props)
    return (
      <div className="row No-margin">
        {
          this.props.shopExists ?
          <div className="Shop-header-container Container-center-cross">
            {/* Previous Arrow Section */}
            <div 
              className="col s2 m1 Height-100 No-padding No-margin Container-center" 
              onClick={ () => { this.props.history.goBack(); this.props.clearShopState(); this.props.clearCartState() } 
            }>
              <PreviousArrowSvg color="#666666" />
            </div>

            {/* Shop Logo Section */}
            <div className="col s2 m1 offset-m1 Height-100 No-padding Container-center">
              {
                this.props.shopLoading === false ?
                <img src={ this.props.shop.logo } className="No-padding Shop-logo animated fadeIn" alt="Shop-logo" />
                :
                <div className="Loading-circle-64"></div>
              }
            </div>
            
            {/* Shop Info Section */}
            <div className="col s8 Height-100 No-margin No-padding Container-center Padding-l-10">
              <div className="col s12 No-padding Container-center">
                <div className="col s12 No-padding No-margin Margin-b-4">
                  {
                    this.props.shopLoading === false ?
                    <p className="No-margin Shop-header-category Text-capitalize animated fadeIn">{ this.props.shop.categoryId }</p>
                    :
                    <div className="Loading-box-category"></div>
                  }
                </div>
                <div className="col s12 No-padding No-margin">
                  {
                    this.props.shopLoading === false ?
                    <p className="No-margin Shop-header-name Text-capitalize animated fadeIn">{ this.props.shop.name }</p>
                    :
                    <div className="Loading-box-name"></div>
                  }
                </div>
              </div>
            </div>
          </div>
          :
          <Redirect to="/shop-not-found"/>
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    shop: state.shop.shop,
    shopLoading: state.shop.shopLoading,
    shopExists: state.shop.shopExists,
    params: state.shop.params
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getShopData,
  clearShopState,
  clearCartState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (shopHeader);