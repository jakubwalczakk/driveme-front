import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Drivings from "components/drivings/Drivings";
import { API_BASE_URL } from "constants/constants";
import "./YourProgress.css";

const courseId = 1;
const ratingUrl = API_BASE_URL + '/rating';
const courseUrl = API_BASE_URL + '/course';

export default class YourProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(courseUrl +'/' + courseId)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania informacji na temat kursu...');
        }
      })
      .then(data => this.setState({ course: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }


  render() {

    var { course } = this.state;

    var takenDrivingHours = course.takenDrivingHours;
    const amountOfCourseDrivingHours = 30;
    var percentOfCourseCompletion = Math.round(takenDrivingHours * 100 / amountOfCourseDrivingHours);

    return (
      <div>
        <p id="progressLabel">Twój postęp: {percentOfCourseCompletion}%</p>
        <ProgressBar id="ratingProgressBar" bsStyle="success" now={percentOfCourseCompletion} />
        <Drivings />
      </div>);
  }
}