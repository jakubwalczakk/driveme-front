import React, { Component } from "react";
import { Table, Button, Modal, Badge, FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import "./Ratings.css";

const courseUrl = API_BASE_URL + '/course';
const drivingUrl = API_BASE_URL + '/driving';

export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivings: [],
      isLoading: false,
      error: null,
      showModal: false,
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  handleClose() {
    this.setState({ showModal: false });
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleRated(){
    console.log("Zajęcia ocenione!");
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(drivingUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy jazd instruktora...');
        }
      })
      .then(data => this.setState({ drivings: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }


  render() {

    var { drivings, isLoading, error } = this.state;

    if (error) {
      return <p id="drivingsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="drivingsLoadingLabel">Loading...</p>
    }


    return (
      <div id="instructorDrivingsTableContainer">
        <        p id="instructorDrivingsLabel">Lista przeprowadzonych przez Ciebie jazd szkoleniowych</p>
        <Table id="drivingsTable" responsive striped bordered condensed hover>
          <thead>
            <th>Student</th>
            <th>Tytuł</th>
            <th>Samochód</th>
            <th>Miasto</th>
            <th>Data rozpoczęcia</th>
            <th>Czas trwania</th>
            <th>Ocena</th>
          </thead>
          <tbody>
            {drivings.map(driving => (
              <tr key={driving.id}>
                <td>{driving.student.name} {driving.student.surname}</td>
                <td>{driving.title}</td>
                <td>{driving.car.brand} {driving.car.model} - {driving.car.licensePlate} </td>
                <td>{driving.drivingCity}</td>
                <td>{driving.startDate}</td>
                <td>0</td>
                <td>{driving.rating ?
                  <Badge>{driving.rating}</Badge> :
                  <Button id="rateButton" onClick={this.handleShow}>Oceń</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
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
            <Button onClick={this.handleClose}>Anuluj</Button>
            <Button onClick={this.handleRated}>Zapisz</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}