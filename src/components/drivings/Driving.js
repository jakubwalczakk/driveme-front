import React, { Component } from 'react';
import { Badge } from "react-bootstrap";
import { trimDate, convertTime } from "utils/APIUtils";

export default class Driving extends Component {
  render() {
    const driving = this.props.driving;
    var date = trimDate((new Date()).toISOString());
    var time = convertTime(driving.duration);
    return (
      <tr key={driving.id}>
        <td>{driving.title}</td>
        <td>{driving.instructor.name} {driving.instructor.surname}</td>
        <td>{driving.car.brand} {driving.car.model}</td>
        <td>{driving.drivingCity}</td>
        <td>{driving.startDate}</td>
        <td>
          {`${time.hours}h ${time.minutes !== 0 ? (time.minutes + ` min.`) : ''}`}
        </td>
        <td>
          <Badge>{driving.rating}</Badge>
        </td>
      </tr>
    )
  }
}