import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShopHeader from '../components/shop/shopHeader/shopHeader';
import ShopBranchesPage from './shop/shopBranches';
import { setParams } from '../store/firestore/shop/shop.actions';
import { setCookies } from '../store/firestore/customer/customer.actions';

class shopHeaderPage extends Component {
  componentWillMount() {
    let params = this.props.match.params
    this.props.setParams(params)
    let cookiesFunction = this.props.cookies
    this.props.setCookies(cookiesFunction)
  }

  render() {
    // console.log('from header page', this.props) 
    return (
      <div>
        <ShopHeader history={ this.props.history } />
        {
          this.props.match.path === '/shop/:shopName' ?
          <ShopBranchesPage />
          :
          <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setParams,
  setCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (shopHeaderPage);