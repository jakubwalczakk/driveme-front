import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import "./Drivings.css";

export default class Drivings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drivings: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/driving')
      .then(res => res.json())
      .then(json => {
        this.setState({
          drivings: json,
        })
      });
  }

  render() {
    var { drivings } = this.state;

    return (<div id="drivingsTableContainer">
      <p id="drivingsLabel">Lista ukończonych przez Ciebie jazd szkoleniowych</p>
      <Table id="drivingsTable" responsive striped bordered condensed hover>
        <thead>
          <th>Instruktor</th>
          <th>Samochód</th>
          <th>Miasto</th>
          <th>Data rozpoczęcia</th>
          <th>Czas trwania</th>
          <th>Ocena</th>
        </thead>
        <tbody>
          {drivings.map(driving => (
            <tr>
              <td>{driving.instructor.email}</td>
              <td>{driving.car.licensePlate}</td>
              <td>{driving.drivingCity}</td>
              <td>{driving.startDate}</td>
              <td>{driving.finishDate}</td>
              <td>{driving.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>);
  }
}