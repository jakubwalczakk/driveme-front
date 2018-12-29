import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { request } from "utils/APIUtils";
import Reservation from './Reservation';
import "./ReservationsList.css";

const reservationUrl = API_BASE_URL + '/reservation/student';

export default class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    request({
      url: reservationUrl,
      method: 'GET'
    }).then(data => this.setState({ reservations: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { reservations, isLoading, error } = this.state;

    if (error) {
      return <p id="reservationsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="reservationsLoadingLabel">Pobieranie danych...</p>
    }

    const reservationList = reservations.map(reservation=>
      <Reservation key={reservation.id} reservation={reservation}/>)

    return (
      <div id="reservationsTableContainer">
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
  }
}