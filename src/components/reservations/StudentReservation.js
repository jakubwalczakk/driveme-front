import React, { Component } from "react";
import {convertTime} from 'utils/APIUtils';
import './ReservationsList.css';

export default class StudentReservation extends Component {

  render() {
    var reservation = this.props.reservation;
    var time = convertTime(reservation.duration);
    return (
      <tr key={reservation.id}>
        <td>
          {reservation.instructor.name} {reservation.instructor.surname}
        </td>
        <td>{reservation.carBrand} </td>
        <td>{reservation.drivingCity}</td>
        <td>{reservation.startDate}</td>
        <td>{`${time.hours}h ${time.minutes !== 0 ? (time.minutes + ` min.`) : ''}`}</td>
        <td>
          {reservation.accepted === true &&
            <i id="reservationAccepted" className="material-icons">check_circle</i>}
          {reservation.accepted === false &&
            <i id="reservationDenied" className="material-icons">cancel</i>}
          {reservation.accepted === null &&
            <i id="reservationUndefined" className="material-icons">help</i>}</td>
      </tr>
    )
  }
}