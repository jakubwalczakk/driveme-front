import React, { Component } from "react";
import { Table, FormGroup, FormControl, ControlLabel, Button, Modal } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale'
import { API_BASE_URL, USER_ROLES } from "constants/constants";
import { request } from "utils/APIUtils";
import { withRouter } from 'react-router-dom';
import DrivingInfo from './DrivingInfo';
import AccessDenied from "../../common/AccessDenied";
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from "../../common/ServerError";
import "./Ratings.css";
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('enGB', enGB);

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const drivingUrl = API_BASE_URL + '/driving';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivings: [],
      isLoading: false,
      error: null,
      eventsStartDate: new Date().addDays(-7),
      eventsFinishDate: new Date().addDays(14)
    }

    this.getInstructorDrivings = this.getInstructorDrivings.bind(this);
    this.handleEventsStartDateChange = this.handleEventsStartDateChange.bind(this);
    this.handleEventsFinishDateChange = this.handleEventsFinishDateChange.bind(this);
  }

  handleEventsStartDateChange(event) {
    this.setState({ eventsStartDate: event })
  }

  handleEventsFinishDateChange(event) {
    this.setState({ eventsFinishDate: event })
  }

  getInstructorDrivings() {
    this.setState({ isLoading: true });
    var { eventsStartDate, eventsFinishDate } = this.state;
    request(
      'GET',
      drivingUrl + `/instructor?start=${eventsStartDate.toISOString()}&finish=${eventsFinishDate.toISOString()}`
    ).then(data => this.setState({ drivings: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { drivings, isLoading, error, eventsStartDate, eventsFinishDate } = this.state;
    var currentUserRole = this.props.currentUserRole;

    if (error) {
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (currentUserRole !== USER_ROLES.Instructor) {
      return <AccessDenied />
    } else {

      const drivingsInfoList = drivings.map(driving =>
        <DrivingInfo key={driving.id} driving={driving} />)

      return (
        <div id="instructorDrivingsTableContainer">
          <p id="instructorDrivingsLabel">Lista przeprowadzonych przez Ciebie jazd szkoleniowych</p>
          <div id="rangeOfDatesContainer">
            <FormGroup className="date-form">
              <ControlLabel>Data rozpoczęcia</ControlLabel>
              <DatePicker
                selected={eventsStartDate}
                selectsStart
                dateFormat="dd MMMM, yyyy"
                startDate={new Date().addDays(-7)}
                onChange={this.handleEventsStartDateChange}
                locale='enGB'
                showMonthDropdown
                showWeekNumbers />
            </FormGroup>
            <FormGroup className="date-form">
              <ControlLabel>Data końcowa</ControlLabel>
              <DatePicker
                selected={eventsFinishDate}
                selectsEnd
                dateFormat="dd MMMM, yyyy"
                startDate={new Date().addDays(14)}
                onChange={this.handleEventsFinishDateChange}
                locale='enGB'
                showMonthDropdown
                showWeekNumbers />
            </FormGroup>
            <Button id="searchDrivingsButton" onClick={()=>this.getInstructorDrivings()}>
              Szukaj
            </Button>
          </div>
          <Table id="ratingsTable" responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th>Student</th>
                <th>Tytuł</th>
                <th>Samochód</th>
                <th>Miasto</th>
                <th>Data rozpoczęcia</th>
                <th>Czas trwania</th>
                <th>Ocena</th>
              </tr>
            </thead>
            <tbody>
              {drivingsInfoList}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default withRouter(Ratings);