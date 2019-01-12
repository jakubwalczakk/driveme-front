import React, { Component } from "react";
import { Image } from "react-bootstrap";
import './CityList.css';

export default class Car extends Component {
  render() {
    var city = this.props.city;
    return (
      <tr>
        <td id="cityNamePhoto">
          {<Image id="drivingCityNamePhoto" src={"data:image/jpeg;base64," + city.image} responsive />}
        </td>
        <td>{city.description}</td>
      </tr>
    );
  }
}