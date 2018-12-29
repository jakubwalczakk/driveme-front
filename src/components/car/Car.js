import React, { Component } from "react";
import { Image } from "react-bootstrap";

export default class Car extends Component {
  render() {
    const car = this.props.car;
    return (
      <tr>
        <td>{car.brand}</td>
        <td>{car.model}</td>
        <td>{car.licensePlate}</td>
        <td>{car.gasType}</td>
        <td>
          <Image id="carImage" src={"data:image/jpeg;base64," + car.photo} rounded responsive />
        </td>
      </tr>)
  }
}