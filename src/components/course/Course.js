import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { API_BASE_URL, CURRENT_USER_ROLE } from "constants/constants";
import { request } from "utils/APIUtils";
import "./Course.css";

const courseUrl = API_BASE_URL + '/course';

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

    request({
      url: courseUrl + '/student',
      method: 'GET'
    }).then(data => this.setState({ course: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { course, isLoading, error } = this.state;
    var currenPaymentOfCourse = course.currentPayment;
    const courseCost = 1500.0;
    var percentPaymentOfCourse = currenPaymentOfCourse * 100 / courseCost;
    percentPaymentOfCourse = Math.round(percentPaymentOfCourse);

    var takenDrivingHours = course.takenDrivingHours;
    const amountOfCourseDrivingHours = 30;
    var percentOfCourseCompletion = takenDrivingHours * 100 / amountOfCourseDrivingHours;
    percentOfCourseCompletion = Math.round(percentOfCourseCompletion);

    if (error) {
      return <p className="courseInfoLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p className="courseInfoLabel">Pobieranie danych...</p>
    }

    if (CURRENT_USER_ROLE !== 'Kursant') {
      return <p className="courseInfoLabel">Nie posiadasz dostępu do tego zasobu!</p>
    } else {
      return (
        <div id="courseContainer">
          {/* <p id="courseLabel">Tutaj pojawią się informacje na temat Twojego kursu.</p> */}
          <p>Data rozpoczęcia kursu: {course.startDate}</p>
          <p>Wpłacona kwota: {percentPaymentOfCourse}% - {currenPaymentOfCourse}PLN
                  {currenPaymentOfCourse === 1500.0 &&
              <i id="paymentsAccepted" className="material-icons">check_circle</i>}</p>
          <p>Ukończonych godzin: {course.takenDrivingHours}h ({percentOfCourseCompletion}%)</p>
          <ProgressBar id="drivingsHoursProgressBar" bsStyle="success" now={percentOfCourseCompletion} />
          <p>Status: {course.status}</p>
        </div>
      );
    }
  }
}