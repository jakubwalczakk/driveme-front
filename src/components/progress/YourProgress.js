import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Drivings from "components/drivings/Drivings";
import { API_BASE_URL } from "constants/constants";
import { request } from "utils/APIUtils";
import { withRouter } from 'react-router-dom';
import "./YourProgress.css";
import LoadingIndicator from "../../common/LoadingIndicator";
import AccessDenied from "../../common/AccessDenied";
import { USER_ROLES } from "../../constants/constants";
import ServerError from "../../common/ServerError";

const courseUrl = API_BASE_URL + '/course';

class YourProgress extends Component {
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

    request(
      'GET',
      courseUrl + '/student'
    ).then(data => this.setState({ course: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    var { course, isLoading, error } = this.state;
    var currentUserRole = this.props.currentUserRole;

    var takenDrivingHours = course.takenDrivingHours;
    const amountOfCourseDrivingHours = 30;
    var percentOfCourseCompletion = Math.round(takenDrivingHours * 100 / amountOfCourseDrivingHours);

    if (error) {
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (currentUserRole !== USER_ROLES.Student) {
      return <div>
        <AccessDenied />
      </div>
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

export default withRouter(YourProgress);