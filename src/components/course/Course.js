import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { request } from "utils/APIUtils";
import { API_BASE_URL, USER_ROLES } from "../../constants/constants";
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from '../../common/ServerError';
import "./Course.css";
import AccessDenied from "../../common/AccessDenied";

const courseUrl = API_BASE_URL + '/course';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {

    request(
      'GET',
      courseUrl + '/student'
    ).then(data => this.setState({ course: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    var currentUserRole = this.props.currentUserRole;

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
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (currentUserRole !== USER_ROLES.Student) {
      return <AccessDenied />
    } else {
      return (
        <div id="courseContainer">
          {/* <p id="courseLabel">Tutaj pojawią się informacje na temat Twojego kursu.</p> */}
          <p>Data rozpoczęcia kursu: {course.startDate}</p>
          <p>Wpłacona kwota: {percentPaymentOfCourse}% - {currenPaymentOfCourse} zł
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

export default withRouter(Course);