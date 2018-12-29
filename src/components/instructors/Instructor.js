import React, { Component } from "react";
import { Image } from "react-bootstrap";

export default class Instructor extends Component {
  render() {
    return (
      <tr key={this.props.instructor.id}>
        <td>
          <Image id="instructorPhoto" src={"data:image/jpeg;base64," + this.props.instructor.photo} rounded responsive />
        </td>
        <td>{this.props.instructor.name}</td>
        <td>{this.props.instructor.surname}</td>
        <td>{this.props.instructor.email}</td>
        <td>{this.props.instructor.phoneNumber}</td>
      </tr>)
  }
}