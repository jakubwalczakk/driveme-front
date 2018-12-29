import React, { Component } from 'react';
import { Button, Modal, Badge, FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { request } from "utils/APIUtils";

const rateDrivingUrl = API_BASE_URL + '/driving/rate';

export default class DrivingInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      showRateModal: false
    }
    this.prepareRateModal = this.prepareRateModal.bind(this);
    this.handleCloseRateModal = this.handleCloseRateModal.bind(this);
    this.handleShowRateModal = this.handleShowRateModal.bind(this);
    this.handleRated = this.handleRated.bind(this);
  }

  prepareRateModal() {
    return (
      <Modal show={this.state.showRateModal} onHide={this.handleCloseRateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ocena zajęć</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Ocena</ControlLabel>
            <br />
            <Radio name="radioGroup" inline>Rozczarowująco</Radio>
            <Radio name="radioGroup" inline>Przeciętnie</Radio>
            <Radio name="radioGroup" inline>OK</Radio>
            <Radio name="radioGroup" inline>Świetnie</Radio>
            <Radio name="radioGroup" inline>Mistrzowsko</Radio>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Komentarz</ControlLabel>
            <FormControl />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseRateModal}>Anuluj</Button>
          <Button onClick={this.handleRated}>Zapisz</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleCloseRateModal() {
    this.setState({ showRateModal: false });
  }

  handleShowRateModal() {
    this.setState({ showRateModal: true });
    console.log("CLIDKED")
  }

  handleRated() {
    // const drivingId = { driving.id };
    const drivingId = this.props.driving.id;
    const rateRequest = {
      // wartości powinny zostać pobrane z okna modalnego!!!
      drivingId: drivingId,//{ driving.id },
      rating: "Mistrzowsko",
      comment: "Super postępy"
    }

    request({
      url: rateDrivingUrl,
      method: 'PUT',
      body: JSON.stringify(rateRequest)
    }).then(data => this.setState({ isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    console.log("Zajęcia ocenione!");
    this.handleCloseRateModal();
  }

  render() {

    var { showRateModal } = this.state;
    let rateModal;

    if (showRateModal) {
      rateModal = this.prepareRateModal();
    }

    const driving = this.props.driving;
    return (
      <tr key={driving.id}>
        <td>{driving.student.name} {driving.student.surname}</td>
        <td>{driving.title}</td>
        <td>{driving.car.brand} {driving.car.model} - {driving.car.licensePlate} </td>
        <td>{driving.drivingCity}</td>
        <td>{driving.startDate}</td>
        <td>{driving.duration}</td>
        {<td>{!driving.rating ?
          <Badge>{driving.rating}</Badge> :
          <Button id="rateButton" onClick={this.handleShowRateModal}>Oceń</Button>}
        </td>}
        {rateModal}
      </tr>
    )
  }
}