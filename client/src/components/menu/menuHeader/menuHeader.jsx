import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../assets/css/general.css';
import './menuHeader.css';
import PreviousArrowSvg from '../../svg/arrowPreviousSvg';
import { clearUserState } from '../../../store/firestore/customer/customer.actions';

class menuHeader extends Component {
  
  render() {
    // console.log('from menuHeader', this.props)
    return (
      <div className="row No-margin">
        <div className="Menu-header-container Container-center-cross">

          {/* Previous Arrow Section */}
          <div 
            className="col s2 Height-100 No-padding No-margin Container-center" 
            onClick={ () => { this.props.history.goBack(); this.props.clearUserState(); } 
          }>
            <PreviousArrowSvg color="#666666" />
          </div>
          
          {/* Text Section */}
          <div className="col s10 Height-100 No-margin No-padding Container-center" >
            <div className="Menu-header-text Text-capitalize" style={{ marginLeft: '2.5em' }}>{ this.props.text }</div>
          </div>

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  clearUserState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (menuHeader);