import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

// import ShopBranchesPage from './pages/shop/shopBranches';
// import BranchDetailsPage from './pages/shop/branchDetails';
import HeaderPage from './pages/headerPage';
// import TransactionServicePage from './pages/transaction/transactionService';
// import TransactionBarberPage from './pages/transaction/transactionBarber';
import TransactionConfirmPage from './pages/transaction/transactionConfirm';
import TransactionSuccessPage from './pages/transaction/transactionSuccess';
import NotFoundPage from './pages/error/notFound';

class App extends Component {
  componentDidMount() {
  }

  render() {
    const history = createBrowserHistory()
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/shop/:shopName" component={ HeaderPage } />
            <Route path="/detail/:shopName/:branchName" component={ HeaderPage } />
            <Route path="/book/now/:shopName/:branchName" component={ HeaderPage } />
            <Route path="/book/service/:shopName/:branchName/:service" component={ HeaderPage } />
            <Route path="/branch/:branchname/book/confirmation" component={ TransactionConfirmPage } />
            <Route path="/branch/:branchname/book/success" component={ TransactionSuccessPage } />
            <Route path="/shop-not-found" component={ NotFoundPage } />
            <Route path="/branch-not-found" component={ NotFoundPage } />
            <Route path="*" component={ NotFoundPage } />
          </Switch>          
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (App);