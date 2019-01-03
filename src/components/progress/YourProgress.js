import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Drivings from "components/drivings/Drivings";
import { API_BASE_URL, CURRENT_USER_ROLE } from "constants/constants";
import { request } from "utils/APIUtils";
import "./YourProgress.css";

const courseUrl = API_BASE_URL + '/course';

export default class YourProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      isLoading: false,
      error: null,
      currentLoggedUser: ''
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    request({
      url: courseUrl + '/student',
      method: 'GET'
    }).then(data => this.setState({ course: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { course, isLoading, error } = this.state;

    var takenDrivingHours = course.takenDrivingHours;
    const amountOfCourseDrivingHours = 30;
    var percentOfCourseCompletion = Math.round(takenDrivingHours * 100 / amountOfCourseDrivingHours);

    if (error) {
      return <p className="yourProgressInfoLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p className="yourProgressInfoLabel">Pobieranie danych...</p>
    }

    if (CURRENT_USER_ROLE !== 'Kursant') {
      return <p className="yourProgressInfoLabel">Nie posiadasz dostępu do tego zasobu!</p>
    } else {
      return (
        <div>
          <p id="progressLabel">Twój postęp: {percentOfCourseCompletion}%</p>
          <ProgressBar id="ratingProgressBar" bsStyle="success" now={percentOfCourseCompletion} />
          <Drivings />
        </div>);
    }
  }
}