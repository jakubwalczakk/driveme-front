import React, { Component } from "react";
import { ProgressBar, ControlLabel } from "react-bootstrap";
import "./Rating.css";

export default class Rating extends Component {
  render() {
    const progress=60;
    return (
      <div>
        <p id="progressLabel">Twój postęp: {progress}%</p>
        <ProgressBar id="ratingProgressBar" bsStyle="success" now={progress} />
      </div>);
  }
}