import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

// import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import BranchImage from '../../components/shop/branchDetails/branchImage';
import DetailsCard from '../../components/shop/branchDetails/detailsCard';
import NextButton from '../../components/button/nextButton';
import { getBranchData, setParams, setRouteLink } from '../../store/firestore/shop/shop.actions';

class branchDetails extends Component {
  componentWillMount() {
    let params = this.props.currentParams
    this.props.setParams(params)
    let shopName = params.shopName
    let branchName = params.branchName
    this.props.getBranchData(shopName, branchName)
    // To set route link even if the user refresh the page, user click continue, it will still go to service page
    this.props.setRouteLink(`/book/now/${shopName}/${branchName}`)
  }

  render() {
    // console.log('from page branchDetails',this.props)
    return (
      <div>
        {/* <ShopHeader shopName={ this.props.match.params.shopName } /> */}

        {
          this.props.branchExists ?
          <div>
            <BranchImage />

            <DetailsCard section="Opening Hours" />

            <DetailsCard section="Services" />

            <DetailsCard section="Barber's Schedule" />

            <DetailsCard section="Location" />

            <NextButton text="Book Now" />
          </div>
          :
          <Redirect to="/branch-not-found" />
        }
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
  setParams,
  setRouteLink
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (branchDetails);
