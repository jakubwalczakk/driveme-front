import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class CalendarEvent extends Component {
  render() {

    const reservation = this.props.reservation;

    return (
      <tr key={reservation.id}>
        <td>
          {reservation.instructor.name} {reservation.instructor.surname}
        </td>
        <td>{reservation.carBrand} </td>
        <td>{reservation.drivingCity}</td>
        <td>{reservation.startDate}</td>
        <td>{reservation.duration}</td>
        <td>{reservation.status &&
          <Button>Akceptuj</Button>}</td>
      </tr>
    )
  }
}