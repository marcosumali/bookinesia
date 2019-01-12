import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginComponent from '../../components/auth/login';

class loginPage extends Component {
  render() {
    return (
      <div className="Padding-20">
        <LoginComponent history={ this.props.history } />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (loginPage);