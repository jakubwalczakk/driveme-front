import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { request } from "utils/APIUtils";
import Driving from "./Driving";
import "./Drivings.css";

const drivingUrl = API_BASE_URL + '/driving/student';

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

    const drivingList = drivings.map(driving =>
      <Driving key={driving.id} driving={driving} />)

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
              <th id="drivingDurationCol">Czas trwania (min.)</th>
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