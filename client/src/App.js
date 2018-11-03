import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import './App.css';
// import logo from './logo.svg';
import './assets/css/shop.css';
import { getData } from './store/firestore/shop/shop.actions';

class App extends Component {
  componentDidMount() {
    // console.log('didmount', this.props.getData())
    console.log(process.env)
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
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
        </header> */}
        <h1>Bookinesia</h1>
        
        <div className="row Shop-header Container-center">
          <div className="col s1 Height-100 No-padding Container-center" style={{ justifyContent: 'flex-end' }}>
              <i className="material-icons border-red">
                arrow_back_ios
              </i>
          </div>

          <div className="col s2 Height-100 No-padding Container-center">
            <img src={ process.env.PUBLIC_URL + '/img/dummy/gentology-logo.jpg' } className="No-padding Shop-logo" alt="Shop-logo" />
          </div>

          <div className="col s9 Height-100 Container-center">
            <div className="col s12 No-padding Container-center border-red">
                <p className="No-margin Shop-header-category border-blue">Barbershop</p>
                <p className="No-margin Shop-header-name border-blue">Gentology</p>
            </div>
          </div>

        </div>




        
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
