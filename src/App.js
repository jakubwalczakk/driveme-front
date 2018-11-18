import React, { Component } from 'react';
import './style/App.css';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div>
        <Register />
        {/* <Login/> */}
      </div>
    );
  }
}

export default App;
