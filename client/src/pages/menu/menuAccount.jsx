import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountDetails from '../../components/menu/account/accountDetails';

class menuAccount extends Component {
  render() {
    return (
      <div>
        <AccountDetails history={ this.props.history }/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (menuAccount);