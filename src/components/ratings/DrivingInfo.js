import React, { Component } from 'react';
import { Button, Modal, Badge, FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { request, trimDate } from "utils/APIUtils";

const rateDrivingUrl = API_BASE_URL + '/driving/rate';

export default class DrivingInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      showRateModal: false,
      drivingTitle: '',
      drivingComment: '',
      //FIXME!!!
      drivingRating: 'Świetnie'
    }
    this.prepareRateModal = this.prepareRateModal.bind(this);
    this.handleCloseRateModal = this.handleCloseRateModal.bind(this);
    this.handleShowRateModal = this.handleShowRateModal.bind(this);
    this.handleDrivingTitleChange = this.handleDrivingTitleChange.bind(this);
    this.handleDrivingRatingChange = this.handleDrivingRatingChange.bind(this);
    this.handleDrivinCommentChange = this.handleDrivinCommentChange.bind(this);
    this.handleRated = this.handleRated.bind(this);
  }

  handleDrivingTitleChange(event) {
    this.setState({
      drivingTitle: event.target.value
    })
  }

  handleDrivingRatingChange(event) {
    this.setState({
      drivingRating: event.target.value
    })
  }

  handleDrivinCommentChange(event) {
    this.setState({
      drivingComment: event.target.value
    })
    // console.log(event)
  }

  prepareRateModal() {

    var { showRateModal, drivingTitle, drivingComment, drivingRating } = this.state;

    return (
      <Modal show={showRateModal} onHide={this.handleCloseRateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ocena zajęć</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Tytuł</ControlLabel>
            <FormControl type="text"
              value={drivingTitle} onChange={this.handleDrivingTitleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Ocena</ControlLabel>
            <Radio name="radioGroup" inline >Rozczarowująco</Radio>
            <Radio name="radioGroup" inline >Przeciętnie</Radio>
            <Radio name="radioGroup" inline >OK</Radio>
            <Radio name="radioGroup" inline >Świetnie</Radio>
            <Radio name="radioGroup" inline >Mistrzowsko</Radio></FormGroup>
          <ControlLabel>Komentarz</ControlLabel>
          <FormGroup>
            <FormControl type="text"
              value={drivingComment} onChange={this.handleDrivinCommentChange} />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseRateModal}>Anuluj</Button>
          <Button onClick={this.handleRated}>Zapisz</Button>
        </Modal.Footer>
      </Modal >
    );
  }

  handleCloseRateModal() {
    this.setState({ showRateModal: false });
  }

  handleShowRateModal() {
    this.setState({ showRateModal: true });
  }

  handleRated() {
    var { drivingTitle, drivingRating, drivingComment } = this.state;
    const drivingId = this.props.driving.id;
    const rateRequest = {
      drivingId: drivingId,
      title: drivingTitle,
      rating: drivingRating,
      comment: drivingComment
    }

    request({
      url: rateDrivingUrl,
      method: 'PUT',
      body: JSON.stringify(rateRequest)
    }).then(data => this.setState({ isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    // console.log("Zajęcia ocenione!");
    this.handleCloseRateModal();
  }

  render() {

    var { showRateModal } = this.state;
    let rateModal;

    if (showRateModal) {
      rateModal = this.prepareRateModal();
    }

    const driving = this.props.driving;
    var date = "2019-01-09 19:27";//trimDate((new Date()).toISOString());
    return (
      <tr key={driving.id}>
        <td>{driving.student.name} {driving.student.surname}</td>
        <td>{driving.title}</td>
        <td>{driving.car.brand} {driving.car.model} - {driving.car.licensePlate} </td>
        <td>{driving.drivingCity}</td>
        <td>{(driving.startDate > date && "PRAWDA") ||
          (driving.startDate < date && "FAŁSZ")}</td>
        <td>{driving.duration}</td>
        {<td>{driving.rating ?
          <Badge>{driving.rating}</Badge> :
          <Button id="rateButton" onClick={this.handleShowRateModal}>Oceń</Button>}
        </td>}
        {rateModal}
      </tr>
    )
  }
}