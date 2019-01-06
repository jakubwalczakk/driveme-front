import React, { Component } from "react";
import { Button, Modal, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { trimDate, request } from "utils/APIUtils";
import { API_BASE_URL } from "../../constants/constants";
import './Students.css';

const studentUrl = API_BASE_URL + '/student';

export default class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCourseModal: false,
      showPaymentsModal: false,
      showActivateModal: false,
      showDeleteModal: false,
      amountOfPayment: {
        value: 0
      },
    }

    this.handleCloseCourseModal = this.handleCloseCourseModal.bind(this);
    this.handleShowCourseModal = this.handleShowCourseModal.bind(this);
    this.prepareCourseModalStructure = this.prepareCourseModalStructure.bind(this);

    this.handleClosePaymentsModal = this.handleClosePaymentsModal.bind(this);
    this.handleShowPaymentsModal = this.handleShowPaymentsModal.bind(this);
    this.handleAddPayment = this.handleAddPayment.bind(this);
    this.handleChangeAmountOfPayment = this.handleChangeAmountOfPayment.bind(this);
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

  prepareCourseModalStructure() {
    var student = this.props.student;
    var course = student.course;
    return (
      <Modal show={this.state.showCourseModal} onHide={this.handleCloseCourseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            KURS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormControl.Static>
              <b>{student.name} {student.surname} - {student.email} {student.phoneNumber}</b>
            </FormControl.Static>
            <FormControl.Static>
              <b>PESEL: {student.pesel}</b>
            </FormControl.Static>
            <FormControl.Static>
              Zapłacona kwota: {course.currentPayment} PLN
            </FormControl.Static>
            <FormControl.Static>
              Zaliczone godziny: {course.takenDrivingHours}h
            </FormControl.Static>
            <FormControl.Static>
              Status kursu: {course.status}
            </FormControl.Static>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modals-button" onClick={this.handleCloseCourseModal}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleClosePaymentsModal() {
    this.setState({
      amountOfPayment: {
        value: 0
      }, showPaymentsModal: false
    });
  }

  handleShowPaymentsModal() {
    this.setState({ showPaymentsModal: true });
  }

  handleAddPayment() {
    console.log("PŁATNOŚĆ ZARAZ ZOSTANIE UTWORZONA");
    this.handleClosePaymentsModal();
  }

  handleChangeAmountOfPayment(event) {
    this.setState({
      amountOfPayment: {
        value: event.target.value
      }
    });
  }

  preparePaymentsModalStructure() {
    var { amountOfPayment } = this.state;
    return (
      <Modal show={this.state.showPaymentsModal} onHide={this.handleClosePaymentsModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            PŁATNOŚCI
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Dodawanie płatności dla użytkownika {this.props.student.name} {this.props.student.surname}
          <FormGroup id="car-licensePlate-form" className="addCarForm">
            <ControlLabel>Kwota</ControlLabel>
            <FormControl id="carLicensePlate" type="number"
              min={1} max={1500}
              value={amountOfPayment.value}
              onChange={this.handleChangeAmountOfPayment}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modals-button" onClick={this.handleClosePaymentsModal}>Anuluj</Button>
          <Button className="modals-button" onClick={this.handleAddPayment}>Dodaj</Button>
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
    var studentId = this.props.student.id;
    // console.log("STUDENT ZOSTAŁ POTWIERDZONY DO AKTYWACJI");

    request({
      url: studentUrl + `/activate/${studentId}`,
      method: 'PUT'
    }).then(data => this.setState({ isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
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
          Czy na pewno chcesz aktywować użytkownika <b>{this.props.student.name} {this.props.student.surname}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button className="modals-button" onClick={this.handleCloseActivateModal}>Anuluj</Button>
          <Button className="modals-button" onClick={this.handleActivateStudent}>Aktywuj</Button>
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
    var studentId = this.props.student.id;
    console.log("STUDENT ZOSTAŁ POTWIERDZONY DO USUNIĘCIA");
    request({
      url: studentUrl + `/${studentId}`,
      method: 'DELETE'
    }).then(data => this.setState({ isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    this.handleCloseDeleteModal();
  }

  prepareDeleteModalStructure() {
    return (
      <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            DEAKTYWACJA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy na pewno chcesz deaktywować użytkownika <b>{this.props.student.name} {this.props.student.surname}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button className="modals-button" onClick={this.handleCloseDeleteModal}>Anuluj</Button>
          <Button className="modals-button" onClick={this.handleDeleteStudent}>Deaktywuj</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    var {
      showCourseModal,
      showPaymentsModal,
      showActivateModal,
      showDeleteModal } = this.state;

    var student = this.props.student;

    let courseModal;
    let paymentsModal;
    let activateModal;
    let deleteModal;

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
      <tr key={student.id}>
        <td>{student.name} {student.surname}</td>
        <td>{student.pesel}</td>
        <td>{student.email}</td>
        <td>{trimDate(student.registrationDate)}</td>
        <td>
          <Button disabled={student.course == null || !student.active} onClick={this.handleShowCourseModal}>
            Kurs
          </Button>
        </td>
        <td >{student.course != null && student.course.currentPayment}</td>
        <td>
          {student.course != null && student.course.currentPayment !== 1500 &&
            <Button onClick={this.handleShowPaymentsModal}>
              Dodaj płatność
            </Button>}
        </td>
        <td>
          {!student.active &&
            <Button id="activateButton" onClick={this.handleShowActivateModal}>
              Aktywuj
            </Button>}
          {student.active &&
            <Button id="deactivateButton" className="material-icons" onClick={this.handleShowDeleteModal}>
              delete_forever
            </Button>}
        </td>
        {courseModal}
        {paymentsModal}
        {activateModal}
        {deleteModal}
      </tr>
    )
  }
}