import React, { Component } from "react";
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
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
import { API_BASE_URL, ACCESS_TOKEN, CURRENT_USER, CURRENT_USER_ROLE, IS_AUTHENTICATED } from './constants/constants';
import { request } from './utils/APIUtils';
import LoadingIndicator from "./common/LoadingIndicator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem(IS_AUTHENTICATED),
      isLoading: false,
      currentUser: JSON.parse(localStorage.getItem(CURRENT_USER)),
      currentUserRole: localStorage.getItem(CURRENT_USER_ROLE)
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
  }

  loadCurrentUser() {
    this.setState({ isLoading: true });

    request(
      'GET',
      API_BASE_URL + '/user/me'
    ).then(response => {
      this.setState({
        currentUser: response,
        isLoading: false
      }, () => {
        localStorage.setItem(CURRENT_USER, JSON.stringify(this.state.currentUser));
      })
    }).catch(error => {
      this.setState({
        isLoading: false,
        isAuthenticated: false
      })
    });
  }

  componentDidMount() {
    var { currentUser, isAuthenticated } = this.state;
    if (currentUser === (null || undefined) && isAuthenticated) {
      this.loadCurrentUser();
    }
  }

  async handleLogout() {
    await this.setState({
      currentUser: null,
      isAuthenticated: false,
      currentUserRole: null
    }, () => {
      localStorage.clear();
    })
    this.props.history.push("/");
  }

  async handleLogin() {

    var parsedToken = localStorage.getItem(ACCESS_TOKEN) ?
      JSON.parse(atob(localStorage.getItem(ACCESS_TOKEN).split('.')[1])) : null;
    await this.setState({
      isAuthenticated: true,
      currentUserRole: parsedToken.scopes,
    }, () => {
      localStorage.setItem(IS_AUTHENTICATED, this.state.isAuthenticated);
      localStorage.setItem(CURRENT_USER_ROLE, this.state.currentUserRole);
    })
    this.loadCurrentUser();
  }

  render() {
    var { isLoading, isAuthenticated, currentUserRole, currentUser } = this.state;
    if (isLoading) {
      return <LoadingIndicator />
    }
    return (
      <div>
        <NavigationBar handleLogout={this.handleLogout}
          isAuthenticated={isAuthenticated}
          currentUserRole={currentUserRole}
          currentUser={currentUser} />
        <Route exact path="/" render={() => {
          if (!isAuthenticated) {
            return < Login onLogin={this.handleLogin} />
          } else {
            return <MainPage isAuthenticated={isAuthenticated}
              currentUserRole={currentUserRole}
              currentUser={currentUser} />
          }
        }} />
        <Route path="/register"
          render={() =>
            <Register isAuthenticated={isAuthenticated}
              currentUserRole={currentUserRole} />} />
        <Route path="/profile"
          render={() =>
            <ProfileSettings isAuthenticated={isAuthenticated}
              currentUserRole={currentUserRole}
              currentUser={currentUser} />} />
        <Route path="/course" render={() =>
          <Course isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />} />
        <Route path="/progress" render={() =>
          <YourProgress isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />} />
        <Route path="/drivings" render={() =>
          <Ratings isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />} />
        <Route path="/students" render={() =>
          <Students isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />} />
        <Route path="/exams" render={() =>
          <Exams isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />}
        />
        <Route path="/reservations" render={() =>
          <ReservationList isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />} />
        <Route path="/book" render={() =>
          <Booking isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />} />
        <Route path="/payments" render={() =>
          <Payments isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole}
          />} />
        <Route path="/instructors" render={() =>
          <Instructors isAuthenticated={isAuthenticated} />} />
        <Route path="/cars" render={() =>
          <Cars isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />} />
        <Route path="/cities" render={() =>
          <CityList isAuthenticated={isAuthenticated}
            currentUserRole={currentUserRole} />}
        />

      </div >
    );
  }
}

export default withRouter(App);