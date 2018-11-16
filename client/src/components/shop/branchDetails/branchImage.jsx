import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../assets/css/general.css';
import './branchDetails.css';

class branchImage extends Component {
  render() {
    // console.log('from branch image',this.props)
    return (
      <div className="row No-margin No-padding">
        {
          this.props.branchLoading ?
          <div className="Branch-details-image-loading"></div>
          :
          <img className="Branch-details-image animated fadeIn delay-1s" src={ this.props.branch.picture } alt="branch-img" />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    branch: state.shop.branch,
    branchLoading: state.shop.branchLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (branchImage);

