import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { trimDate } from "utils/APIUtils";

export default class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          Tutaj kurs dla użytkownika {this.props.student.name} {this.props.student.surname}
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

  render() {
    var { 
      showCourseModal,
      showPaymentsModal,
      showActivateModal,
      showDeleteModal } = this.state;

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
      <tr key={this.props.student.id}>
        <td>{this.props.student.name} {this.props.student.surname}</td>
        <td>{this.props.student.pesel}</td>
        <td>{this.props.student.email}</td>
        <td>{trimDate(this.props.student.registrationDate)}</td>
        <td>
          <Button disabled={this.props.student.course == null} onClick={this.handleShowCourseModal}>
            Kurs
          </Button>
        </td>
        <td >{this.props.student.course != null && this.props.student.course.currentPayment}</td>
        <td>
          {this.props.student.course != null && this.props.student.course.currentPayment !== 1500 &&
            <Button onClick={this.handleShowPaymentsModal}>
              Dodaj płatność
            </Button>}
        </td>
        <td>
          {!this.props.student.active &&
            <Button id="activateButton" onClick={this.handleShowActivateModal}>
              Aktywuj
            </Button>}
          {this.props.student.active &&
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