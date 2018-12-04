import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from "./components/navbar/NavigationBar";
import Login from './components/login/Login';
import Register from './components/login/Register';
import CarTable from './components/car/CarTable';
import CityList from './components/city/CityList';
import Ratings from './components/ratings/Ratings';
import Payments from "./components/payments/Payments";
import Instructors from "./components/instructors/Instructors";
import ReservationList from "./components/reservations/ReservationsList";
import Drivings from "./components/drivings/Drivings";
import Booking from "./components/reservations/Booking";
import Course from "./components/course/Course";
// import DownBar from "./components/navbar/DownBar";

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/course" component={Course} />
            <Route path="/ratings" component={Ratings} />
            <Route path="/reservations" component={ReservationList} />
            <Route path="/drivings" component={Drivings} />
            <Route path="/book" component={Booking} />
            <Route path="/instructors" component={Instructors} />
            <Route path="/payments" component={Payments} />
            <Route path="/cars" component={CarTable} />
            <Route path="/cities" component={CityList} />
          </div>
        </Router>
        <NavigationBar />
        {/* <DownBar /> */}
      </div>

    );
  }
}