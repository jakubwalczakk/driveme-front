import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { ACCESS_TOKEN } from 'constants/constants';
import { getCurrentUser } from './utils/APIUtils';
import NavigationBar from "./components/navbar/NavigationBar";
import Login from './components/login/Login';
import Register from './components/login/Register';
import ProfileSettings from './components/profile/ProfileSettings';
import CarTable from './components/car/CarTable';
import CityList from './components/city/CityList';
import Ratings from './components/ratings/Ratings';
import Payments from "./components/payments/Payments";
import Instructors from "./components/instructors/Instructors";
import ReservationList from "./components/reservations/ReservationsList";
import Drivings from "./components/drivings/Drivings";
import Booking from "./components/reservations/Booking";
import Course from "./components/course/Course";
import YourProgress from "./components/progress/YourProgress";
// import DownBar from "./components/navbar/DownBar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo = "/") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/");;
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <Route exact path="/" component={Course} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfileSettings} />
        <Route path="/course" component={Course} />
        <Route path="/progress" component={YourProgress} />
        <Route path="/rate" component={Ratings} />
        <Route path="/reservations" component={ReservationList} />
        <Route path="/drivings" component={Drivings} />
        <Route path="/book" component={Booking} />
        <Route path="/instructors" component={Instructors} />
        <Route path="/payments" component={Payments} />
        <Route path="/cars" component={CarTable} />
        <Route path="/cities" component={CityList} />
      </div>

    );
  }
}