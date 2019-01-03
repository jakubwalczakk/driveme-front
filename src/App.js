import React, { Component } from "react";
import { Route } from 'react-router-dom';
import MainPage from "./components/mainpage/MainPage";
import NavigationBar from "./components/navbar/NavigationBar";
import Login from './components/login/Login';
import Register from './components/login/Register';
import ProfileSettings from './components/profile/ProfileSettings';
import Cars from './components/car/Cars';
import CityList from './components/city/CityList';
import Ratings from './components/ratings/Ratings';
import Payments from "./components/payments/Payments";
import Instructors from "./components/instructors/Instructors";
import ReservationList from "./components/reservations/ReservationsList";
import Booking from "./components/reservations/Booking";
import Course from "./components/course/Course";
import YourProgress from "./components/progress/YourProgress";
import Students from "./components/students/Students";
import Exams from "./components/exams/Exams";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      isAuthenticated: false,
      isLoading: false
    }
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfileSettings} />
        <Route path="/course" component={Course} />
        <Route path="/progress" component={YourProgress} />
        <Route path="/drivings" component={Ratings} />
        <Route path="/students" component={Students} />
        <Route path="/reservations" component={ReservationList} />
        <Route path="/book" component={Booking} />
        <Route path="/instructors" component={Instructors} />
        <Route path="/payments" component={Payments} />
        <Route path="/cars" component={Cars} />
        <Route path="/cities" component={CityList} />
        <Route path="/exams" component={Exams} />
      </div>
    );
  }
}