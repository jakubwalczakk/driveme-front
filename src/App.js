import React, { Component } from 'react';
import './style/App.css';
import BgImage from './components/BgImage';
import Login from './components/Login';
import Register from './components/Register';
import CarList from './components/CarList';

class App extends Component {
  render() {
    return (
      <div id="main-div">
        {/* <CarList /> */}
        {/* <Login /> */}
        {/* <BgImage /> */}
        <Register/>
      </div>
    );
  }
}

export default App;
