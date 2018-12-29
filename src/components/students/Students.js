import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { API_BASE_URL, CURRENT_USER_ROLE } from "constants/constants";
import { request } from "utils/APIUtils";
import Student from "./Student";
import "./Students.css";

const studentsUrl = API_BASE_URL + '/student';

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {

    this.setState({ isLoading: true });

    request({
      url: studentsUrl,
      method: 'GET'
    })
      .then(data => this.setState({ students: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { students,
      isLoading,
      error } = this.state;

    if (error) {
      return <p id="studentsInfoLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="studentsInfoLabel">Pobieranie danych...</p>
    }

    if (CURRENT_USER_ROLE !== 'Administrator') {
      return <p id="studentsInfoLabel">Nie posiadasz dostępu do tego zasobu!</p>
    } else {

      const studentList = students.map(student =>
        <Student key={student.id} student={student} />)
      return (
        <div id="studentsTableContainer">
          <p id="studentsLabel">Lista obecnych kursantów</p>
          <Table id="studentsTable" responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th>Student</th>
                <th>PESEL</th>
                <th>E-mail</th>
                <th>Data rejestracji</th>
                <th>Kurs</th>
                <th id="currentPaymentCol">Zapłacona kwota</th>
                <th>Płatności</th>
                <th>Aktywność</th>
              </tr>
            </thead>
            <tbody>
              {studentList}
            </tbody>
          </Table>
        </div>);
    }
  }
}