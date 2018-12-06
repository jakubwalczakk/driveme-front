import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { environment } from "environments/environment";
import "./Course.css";

const courseUrl = environment.apiUrl + '/course';

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {

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
    var currenPaymentOfCourse = this.state.course.currentPayment;
    const courseCost = 1500.0;
    var percentPaymentOfCourse = currenPaymentOfCourse * 100 / courseCost;
    percentPaymentOfCourse = Math.round(percentPaymentOfCourse * 1) / 1;

    var takenDrivingHours = this.state.course.takenDrivingHours;
    const amountOfCourseDrivingHours = 30;
    var percentOfCourseCompletion = takenDrivingHours * 100 / amountOfCourseDrivingHours;
    percentOfCourseCompletion = Math.round(percentOfCourseCompletion * 1) / 1;

    return (
      <div id="courseContainer">
        {/* <p id="courseLabel">Tutaj pojawią się informacje na temat Twojego kursu.</p> */}
        <p>Data rozpoczęcia kursu: {course.startDate}</p>
        <p>Wpłacona kwota: {percentPaymentOfCourse}% - {currenPaymentOfCourse}PLN</p>
        <p>Liczba ukończonych godzin: {course.takenDrivingHours}h ({percentOfCourseCompletion}%)</p>
        <ProgressBar id="drivingsHoursProgressBar" bsStyle="success" now={percentOfCourseCompletion} />
        <p>Status: {course.status}</p>
      </div>
    );
  }
}