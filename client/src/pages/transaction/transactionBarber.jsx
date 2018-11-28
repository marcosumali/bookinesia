import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import TransactionCard from '../../components/transaction/transactionCard';
import NextButton from '../../components/button/nextButton';
import { setParams } from '../../store/firestore/shop/shop.actions';

class transactionBarber extends Component {
  componentWillMount () {
    let params = this.props.currentParams
    this.props.setParams(params)
  }

  render() {
    return (
      <div>
        {/* <ShopHeader /> */}

        <TransactionCard section="Choose Your Barber & Schedule" />

        {/* Break line is set to anticipate fix bottom over-shadow contents */}
        <br></br>
        <br></br>
        <br></br>

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
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (transactionBarber);

