import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../assets/css/general.css';
import './account.css';
import AccountCircleSvg from '../../svg/accountCircleSvg.jsx';
import AccountDetailsLoading from './accountDetailsLoading';
import { handleCookies } from '../../../store/firestore/customer/customer.actions';

class accountDetails extends Component {
  componentWillMount () {
    this.props.handleCookies('get account', this.props.cookies)
  }

  render() {
    console.log('from account details', this.props)
    return (
      <div>
        {
          this.props.userLoading ?
          <AccountDetailsLoading />
          :
          <div className="row No-margin Details-content-box Padding-10 Padding-l-r-20 animated fadeIn">      
            {/* Header Section */}
            <div className="col s12 No-margin No-padding Padding-10 Container-center Margin-b-10">
              <div className="col s3 No-margin No-padding Container-center">
                {
                  this.props.user.picture === '' ?
                  <AccountCircleSvg width="4em" height="4em" color="#EAEAEA" />
                  :
                  <div></div>
                }
              </div>
              <div className="col s9 No-margin No-padding">
                <div className="col s12 No-margin No-padding Margin-b-4">
                  <div className="Account-name-text Text-capitalize">{ this.props.user.name }</div>
                </div>
                <div className="col s12 No-margin No-padding">
                  <div className="col s6 No-margin No-padding">
                    <div className="Container-center Settings-button-box">
                      <div className="Settings-button-text">Account Settings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Customer Info Section */}
            <div className="col s12 No-margin No-padding Padding-10 Info-box Margin-b-24">
              <div className="col s12 No-margin No-padding Margin-b-4">
                <div className="Account-info-header">Email</div>
              </div>
              <div className="col s12 No-margin No-padding Margin-b-4">
                <div className="Account-info-text">{ this.props.user.email }</div>
              </div>
              <div className="col s12 No-margin No-padding Margin-b-4">
                <div className="Account-info-header">Phone No.</div>
              </div>
              <div className="col s12 No-margin No-padding Margin-b-4">
                <div className="Account-info-text">{ this.props.user.phone }</div>
              </div>
            </div>
    
            {/* Change Password Button */}
            <div className="col s12 No-margin No-padding Margin-b-16 Container-center">
              <div className="Blue-button Container-center">
                <div className="White-text">Change Password</div>
              </div>
            </div>
            
            <div className="col s12 No-margin No-padding Margin-b-24 Container-center">
              <div className="Grey-button Container-center">
                <div className="Black-text">Log Out</div>
              </div>
            </div>
  
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: state.user.cookies,
    user: state.user.user,
    userExists: state.user.userExists,
    userLoading: state.user.userLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (accountDetails);