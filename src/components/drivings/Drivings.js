import React, { Component } from 'react';
import { Table, Badge } from "react-bootstrap";
import { API_BASE_URL, MINUTE_IN_MICROS } from "constants/constants";
import { request } from "utils/APIUtils";
import "./Drivings.css";

const studentId = 11;
const drivingUrl = API_BASE_URL + '/driving/student/' + studentId;

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

    request({
      url: drivingUrl,
      method: 'GET'
    }).then(data => this.setState({ drivings: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { drivings, isLoading, error } = this.state;

    if (error) {
      return <p id="drivingsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="drivingsLoadingLabel">Pobieranie danych...</p>
    }

    return (

      <div id="drivingsTableContainer">
        <p id="drivingsLabel">Lista ukończonych przez Ciebie jazd szkoleniowych</p>
        <Table id="drivingsTable" responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Instruktor</th>
              <th>Samochód</th>
              <th>Miasto</th>
              <th>Data rozpoczęcia</th>
              <th>Czas trwania (min.)</th>
              <th>Ocena</th>
            </tr>
          </thead>
          <tbody>
            {drivings.map(driving => (
              <tr key={driving.id}>
                <td>{driving.title}</td>
                <td>{driving.instructor.name} {driving.instructor.surname}</td>
                <td>{driving.car.brand} {driving.car.model} - {driving.car.licensePlate} </td>
                <td>{driving.drivingCity}</td>
                <td>{driving.startDate}</td>
                <td>{(new Date(driving.finishDate) - new Date(driving.startDate)) / MINUTE_IN_MICROS}</td>
                <td>
                  <Badge>{driving.rating}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>);
  }
}