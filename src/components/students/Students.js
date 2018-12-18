import React, { Component } from "react";
import { Table, Button, Modal, Badge, FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { trimDate } from "utils/APIUtils";
import "./Students.css";

const studentsUrl = API_BASE_URL + '/student';

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: false,
      error: null,
      showCourseButton: false,
      showPaymentsButton: false,
      showActivateButton: false,
      showCourseModal: false,
      showPaymentsModal: false,
      showActivateModal: false,
      showDeleteModal: false
    }

    this.handleCloseCourseModal = this.handleCloseCourseModal.bind(this);
    this.handleShowCourseModal = this.handleShowCourseModal.bind(this);
    this.handleCourseInfo = this.handleCourseInfo.bind(this);
    this.prepareCourseModalStructure = this.prepareCourseModalStructure.bind(this);

    this.handleClosePaymentsModal = this.handleClosePaymentsModal.bind(this);
    this.handleShowPaymentsModal = this.handleShowPaymentsModal.bind(this);
    this.handleAddPayment = this.handleAddPayment.bind(this);
    this.preparePaymentsModalStructure = this.preparePaymentsModalStructure.bind(this);

    this.handleShowActivateModal = this.handleShowActivateModal.bind(this);
    this.handleCloseActivateModal = this.handleCloseActivateModal.bind(this);
    this.handleActivateStudent = this.handleActivateStudent.bind(this);
    this.prepareActivateModalStructure = this.prepareActivateModalStructure.bind(this);

    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
    this.prepareDeleteModalStructure = this.prepareDeleteModalStructure.bind(this);
  }

  handleCloseCourseModal() {
    this.setState({ showCourseModal: false });
  }

  handleShowCourseModal() {
    this.setState({ showCourseModal: true });
  }

  handleCourseInfo() {
    console.log("INFORMACJE NA TEMAT KURSU");
    this.handleCloseCourseModal();
  }

  prepareCourseModalStructure() {
    return (
      <Modal show={this.state.showCourseModal} onHide={this.handleCloseCourseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            KURS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }

  handleClosePaymentsModal() {
    this.setState({ showPaymentsModal: false });
  }

  handleShowPaymentsModal() {
    this.setState({ showPaymentsModal: true });
  }

  handleAddPayment() {
    console.log("PŁATNOŚĆ ZARAZ ZOSTANIE UTWORZONA");
    this.handleClosePaymentsModal();
  }

  preparePaymentsModalStructure() {
    return (
      <Modal show={this.state.showPaymentsModal} onHide={this.handleClosePaymentsModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            PŁATNOŚCI
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }

  handleCloseActivateModal() {
    this.setState({ showActivateModal: false });
  }

  handleShowActivateModal() {
    this.setState({ showActivateModal: true });
  }

  handleActivateStudent() {
    console.log("STUDENT ZOSTAŁ POTWIERDZONY DO AKTYWACJI");
    this.handleCloseActivateModal();
  }

  prepareActivateModalStructure() {
    return (
      <Modal show={this.state.showActivateModal} onHide={this.handleCloseActivateModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            AKTYWACJA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }

  handleCloseDeleteModal() {
    this.setState({ showDeleteModal: false });
  }

  handleShowDeleteModal() {
    this.setState({ showDeleteModal: true });
  }

  handleDeleteStudent() {
    console.log("STUDENT ZOSTAŁ POTWIERDZONY DO USUNIĘCIA");
    this.handleCloseDeleteModal();
  }

  prepareDeleteModalStructure() {
    return (
      <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            USUWANIE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
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

    var { students,
      isLoading,
      error,
      showCourseButton,
      showPaymentsButton,
      showActivateButton,
      showCourseModal,
      showPaymentsModal,
      showActivateModal,
      showDeleteModal } = this.state;

    let courseModal;
    let paymentsModal;
    let activateModal;
    let deleteModal;

    if (error) {
      return <p id="studentsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="studentsLoadingLabel">Loading...</p>
    }

    if (showCourseModal) {
      courseModal = this.prepareCourseModalStructure();
    }

    if (showPaymentsModal) {
      paymentsModal = this.preparePaymentsModalStructure();
    }

    if (showActivateModal) {
      activateModal = this.prepareActivateModalStructure();
    }

    if (showDeleteModal) {
      deleteModal = this.prepareDeleteModalStructure();
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
                  <Button disabled={student.course == null} onClick={this.handleShowCourseModal}>
                    Kurs
                  </Button>
                </td>
                <td >{student.course != null && student.course.currentPayment}</td>
                <td>
                  {/* {student.course != null && student.course.currentPayment !== 1500 && */}
                    {<Button onClick={this.handleShowPaymentsModal}>
                      Dodaj płatność
                  </Button>}
                </td>
                <td>{/*</td>{!student.active &&*/}
                  {<Button onClick={this.handleShowActivateModal}>
                    Aktywuj
                  </Button>}
                </td>
                <td>
                  <Button id="deactivateButton" className="material-icons" onClick={this.handleShowDeleteModal}>
                    {/* remove_circle */}
                    delete_forever
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {courseModal}
        {paymentsModal}
        {activateModal}
        {deleteModal}
      </div>);
  }
}