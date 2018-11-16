import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShopHeader from '../components/shop/shopHeader/shopHeader';
import ShopBranchesPage from '../pages/shop/shopBranches';
import BranchDetailsPage from '../pages/shop/branchDetails';
import { setParams } from '../store/firestore/shop/shop.actions';

class headerPage extends Component {
  componentWillMount() {
    let params = this.props.match.params
    this.props.setParams(params)
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
          this.props.match.path === '/detail/:shopName/:branchName' ?
          <BranchDetailsPage currentParams={ this.props.match.params } />
          :
          <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setParams
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (headerPage);