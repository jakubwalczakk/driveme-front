import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import Driving from "./Driving";
import "./Drivings.css";

export default class Drivings extends Component {
  
  render() {
    var drivings = this.props.drivings;

    const drivingList = drivings.map(driving =>
      <Driving key={driving.id} driving={driving} />)

    return (

      <div id="drivingsTableContainer">
        <p id="drivingsLabel">Lista Twoich jazd szkoleniowych</p>
        <Table id="drivingsTable" responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Instruktor</th>
              <th>Samochód</th>
              <th>Miasto</th>
              <th>Data rozpoczęcia</th>
              <th id="drivingDurationCol">Czas trwania</th>
              <th>Ocena</th>
            </tr>
          </thead>
          <tbody>
            {drivingList}
          </tbody>
        </Table>
      </div>);
  }
}