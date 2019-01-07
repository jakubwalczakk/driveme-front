import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { API_BASE_URL, USER_ROLES } from "constants/constants";
import { request } from "utils/APIUtils";
import { withRouter } from 'react-router-dom';
import Student from "./Student";
import "./Students.css";
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from "../../common/ServerError";
import AccessDenied from "../../common/AccessDenied";

const studentsUrl = API_BASE_URL + '/student';

class Students extends Component {
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
    var currentUserRole = this.props.currentUserRole;

    if (error) {
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (currentUserRole !== USER_ROLES.Admin) {
      return <AccessDenied />
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

export default withRouter(Students);