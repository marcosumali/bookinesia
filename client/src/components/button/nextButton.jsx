import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';

class nextButton extends Component {
  render() {
    // console.log('check props in next', this.props)
    return (
      <Link to={ this.props.routeLink }>
        <div className="Next-button Container-center">
            <p className="Next-text">{ this.props.text }</p>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = state => {
  return {
    branch: state.shop.branch,
    branchLoading: state.shop.branchLoading,
    branchExists: state.shop.branchExists,
    routeLink: state.shop.routeLink
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (nextButton);
