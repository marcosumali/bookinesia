import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import logo from './logo.svg';
import { getData } from './store/firestore/shop/shop.actions';

class App extends Component {
  componentDidMount() {
    // console.log('didmount', this.props.getData())
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getData,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (App);

// export default App;
