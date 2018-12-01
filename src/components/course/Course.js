import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import "./Course.css";

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: []
    }
  }

  componentDidMount() {

    fetch('http://localhost:8080/course/1')
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
    var percentPaymentOfCourse = currenPaymentOfCourse*100/courseCost;

    return (
      <div id="courseContainer">
        <p id="courseLabel">Tutaj pojawią się informacje na temat Twojego kursu.</p>
        <p>Data rozpoczęcia: {course.startDate}</p>
        <p>Liczba zaliczonych godzin: {course.takenDrivingHours}h</p>
        <p>Twój postęp: {percentPaymentOfCourse}%</p>
        <ProgressBar id="paymentsProgressBar" bsStyle="success" now={percentPaymentOfCourse} />
        <p>Status: {course.status}</p>
      </div>
    );
  }
}