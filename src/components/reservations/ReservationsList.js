import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { API_BASE_URL, CURRENT_USER_ROLE } from "constants/constants";
import { request } from "utils/APIUtils";
import InstructorReservation from './InstructorReservation';
import StudentReservation from './StudentReservation';
import "./ReservationsList.css";

const reservationUrl = API_BASE_URL + '/reservation';

export default class Reservations extends Component {
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

    var { reservations, instructorReservations } = this.state;

    if (CURRENT_USER_ROLE === 'Instruktor') {

      const reservationList = instructorReservations.map(reservation =>
        <InstructorReservation key={reservation.id} reservation={reservation} />)

      return (
        <div id="reservationsTableContainer">
          <p id="reservationsLabel">Lista Twoich rezerwacji (instruktor)</p>
          <Table id="reservationsTable" responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th>Instruktor</th>
                <th>Samochód</th>
                <th>Miasto</th>
                <th>Data rozpoczęcia</th>
                <th id="reservationDurationCol">Czas trwania (min.)</th>
                <th>Potwierdzenie</th>
              </tr>
            </thead>
            <tbody>
              {reservationList}
            </tbody>
          </Table>
        </div>);
    } else if (CURRENT_USER_ROLE === 'Kursant') {

      const reservationList = reservations.map(reservation =>
        <StudentReservation key={reservation.id} reservation={reservation} />)

      return (<div id="reservationsTableContainer">
        <Button id="bookButton" href="/book">
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
              <th id="reservationDurationCol">Czas trwania (min.)</th>
            </tr>
          </thead>
          <tbody>
            {reservationList}
          </tbody>
        </Table>
      </div>);
    } else {
      return <p>Nie posiadasz dostępu do tego zasobu!</p>
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    if (CURRENT_USER_ROLE === "Instruktor") {
      request({
        url: reservationUrl + '/instructor',
        method: 'GET'
      }).then(data => this.setState({ instructorReservations: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    } else if (CURRENT_USER_ROLE === 'Kursant') {
      request({
        url: reservationUrl + '/student',
        method: 'GET'
      }).then(data => this.setState({ reservations: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  render() {

    var { isLoading, error } = this.state;

    if (error) {
      return <p id="reservationsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="reservationsLoadingLabel">Pobieranie danych...</p>
    }

    let content = this.prepareTheContent();
    return (
      <div>{content}</div>
    );
  }
}