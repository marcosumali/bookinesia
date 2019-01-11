import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../assets/css/general.css';
import './menuHeader.css';
import PreviousArrowSvg from '../../svg/arrowPreviousSvg';
import { clearUserState, handleCookies } from '../../../store/firestore/customer/customer.actions';
import { authSignOut, authRedirectAndSignOut } from '../../../store/firestore/auth/auth.actions';

class menuHeader extends Component {
  componentWillMount() {
    this.props.authRedirectAndSignOut(this.props)
    if (this.props.getAccountStatus === 'true') {
      this.props.handleCookies('get account', this.props.cookies)
    }
  }

  componentDidUpdate() {
    this.props.authRedirectAndSignOut(this.props)
  }

  render() {
    // console.log('from menuHeader', this.props)
    return (
      <div className="row No-margin">
        <div className="Menu-header-container Container-center-cross">

          {/* Previous Arrow Section */}
          <div 
            className="col s2 m1 Height-100 No-padding No-margin Container-center" 
            style={{ zIndex: '998' }}
            onClick={ () => { this.props.history.goBack(); this.props.clearUserState(); } 
          }>
            <PreviousArrowSvg color="#666666" />
          </div>
          
          {/* Text Section */}
          <div className="col s12 No-padding Container-center" style={{ position: 'absolute', zIndex: '997' }} >
            <div className="Menu-header-text Text-capitalize Text-center">{ this.props.text }</div>
          </div>

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  state.firebase.profile['email'] = state.firebase.auth.email
  return {
    cookies: state.user.cookies,
    authUser: state.firebase.profile,
    authUserIsLoaded: state.firebase.profile.isLoaded,
    window: state.user.window
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  clearUserState,
  handleCookies,
  authSignOut,
  authRedirectAndSignOut,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (menuHeader);