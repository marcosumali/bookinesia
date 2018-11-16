import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import BranchImage from '../../components/shop/branchDetails/branchImage';
import DetailsCard from '../../components/shop/branchDetails/detailsCard';
import NextButton from '../../components/button/nextButton';
import { getBranchData, setParams } from '../../store/firestore/shop/shop.actions';

class branchDetails extends Component {
  componentWillMount() {
    let params = this.props.currentParams
    this.props.setParams(params)
    let shopName = params.shopName
    let branchName = params.branchName
    this.props.getBranchData(shopName, branchName)
  }

  render() {
    // console.log('from page branchDetails',this.props)
    return (
      <div>
        {/* <ShopHeader shopName={ this.props.match.params.shopName } /> */}
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

const mapStateToProps = state => {
  return {
    branch: state.shop.branch,
    branchLoading: state.shop.branchLoading,
    branchExists: state.shop.branchExists,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getBranchData,
  setParams
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (branchDetails);
