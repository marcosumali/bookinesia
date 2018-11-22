import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import TransactionCard from '../../components/transaction/transactionCard';
import NextButton from '../../components/button/nextButton';
import { setParams, setRouteLink } from '../../store/firestore/shop/shop.actions';

class transactionBarber extends Component {
  componentWillMount () {
    let params = this.props.currentParams
    this.props.setParams(params)
    let shopName = params.shopName
    let branchName = params.branchName
    let services = params.services
    this.props.setRouteLink(`/book/service/${shopName}/${branchName}/${services}`)
  }

  render() {
    return (
      <div>
        {/* <ShopHeader /> */}

        <TransactionCard section="Choose Your Barber & Schedule" />

        {/* <br></br>
        <br></br>
        <br></br> */}

        <div className="Fix-bottom">
          <NextButton text="Continue" />
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setParams,
  setRouteLink
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (transactionBarber);

