import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { request } from "utils/APIUtils";
import "./Instructors.css";

const instructorUrl = API_BASE_URL + '/instructor';

export default class Instructors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    request({
      url: instructorUrl,
      method: 'GET'
    }).then(data => this.setState({ instructors: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { instructors, isLoading, error } = this.state;

    if (error) {
      return <p id="instructorsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="instructorsLoadingLabel">Pobieranie danych...</p>
    }

    return (
      <div id="instructorsTableContainer">
        <h1 id="instructorsHeader">Nasi instruktorzy</h1>
        <Table id="instructorsTable" responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th id="instructorPhoto"></th>
              <th id="instructorName">Imię</th>
              <th id="instructorSurname">Nazwisko</th>
              <th id="instructorEmail">E-mail</th>
              <th id="instructorPhoneNumber">Nr tel.</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map(instructor => (
              <tr key={instructor.id}>
                <td>
                  <Image id="instructorPhoto" src={"data:image/jpeg;base64," + instructor.photo} rounded responsive />
                </td>
                <td>{instructor.name}</td>
                <td>{instructor.surname}</td>
                <td>{instructor.email}</td>
                <td>{instructor.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}