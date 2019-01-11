import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionCard from '../../components/transaction/transactionCard';
import NextButton from '../../components/button/nextButton';
import { setParams } from '../../store/firestore/shop/shop.actions';

class transactionConfirm extends Component {
  componentWillMount () {
    let params = this.props.currentParams
    this.props.setParams(params)
  }

  render() {
    return (
      <div>

        <TransactionCard section="Transaction Details" />

        {/* Break line is set to anticipate fix bottom over-shadow contents */}
        <br></br>
        <br></br>
        <br></br>

        <div className="Fix-bottom">
          <NextButton text="Confirm and Book" history={ this.props.history } />
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


export default connect(mapStateToProps, mapDispatchToProps) (transactionConfirm);

