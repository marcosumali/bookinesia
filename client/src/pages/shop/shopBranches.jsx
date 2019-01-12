import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BranchCard from '../../components/shop/shopBranches/branchCard';

class shopBranches extends Component {
  render() {
    return (
      <div>
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
