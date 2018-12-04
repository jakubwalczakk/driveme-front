import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class ModalExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleReservation() {
    console.log("Reserved!!!");
  }

  render() {

    return (
      <div>
        <Button bsStyle="primary" bsSize="lg" onClick={this.handleShow}>
          Rezerwuj
        </Button>

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
    );
  }
}
