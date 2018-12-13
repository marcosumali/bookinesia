import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../assets/css/general.css';
import './branchDetails.css';
import MapContainer from './locationMap';

class contentLocation extends Component {
  render() {
    // console.log('from content location', this.props)
    
    // Below are width and height settings that needs to match with size of MapContainer except height
    const innerWidth = window.innerWidth
    const setWidth = innerWidth - 40
    const setHeight = setWidth / 3 * 2
    const mapStyles = {}

    mapStyles['width'] = `${setWidth}px`
    mapStyles['height'] = `${setHeight}px`

    return (
      <div className="row No-margin No-padding">
        <div className="col s12 No-padding Margin-b-8" style={ mapStyles }>
          <MapContainer branch={ this.props.branch }/>
        </div>
        <div className="col s12 No-padding">
          <p className="Card-text No-margin" style={{ fontSize: '0.75em' }}>{ this.props.branch.address }</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    params: state.shop.params,
    branch: state.shop.branch,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (contentLocation);
