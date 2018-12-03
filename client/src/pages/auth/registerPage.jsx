import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RegisterComponentPage from '../../components/auth/register';

class registerPage extends Component {
  render() {
    // console.log('from register page', this.props)
    return (
      <div className="Padding-20">
        <RegisterComponentPage history={ this.props.history } />
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


export default connect(mapStateToProps, mapDispatchToProps) (registerPage);