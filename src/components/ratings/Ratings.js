import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Drivings from "components/drivings/Drivings";
import { environment } from "environments/environment";
import "./Ratings.css";

export default class Rating extends Component {
  render() {
    const progress=60;
    return (
      <div>
        <p id="progressLabel">Twój postęp: {progress}%</p>
        <ProgressBar id="ratingProgressBar" bsStyle="success" now={progress} />
        <Drivings/>
      </div>);
  }
}