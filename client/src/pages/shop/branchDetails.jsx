import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

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
    return (
      <div>
        {
          this.props.branchExists ?
          <div className="row No-margin No-padding">
            <div className="col s12 No-margin No-padding">
              <BranchImage />
            </div>

            <div className="col s12 m6 No-margin No-padding">
              <DetailsCard section="Opening Hours" />
            </div>

            <div className="col s12 m6 No-margin No-padding">
              <DetailsCard section="Services" />
            </div>

            <div className="col s12 No-margin No-padding">
              <DetailsCard section="Barber's Schedule" />
            </div>

            <div className="col s12 No-margin No-padding">
              <DetailsCard section="Location" />
            </div>

            <div className="col s12 No-margin No-padding">
              <NextButton text="Book Now" />
            </div>
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
