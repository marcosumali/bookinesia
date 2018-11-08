import React, { Component } from 'react';

import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import BranchCard from '../../components/shop/branchCard/branchCard';

export default class shopBranches extends Component {
  render() {
    return (
      <div>
        <ShopHeader />

        <BranchCard />
        
      </div>
    )
  }
}
