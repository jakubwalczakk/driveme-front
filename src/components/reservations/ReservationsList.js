import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./ReservationsList.css";

export default class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/reservation')
      .then(res => res.json())
      .then(json => {
        this.setState({
          reservations: json,
        })
      });
  }
  render() {

    var { reservations } = this.state;

    return (<div id="reservationsTableContainer">
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
          {reservations.map(reservation=>(
            <tr>
              <td>
                {reservation.instructor.email} 
              </td>
              <td>
                {reservation.car.licensePlate}
              </td>
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