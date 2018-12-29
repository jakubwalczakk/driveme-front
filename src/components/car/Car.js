import React, { Component } from "react";
import { Image } from "react-bootstrap";

export default class Car extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.car.brand}</td>
        <td>{this.props.car.model}</td>
        <td>{this.props.car.licensePlate}</td>
        <td>{this.props.car.gasType}</td>
        <td>
          <Image id="carImage" src={"data:image/jpeg;base64," + this.props.car.photo} rounded responsive />
        </td>
      </tr>)
  }
}