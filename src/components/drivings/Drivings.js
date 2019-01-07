import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import { request } from "utils/APIUtils";
import { API_BASE_URL } from "constants/constants";
import LoadingIndicator from '../../common/LoadingIndicator';
import ServerError from '../../common/ServerError';
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

    request(
      'GET',
      drivingUrl
    ).then(data => this.setState({ drivings: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { drivings, isLoading, error } = this.state;

    if (error) {
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

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