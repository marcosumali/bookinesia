import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../../assets/css/general.css';
import './branchHeader.css';
import PreviousArrowSvg from '../../svg/arrowPreviousSvg';
import { getShopData, clearShopState, getBranchData, setParams } from '../../../store/firestore/shop/shop.actions';
import { clearCartState } from '../../../store/firestore/transaction/transaction.actions';

class branchHeader extends Component {
  componentWillMount() {
    let params = this.props.params
    let shopName = params.shopName
    let branchName = params.branchName
    this.props.getShopData(shopName)
    this.props.getBranchData(shopName, branchName)
  }

  componentDidUpdate() {
    let shop = this.props.shop
    let branch = this.props.branch
    let params = this.props.params
    let shopName = params.shopName
    let branchName = params.branchName
    if (Object.keys(params).length !== 0 && params.constructor === Object) {
      if (Object.keys(shop).length === 0 && shop.constructor === Object) {
        this.props.getShopData(shopName)
      }
      if (Object.keys(branch).length === 0 && branch.constructor === Object) {
        this.props.getBranchData(shopName, branchName)
      }
    }
  }
  
  render() {
    // console.log('from branchHeader component', this.props)
    return (
      <div className="row No-margin">
        {
          this.props.shopExists ?
          <div className="Shop-header-container Container-center-cross">
            {/* Previous Arrow Section */}
            <div 
              className="col s2 Height-100 No-padding No-margin Container-center" 
              onClick={ () => { this.props.history.goBack(); this.props.setParams({});this.props.clearShopState(); this.props.clearCartState() } 
            }>
              <PreviousArrowSvg color="#666666" />
            </div>

            {/* Shop Logo Section */}
            <div className="col s2 Height-100 No-padding No-margin Container-center">
              {
                this.props.shopLoading === false  && this.props.branchLoading === false ?
                <img src={ this.props.shop.logo } className="No-padding Shop-logo animated fadeIn" alt="Shop-logo" />
                :
                <div className="Loading-circle-64"></div>
              }
            </div>
            
            {/* Shop & Branch Info Section */}
            <div className="col s8 Height-100 No-margin No-padding Container-center Padding-l-10">
              <div className="col s12 No-padding Container-center">
                <div className="col s12 No-padding No-margin Margin-b-4">
                  {
                    this.props.shopLoading === false && this.props.branchLoading === false ?
                    <p className="No-margin Shop-header-name Text-capitalize animated fadeIn">{ this.props.shop.name }</p>
                    :
                    <div className="Loading-box-name"></div>
                  }
                </div>
                <div className="col s12 No-padding No-margin">
                  {
                    this.props.shopLoading === false && this.props.branchLoading === false ?
                    <p className="No-margin Shop-header-category Text-capitalize animated fadeIn">{ this.props.branch.name }</p>
                    :
                    <div className="Loading-box-category"></div>
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
    params: state.shop.params,
    branch: state.shop.branch,
    branchLoading: state.shop.branchLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getShopData,
  clearShopState,
  clearCartState,
  getBranchData,
  setParams
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (branchHeader);