import React, { Component } from "react";
import { Table, Button, Modal, Badge, FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import "./Students.css";

const studentsUrl = API_BASE_URL + '/student';

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: false,
      error: null,
      // showCourse: false,
      // showAddPayment: false,
      // showActivate: false,
      // showDelete: false,
    }
  }

  componentDidMount() {

    this.setState({ isLoading: true });

    fetch(studentsUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy kursantów...');
        }
      })
      .then(data => this.setState({ students: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    var { students, isLoading, error } = this.state;

    if (error) {
      return <p id="studentsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="studentsLoadingLabel">Loading...</p>
    }

    return (
      <div id="studentsTableContainer">
        <p id="studentsLabel">Lista obecnych kursantów</p>
        <Table id="studentsTable" responsive striped bordered condensed hover>
          <thead>
            <th>Student</th>
            <th>PESEL</th>
            <th>E-mail</th>
            <th>Data rejestracji</th>
            <th>Kurs</th>
            <th>Zapłacona kwota</th>
            <th>Płatności</th>
            <th>Aktywacja</th>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name} {student.surname}</td>
                <td>{student.pesel}</td>
                <td>{student.email}</td>
                <td>{student.registrationDate}</td>
                <td>
                  <Button disabled={student.course == null}>
                    Kurs
                  </Button>
                </td>
                <td >{student.course != null && student.course.currentPayment}</td>
                <td>
                  {student.course != null && student.course.currentPayment !== 1500 &&
                    <Button>
                      Dodaj płatność
                  </Button>}
                </td>
                <td>{!student.active &&
                  <Button>
                    Aktywuj
                  </Button>}
                </td>
                {/* <td>
                  <Button>
                    Deaktywuj
                  </Button>
                </td> */}
                <td>
                  <Button id="deactivateButton" className="material-icons">
                    {/* remove_circle */}
                    delete_forever
                  </Button>
                </td>
                {/* <td>{student.course.currentPayment}</td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>);
  }
}

class ModalXD extends Component {
  constructor(props, showing) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: showing,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Rezerwacja</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Czy na pewno chcesz zarezerwować jazdy?
            <hr />
            Czy na pewno?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Anuluj</Button>
            <Button onClick={this.handleReservation}>Rezerwuj</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}