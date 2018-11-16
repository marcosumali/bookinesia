import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import BranchCard from '../../components/shop/branchCard/branchCard';

class shopBranches extends Component {
  render() {
    // console.log('check params pages shopBranches',this.props)
    return (
      <div>
        {/* <ShopHeader shopName={ this.props.match.params.shopName } /> */}

        <BranchCard shopName={ this.props.params.shopName } />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    params: state.shop.params
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (shopBranches);
