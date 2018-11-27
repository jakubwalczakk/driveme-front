import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import "./Drivings.css";

export default class Drivings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drivings: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('http://localhost:8080/driving')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy jazd...');
        }
      })
      .then(data => this.setState({ drivings: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { drivings, isLoading, error } = this.state;

    if (error) {
      return <p id="drivingsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="drivingsLoadingLabel">Loading...</p>
    }

    return (
      <div id="drivingsTableContainer">
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