import React, { Component } from "react";
import { Table, Button, Modal, Badge, FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import {trimDate} from "utils/APIUtils";
import "./Students.css";

const studentsUrl = API_BASE_URL + '/student';

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: false,
      error: null,
      show: false,
      showDeleteModal: false
      // showCourse: false,
      // showAddPayment: false,
      // showActivate: false,
      // showDelete: false,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
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

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleCloseDeleteModal() {
    this.setState({ showDeleteModal: false });
  }

  handleShowDeleteModal(deleteId) {
    this.setState({ showDeleteModal: true });
    console.log(deleteId);
  }

  handleDeleteStudent(){
    console.log("STUDENT ZOSTAŁ POTWIERDZONY DO USUNIĘCIA");
    this.handleCloseDeleteModal();
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
            <tr>
              <th>Student</th>
              <th>PESEL</th>
              <th>E-mail</th>
              <th>Data rejestracji</th>
              <th>Kurs</th>
              <th>Zapłacona kwota</th>
              <th>Płatności</th>
              <th>Aktywacja</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name} {student.surname}</td>
                <td>{student.pesel}</td>
                <td>{student.email}</td>
                <td>{trimDate(student.registrationDate)}</td>
                <td>
                  <Button disabled={student.course == null} onClick={this.handleShow}>
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
                  <Button id="deactivateButton" className="material-icons" onClick={this.handleShowDeleteModal}>
                    {/* remove_circle */}
                    delete_forever
                  </Button>
                </td>
                {/* <td>{student.course.currentPayment}</td> */}
              </tr>
            ))}
          </tbody>
        </Table>
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
            <Button onClick={this.handleClose}>Rezerwuj</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Usuwanie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Czy na pewno chcesz usunąć studenta o id = (*)?
            <hr />
            Czy na pewno?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseDeleteModal}>Anuluj</Button>
            <Button onClick={this.handleDeleteStudent}>Potwierdź</Button>
          </Modal.Footer>
        </Modal>
      </div>);
  }
}

class CourseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
        <Modal show={true} onHide={this.handleClose}>
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
            <Button onClick={this.handleClose}>Rezerwuj</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}