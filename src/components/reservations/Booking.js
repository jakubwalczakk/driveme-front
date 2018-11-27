import React, { Component } from "react";
import "./Booking.css";

export default class Booking extends Component {
  render() {
    return (
      <div id="bookingContainer">
        <p id="bookingLabel">Tutaj możesz dokonać rezerwacji.</p>
        <select>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <br/>
        <br/>
        <select>
          <option value="V">V</option>
          <option value="X">X</option>
          <option value="Y">Y</option>
          <option value="Z">Z</option>
        </select>
      </div>
    );
  }
}