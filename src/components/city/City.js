import React, { Component } from "react";
import { Image } from "react-bootstrap";

export default class Car extends Component {
  render() {
    return (
      <tr>
        <td>
          {<Image id="drivingCityNamePhoto" src={"data:image/jpeg;base64," + this.props.city.image} responsive />}
        </td>
        <td>{this.props.city.description}</td>
      </tr>
    );
  }
}