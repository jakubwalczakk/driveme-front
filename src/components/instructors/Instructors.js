import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";
import { environment } from "environments/environment";
import "./Instructors.css";

const instructorUrl = environment.apiUrl + '/instructor';

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

    fetch(instructorUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy instruktorów...');
        }
      })
      .then(data => this.setState({ instructors: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { instructors, isLoading, error } = this.state;

    if (error) {
      return <p id="instructorsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="instructorsLoadingLabel">Loading...</p>
    }

    return (
      <div id="instructorsTableContainer">
      <h1 id="instructorsHeader">Nasi instruktorzy</h1>
        <Table id="instructorsTable" responsive striped bordered condensed hover>
          <thead>
            <th id="instructorPhoto"></th>
            <th id="instructorName">Imię</th>
            <th id="instructorSurname">Nazwisko</th>
            <th id="instructorEmail">E-mail</th>
            <th id="instructorPhoneNumber">Nr tel.</th>
          </thead>
          <tbody>
            {instructors.map(instructor => (
              <tr key={instructor.id}>
                <td>
                  <Image id="instructorPhoto" src={"data:image/jpeg;base64," + instructor.instructorPhoto} rounded responsive />
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