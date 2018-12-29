import React, { Component } from 'react';
import { Badge } from "react-bootstrap";
import { MINUTE_IN_MICROS } from "constants/constants";

export default class Driving extends Component {
  render() {
    console.log(this.props.driving)
    return (
      <tr key={this.props.driving.id}>
        <td>{this.props.driving.title}</td>
        <td>{this.props.driving.instructor.name} {this.props.driving.instructor.surname}</td>
        <td>{this.props.driving.car.brand} {this.props.driving.car.model}</td>
        <td>{this.props.driving.drivingCity}</td>
        <td>{this.props.driving.startDate}</td>
        <td>{this.props.driving.duration}</td>
        <td>
          <Badge>{this.props.driving.rating}</Badge>
        </td>
      </tr>
    )
  }
}