import React, { Component } from 'react';
import { Badge } from "react-bootstrap";

export default class Driving extends Component {
  render() {
    const driving = this.props.driving;
    return (
      <tr key={driving.id}>
        <td>{driving.title}</td>
        <td>{driving.instructor.name} {driving.instructor.surname}</td>
        <td>{driving.car.brand} {driving.car.model}</td>
        <td>{driving.drivingCity}</td>
        <td>{driving.startDate}</td>
        <td>{driving.duration}</td>
        <td>
          <Badge>{driving.rating}</Badge>
        </td>
      </tr>
    )
  }
}