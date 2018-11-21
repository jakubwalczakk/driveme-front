import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from "./components/navbar/NavigationBar";
import Login from './components/login/Login';
import Register from './components/login/Register';
import CarTable from './components/car/CarTable';
import CityList from './components/city/CityList';
// import NavigationBar from './components/navbar/NavigationBar';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/car" component={CarTable} />
            <Route path="/city" component={CityList} />
          </div>
        </Router>
        <NavigationBar />
      </div>
    );
  }
}