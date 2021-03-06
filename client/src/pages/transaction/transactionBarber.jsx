import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

        <TransactionCard section="Choose Your Provider & Schedule" />

        {/* Break line is set to anticipate fix bottom over-shadow contents */}
        <br></br>
        <br></br>
        <br></br>

        <div className="Fix-bottom">
          <NextButton text="Continue" onPage="BarberPage" />
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

