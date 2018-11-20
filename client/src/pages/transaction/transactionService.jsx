import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import TransactionCard from '../../components/transaction/transactionCard';
import NextButton from '../../components/button/nextButton';

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
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (transactionService);
