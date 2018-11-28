// DON'T USE DYNAMIC COMPONENT FOR INPUT FORM SINCE REACT WILL RE-RENDER COMPONENT FOR ANY CHANGES
// Hence removeing CSS effect from active and valid input
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleInputChanges } from '../../store/firestore/transaction/transaction.actions';

class customerInputValid extends Component {
  render() {
    return (
      <div>
        <input 
          id={ this.props.inputId } 
          type={ this.props.inputType } 
          className="validate No-margin valid" 
          onChange={ this.props.handleInputChanges } 
          value={ this.props.inputValue }
        />
        <label 
          htmlFor={ this.props.inputId } 
          className="Form-text active"
        >{ this.props.labelValue }</label>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleInputChanges
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (customerInputValid);
