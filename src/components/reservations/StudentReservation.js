import React, { Component } from "react";

export default class StudentReservation extends Component {
  render() {
    console.log(this.props)
    return (
      <tr key={this.props.reservation.id}>
        <td>
          {this.props.reservation.instructor.name} {this.props.reservation.instructor.surname}
        </td>
        <td>{this.props.reservation.carBrand} </td>
        <td>{this.props.reservation.drivingCity}</td>
        <td>{this.props.reservation.startDate}</td>
        <td>{this.props.reservation.duration}</td>
      </tr>
    )
  }
}