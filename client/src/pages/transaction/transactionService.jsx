import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import TransactionCard from '../../components/transaction/transactionCard';
import NextButton from '../../components/button/nextButton';
import { setRouteLink } from '../../store/firestore/shop/shop.actions';

class transactionService extends Component {
  render() {
    // console.log('from trans service page', this.props)
    return (
      <div>
        {/* <ShopHeader /> */}

        <TransactionCard section="Choose Your Services" />

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
    params: state.shop.params,
    branch: state.shop.branch,
    branchLoading: state.shop.branchLoading,
    branchExists: state.shop.branchExists,
    primaryService: state.cart.primaryService,
    secondaryServices: state.cart.secondaryServices,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setRouteLink
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (transactionService);
