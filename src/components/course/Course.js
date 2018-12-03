import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { environment } from "environments/environment";
import "./Course.css";

const courseUrl = environment.apiUrl + '/course';

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: []
    }
  }

  componentDidMount() {

    fetch(courseUrl + '/1')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => this.setState({ course: data }));
  }

  render() {

    var { course } = this.state;
    var currenPaymentOfCourse = this.state.course.currentPayment;
    const courseCost = 1500.0;
    var percentPaymentOfCourse = currenPaymentOfCourse * 100 / courseCost;
    percentPaymentOfCourse = Math.round(percentPaymentOfCourse * 100) / 100;

    var takenDrivingHours = this.state.course.takenDrivingHours;
    const amountOfCourseDrivingHours = 30;
    var percentOfCourseCompletion = takenDrivingHours * 100 / amountOfCourseDrivingHours;
    percentOfCourseCompletion = Math.round(percentOfCourseCompletion * 100) / 100;

    return (
      <div id="courseContainer">
        <p id="courseLabel">Tutaj pojawią się informacje na temat Twojego kursu.</p>
        <p>Data rozpoczęcia: {course.startDate}</p>
        <p>Liczba zaliczonych godzin: {course.takenDrivingHours}h ({percentOfCourseCompletion}%)</p>
        <ProgressBar id="drivingsHoursProgressBar" bsStyle="success" now={percentOfCourseCompletion} />
        <p>Kwota zapłacona: {percentPaymentOfCourse}% - {currenPaymentOfCourse}PLN</p>
        <p>Status: {course.status}</p>
      </div>
    );
  }
}