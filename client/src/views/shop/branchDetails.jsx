import React, { Component } from 'react'

import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import BranchImage from '../../components/shop/branchDetails/branchImage';
import DetailsCard from '../../components/shop/branchDetails/detailsCard';
import NextButton from '../../components/button/nextButton';

export default class branchDetails extends Component {
  render() {
    return (
      <div>
        <ShopHeader />

        <BranchImage />

        <DetailsCard section="Opening Hours" />

        <DetailsCard section="Services" />

        <DetailsCard section="Barber's Schedule" />

        <DetailsCard section="Location" />

        <NextButton text="Book Now" />

      </div>
    )
  }
}
