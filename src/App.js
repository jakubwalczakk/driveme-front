import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from "./components/navbar/NavigationBar";
import Login from './components/login/Login';
import Register from './components/login/Register';
import CarTable from './components/car/CarTable';
import CityList from './components/city/CityList';
import Rating from './components/ratings/Rating';
import Payments from "./components/payments/Payments";
import Instructors from "./components/instructors/Instructors";

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/instructors" component={Instructors} />
            <Route path="/ratings" component={Rating} />
            <Route path="/payments" component={Payments} />
            <Route path="/cars" component={CarTable} />
            <Route path="/cities" component={CityList} />
          </div>
        </Router>
        {/* <NavigationBar /> */}
      </div>

    );
  }
}