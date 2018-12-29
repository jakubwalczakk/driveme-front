import React, { Component } from "react";
import { Image } from "react-bootstrap";

export default class Instructor extends Component {
  render() {
    const instructor = this.props.instructor;
    return (
      <tr key={instructor.id}>
        <td>
          <Image id="instructorPhoto" src={"data:image/jpeg;base64," + instructor.photo} rounded responsive />
        </td>
        <td>{instructor.name}</td>
        <td>{instructor.surname}</td>
        <td>{instructor.email}</td>
        <td>{instructor.phoneNumber}</td>
      </tr>)
  }
}