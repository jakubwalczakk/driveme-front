import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { request } from "utils/APIUtils";
import { withRouter } from 'react-router-dom';
import DrivingInfo from './DrivingInfo';
import "./Ratings.css";

const drivingUrl = API_BASE_URL + '/driving';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivings: [],
      isLoading: false,
      error: null
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    request({
      url: drivingUrl + '/instructor',
      method: 'GET'
    }).then(data => this.setState({ drivings: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { drivings, isLoading, error } = this.state;

    if (error) {
      return <p className="ratingsInfoLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p className="ratingsInfoLabel">Pobieranie danych...</p>
    }

    if ('Instruktor' !== 'Instruktor') {
      return <p className="ratingsInfoLabel">Nie masz dostępu do tego zasobu!</p>
    } else {

      const drivingsInfoList = drivings.map(driving =>
        <DrivingInfo key={driving.id} driving={driving} />)

      return (
        <div id="instructorDrivingsTableContainer">
          <        p id="instructorDrivingsLabel">Lista przeprowadzonych przez Ciebie jazd szkoleniowych</p>
          <Table id="ratingsTable" responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th>Student</th>
                <th>Tytuł</th>
                <th>Samochód</th>
                <th>Miasto</th>
                <th>Data rozpoczęcia</th>
                <th>Czas trwania (min.)</th>
                <th>Ocena</th>
              </tr>
            </thead>
            <tbody>
              {drivingsInfoList}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default withRouter(Ratings);