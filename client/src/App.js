import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import ShopHeaderPage from './pages/shopHeaderPage';
import BranchHeaderPage from './pages/branchHeaderPage';
import NavbarPage from './pages/navBarPage';
import MenuHeaderPage from './pages/menuHeaderPage';
import NotFoundPage from './pages/error/notFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact path="/" 
            render={ (props) => (<NavbarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/shop/:shopName" 
            render={ (props) => (<ShopHeaderPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/detail/:shopName/:branchName" 
            render={ (props) => (<BranchHeaderPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/book/now/:shopName/:branchName" 
            render={ (props) => (<BranchHeaderPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/book/service/:shopName/:branchName/:services" 
            render={ (props) => (<BranchHeaderPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/book/confirm/:shopName/:branchName/service/:services/provider/:provider/date/:date" 
            render={ (props) => (<BranchHeaderPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/book/success/:transactionId" 
            render={ (props) => (<NavbarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/transactions" 
            render={ (props) => (<NavbarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/account" 
            render={ (props) => (<NavbarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/settings" 
            render={ (props) => (<MenuHeaderPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/change-password" 
            render={ (props) => (<MenuHeaderPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/support" 
            render={ (props) => (<NavbarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/register" 
            render={ (props) => (<NavbarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/login" 
            render={ (props) => (<NavbarPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route 
            path="/transaction/details/:transactionId" 
            render={ (props) => (<MenuHeaderPage {...props} cookies={this.props.cookies}/>) } 
          />
          <Route path="*" component={ NotFoundPage } />
        </Switch>          
      </div>
    );
  }
}


export default withCookies(App);