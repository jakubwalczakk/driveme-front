import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import "./ReservationsList.css";

const studentId = 11;
const reservationUrl = API_BASE_URL + '/reservation/student/' + studentId;

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

    fetch(reservationUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy rezerwacji...');
        }
      })
      .then(data => this.setState({ reservations: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { reservations, isLoading, error } = this.state;

    if (error) {
      return <p id="reservationsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="reservationsLoadingLabel">Loading...</p>
    }

    return (
      <div id="reservationsTableContainer">
        <Button id="bookButton" href="/book">
          Wykonaj rezerwację
        </Button>
        <p id="reservationsLabel">Lista dokonanych przez Ciebie rezerwacji</p>
        <Table id="reservationsTable" responsive striped bordered condensed hover>
          <thead>
            <th>Instruktor</th>
            <th>Samochód</th>
            <th>Miasto</th>
            <th>Data rozpoczęcia</th>
            <th>Data końcowa</th>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id}>
                <td>
                  {reservation.instructor.name} {reservation.instructor.surname}
                </td>
                <td>{reservation.car.brand} {reservation.car.model} - {reservation.car.licensePlate} </td>
                <td>{reservation.drivingCity}</td>
                <td>{reservation.startDate}</td>
                <td>{reservation.finishDate}</td>
              </tr>
            ))}
          </tbody>

        </Table>
      </div>);
  }
}