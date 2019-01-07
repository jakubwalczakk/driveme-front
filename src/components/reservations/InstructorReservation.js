import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { request } from "../../utils/APIUtils";

const reservationUrl = API_BASE_URL + '/reservation';

export default class InstructorReservation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAcceptationModal: false,
    }

    this.handleCloseAcceptationModal = this.handleCloseAcceptationModal.bind(this);
    this.handleShowAcceptationModal = this.handleShowAcceptationModal.bind(this);
    this.prepareAcceptationModal = this.prepareAcceptationModal.bind(this);
    this.handleAcceptReservation = this.handleAcceptReservation.bind(this);
  }

  handleCloseAcceptationModal() {
    this.setState({
      showAcceptationModal: false
    })
  }

  handleShowAcceptationModal() {
    this.setState({
      showAcceptationModal: true
    })
  }

  prepareAcceptationModal() {
    var { showAcceptationModal } = this.state;

    return (
      <Modal show={showAcceptationModal} onHide={this.handleCloseAcceptationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Akceptacja rezerwacji</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy na pewno chcesz potwierdzić rezerwację?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseAcceptationModal}>Anuluj</Button>
          <Button onClick={this.handleAcceptReservation}>Potwierdź</Button>
        </Modal.Footer>
      </Modal >
    );
  }

  handleAcceptReservation() {
    var reservationId = this.props.reservation.id;
    request({
      url: reservationUrl + `/accept/${reservationId}`,
      method: 'POST'
    }).then(data => this.setState({ isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    this.handleCloseAcceptationModal();
  }

  render() {

    const reservation = this.props.reservation;

    let acceptationModal = this.prepareAcceptationModal();

    return (
      <tr key={reservation.id}>
        <td>
          {reservation.student.name} {reservation.student.surname}
        </td>
        <td>{reservation.carBrand} </td>
        <td>{reservation.drivingCity}</td>
        <td>{reservation.startDate}</td>
        <td>{reservation.duration}</td>
        <td>
          {reservation.accepted === true &&
            <i id="reservationAccepted" className="material-icons">check_circle</i>}
          {reservation.accepted === false &&
            <i id="reservationDenied" className="material-icons">cancel</i>}
          {reservation.accepted === null &&
            <Button onClick={this.handleShowAcceptationModal}>Akceptuj</Button>}</td>
        {acceptationModal}
      </tr >
    )
  }
}