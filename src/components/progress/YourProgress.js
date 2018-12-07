import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Drivings from "components/drivings/Drivings";
import { environment } from "environments/environment";
import "./YourProgress.css";

const ratingUrl = environment.apiUrl + '/rating';
const courseUrl = environment.apiUrl + '/course';

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

    fetch(courseUrl + '/1')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy miast...');
        }
      })
      .then(data => this.setState({ course: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }


  render() {

    var { course } = this.state;

    var takenDrivingHours = this.state.course.takenDrivingHours;
    const amountOfCourseDrivingHours = 30;
    var percentOfCourseCompletion = takenDrivingHours * 100 / amountOfCourseDrivingHours;
    percentOfCourseCompletion = Math.round(percentOfCourseCompletion * 1) / 1;

    return (
      <div>
        <p id="progressLabel">Twój postęp: {percentOfCourseCompletion}%</p>
        <ProgressBar id="ratingProgressBar" bsStyle="success" now={percentOfCourseCompletion} />
        <Drivings />
      </div>);
  }
}