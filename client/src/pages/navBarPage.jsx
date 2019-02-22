import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionSuccessPage from '../pages/transaction/transactionSuccess';
import MenuTransactionsPage from '../pages/menu/menuTransaction';
import MenuAccountPage from '../pages/menu/menuAccount';
import MenuSupportPage from '../pages/menu/menuSupport';
import HomePage from '../pages/home/homePage';
import RegisterPage from '../pages/auth/registerPage';
import LoginPage from '../pages/auth/loginPage';
import { setParams } from '../store/firestore/shop/shop.actions';
import { setCookies, setWindow } from '../store/firestore/customer/customer.actions';
import Navbar from '../components/layout/navbar';

class navBarPage extends Component {
  componentWillMount() {
    let params = this.props.match.params
    this.props.setParams(params)
    let cookiesFunction = this.props.cookies
    this.props.setCookies(cookiesFunction)
    this.props.setWindow(window)
  }

  render() { 
    return (
      <div>
        <Navbar history={ this.props.history } />
        {
          this.props.match.path === '/book/success/:transactionId' ?
          <div className="Margin-t-20">
            <TransactionSuccessPage currentParams={ this.props.match.params }/>
          </div>
          :
          this.props.match.path === '/' ?
          <div className="">
            <HomePage currentParams={ this.props.match.params }/>
          </div>
          :
          this.props.match.path === '/transactions' ?
          <div className="Margin-t-20">
            <MenuTransactionsPage currentParams={ this.props.match.params }/>
          </div>
          :
          this.props.match.path === '/account' ?
          <div className="Padding-t-20 Background-grey" style={{ height: window.innerHeight }}>
            <MenuAccountPage currentParams={ this.props.match.params } history={ this.props.history }/>
          </div>
          :
          this.props.match.path === '/support' ?
          <div className="Padding-t-20 Background-grey" style={{ height: window.innerHeight }}>
            <MenuSupportPage currentParams={ this.props.match.params }/>
          </div>
          :
          this.props.match.path === '/register' ?
          <div className="">
            <RegisterPage history={ this.props.history }/>
          </div>
          :
          this.props.match.path === '/signin' ?
          <div className="">
            <LoginPage history={ this.props.history }/>
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
  setCookies,
  setWindow,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (navBarPage);
