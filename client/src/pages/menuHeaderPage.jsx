import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MenuHeader from '../components/menu/menuHeader/menuHeader';
import TransactionDetails from '../components/menu/transaction/transactionDetails';
import AccountSettings from '../components/menu/account/accountSettings';
import AccountChangePassword from '../components/menu/account/accountChangePassword';
import { setParams } from '../store/firestore/shop/shop.actions';
import { setCookies } from '../store/firestore/customer/customer.actions';

class menuHeaderPage extends Component {
  componentWillMount() {
    let params = this.props.match.params
    this.props.setParams(params)
    let cookiesFunction = this.props.cookies
    this.props.setCookies(cookiesFunction)
  }

  render() {
    // console.log('from menu header page', this.props) 
    return (
      <div>
        {
          this.props.match.path === '/transaction/details/:transactionId' ?
          <div>
            <MenuHeader history={ this.props.history } text="Transaction Details" />
            <TransactionDetails currentParams={ this.props.match.params } />
          </div>
          :
          this.props.match.path === '/settings' ?
          <div 
          style={{ height: window.innerHeight, backgroundColor: '#EAEAEA' }}
          >
            <MenuHeader getAccountStatus="true" history={ this.props.history } text="Account Settings" />
            <AccountSettings history={ this.props.history } />
          </div>
          :
          this.props.match.path === '/change-password' ?
          <div 
          style={{ height: window.innerHeight, backgroundColor: '#EAEAEA' }}
          >
            <MenuHeader getAccountStatus="true" history={ this.props.history } text="Change Password" />
            <AccountChangePassword history={ this.props.history } />
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setParams,
  setCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (menuHeaderPage);