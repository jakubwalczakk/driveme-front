import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { API_BASE_URL, USER_ROLES } from "constants/constants";
import { request } from "utils/APIUtils";
import { withRouter } from "react-router-dom";
import InstructorReservation from './InstructorReservation';
import StudentReservation from './StudentReservation';
import "./ReservationsList.css";
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from "../../common/ServerError";
import AccessDenied from "../../common/AccessDenied";

const reservationUrl = API_BASE_URL + '/reservation';

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      instructorReservations: [],
      isLoading: false,
      error: null,
    };
    this.prepareTheContent = this.prepareTheContent.bind(this);
  }

  prepareTheContent() {
    var currentUserRole = this.props.currentUserRole;

    var { reservations, instructorReservations } = this.state;

    if (currentUserRole === USER_ROLES.Instructor) {

      const reservationList = instructorReservations.map(reservation =>
        <InstructorReservation key={reservation.id} reservation={reservation} />)

      return (
        <div id="reservationsTableContainer">
          <p id="reservationsLabel">Lista Twoich rezerwacji (instruktor)</p>
          <Table id="reservationsTable" responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th>Kursant</th>
                <th>Samochód</th>
                <th>Miasto</th>
                <th>Data rozpoczęcia</th>
                <th id="reservationDurationCol">Czas trwania</th>
                <th>Potwierdzenie</th>
              </tr>
            </thead>
            <tbody>
              {reservationList}
            </tbody>
          </Table>
        </div>);
    } else if (currentUserRole === USER_ROLES.Student) {

      const reservationList = reservations.map(reservation =>
        <StudentReservation key={reservation.id} reservation={reservation} />)

      return (<div id="reservationsTableContainer">
        <Button id="bookButton" onClick={() => this.props.history.push('/book')}>
          Wykonaj rezerwację
        </Button>
        <p id="reservationsLabel">Lista dokonanych przez Ciebie rezerwacji</p>
        <Table id="reservationsTable" responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Instruktor</th>
              <th>Samochód</th>
              <th>Miasto</th>
              <th>Data rozpoczęcia</th>
              <th id="reservationDurationCol">Czas trwania</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservationList}
          </tbody>
        </Table>
      </div>);
    } else {
      return <AccessDenied />
    }
  }

  componentDidMount() {
    var currentUserRole = this.props.currentUserRole;
    this.setState({ isLoading: true });

    if (currentUserRole === USER_ROLES.Instructor) {
      request(
        'GET',
        reservationUrl + '/instructor'
      ).then(data => this.setState({ instructorReservations: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    } else if (currentUserRole === USER_ROLES.Student) {
      request(
        'GET',
        reservationUrl + '/student'
      ).then(data => this.setState({ reservations: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  render() {

    var { isLoading, error } = this.state;

    if (error) {
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    let content = this.prepareTheContent();
    return (
      <div>{content}</div>
    );
  }
}

export default withRouter(Reservations);