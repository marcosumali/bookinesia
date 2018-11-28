import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import ShopHeader from '../../components/shop/shopHeader/shopHeader';
import TransactionCard from '../../components/transaction/transactionCard';
import NextButton from '../../components/button/nextButton';
import { setParams } from '../../store/firestore/shop/shop.actions';

class transactionService extends Component {
  componentWillMount () {
    let params = this.props.currentParams
    this.props.setParams(params)
  }
  
  render() {
    // console.log('from trans service page', this.props)
    return (
      <div>
        {/* <ShopHeader /> */}

        <TransactionCard section="Choose Your Services" />

        {/* Break line is set to anticipate fix bottom over-shadow contents */}
        <br></br>
        <br></br>
        <br></br>

        <div className="Fix-bottom">
          <NextButton text="Continue" onPage="ServicePage" history={ this.props.history } />
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
  setParams
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (transactionService);
