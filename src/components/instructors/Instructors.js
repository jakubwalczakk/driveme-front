import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";
import "./Instructors.css";

export default class Instructors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/instructor')
      .then(res => res.json())
      .then(json => {
        this.setState({
          instructors: json,
        })
      });
  }

  render() {

    var { instructors } = this.state;

    return (
      <div id="instructorsTableContainer">
        <Table id="instructorsTable" responsive striped bordered condensed hover>
          <thead>
            <th id="instructorPhoto">IMG</th>
            <th id="instructorName">Imię</th>
            <th id="instructorSurname">Nazwisko</th>
            <th id="instructorEmail">E-mail</th>
            <th id="instructorPhoneNumber">Nr tel.</th>
          </thead>
          <tbody>
            {instructors.map(instructor => (
              <tr>
                <td>
                  <Image id="instructorPhoto" src={"data:image/jpeg;base64,"+instructor.instructorPhoto} rounded responsive/>
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