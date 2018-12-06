import React, { Component } from 'react';
import { Table, Badge } from "react-bootstrap";
import { environment } from "environments/environment";
import "./Drivings.css";

const drivingUrl = environment.apiUrl + '/driving';

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

    fetch(drivingUrl)
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


    function calculateTimeOfDrivings(driving) {
      driving.startDate = new Date(driving.startDate);
      driving.finishDate = new Date(driving.finishDate);
      return driving.finishDate - driving.finishDate;
    }

    return (

      <div id="drivingsTableContainer">
        <p id="drivingsLabel">Lista ukończonych przez Ciebie jazd szkoleniowych</p>
        <Table id="drivingsTable" responsive striped bordered condensed hover>
          <thead>
            <th>Tytuł</th>
            <th>Instruktor</th>
            <th>Samochód</th>
            <th>Miasto</th>
            <th>Data rozpoczęcia</th>
            <th>Czas trwania</th>
            <th>Ocena</th>
          </thead>
          <tbody>
            {drivings.map(driving => (
              <tr key={driving.id}>
                <td>{driving.title}</td>
                <td>{driving.instructor.name} {driving.instructor.surname}</td>
                <td>{driving.car.brand} {driving.car.model} - {driving.car.licensePlate} </td>
                <td>{driving.drivingCity}</td>
                <td>{driving.startDate}</td>
                <td>{calculateTimeOfDrivings(driving)}</td>
                <td><Badge>{driving.rating}</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>);
  }
}