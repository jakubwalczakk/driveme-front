import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Table, Button } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import "./Booking.css";

const carUrl = API_BASE_URL + '/car';
const instructorUrl = API_BASE_URL + '/instructor';
const eventsUrl = API_BASE_URL + '/event';
const eventsSpecifiedUrl = eventsUrl + '/events';

export default class Booking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carBrands: [],
      instructors: [],
      events: [],
      selectedInstructor: '-',
      selectedCarBrand: '-',
    }
    this.handleSelectedCarBrandChange = this.handleSelectedCarBrandChange.bind(this);
    this.handleSelectedInstructorChange = this.handleSelectedInstructorChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSelectedCarBrandChange(event) {
    this.setState({ selectedCarBrand: event.target.value })
  }

  handleSelectedInstructorChange(event) {
    this.setState({ selectedInstructor: event.target.value })
  }

  handleSearchSubmit() {
    const searchRequest = {
      carBrand: this.state.selectedCarBrand,
      instructorInfo: this.state.selectedInstructor
    }
    console.log(searchRequest)

    if (searchRequest.instructorInfo !== '-' && searchRequest.carBrand !== '-') {
      fetch(eventsSpecifiedUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchRequest)
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy wydarzeń...');
        }
      }).then(data => this.setState({ events: data }));
    } else {
      console.log("No niestety...")
      fetch(eventsUrl)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Coś poszło nie tak podczas pobierania listy wydarzeń...');
          }
        }).then(data => this.setState({ events: data }));
    }
  }

  componentDidMount() {
    fetch(carUrl + '/brands')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy marek samochodów...');
        }
      })
      .then(data => this.setState({ carBrands: data }));

    fetch(instructorUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy instruktorów...');
        }
      })
      .then(data => this.setState({ instructors: data }));
  }

  render() {
    var { carBrands, instructors, events, selectedCarBrand, selectedInstructor } = this.state;

    return (
      <div id="bookingContainer">
        <p id="bookingLabel">Tutaj możesz dokonać rezerwacji</p>
        <div id="selectContainer">
          <div id="selectBrandContainer">
            <p id="carBrandSelectLabel">Wybierz markę samochodu</p>
            <FormGroup id="carBrandSelectList">
              <ControlLabel>Marka</ControlLabel>
              <FormControl componentClass="select" onChange={this.handleSelectedCarBrandChange} value={selectedCarBrand}>
                <option>-</option>
                {carBrands.map(brand => (
                  <option key={brand}>{brand}</option>)
                )}
              </FormControl>
            </FormGroup>
          </div>
          <div id="selectInstructorContainer">
            <p id="instructorSelectLabel">Wybierz instruktora</p>
            <FormGroup id="instructorSelectList">
              <ControlLabel>Instruktor</ControlLabel>
              <FormControl componentClass="select" onChange={this.handleSelectedInstructorChange} value={selectedInstructor}>
                <option>-</option>
                {instructors.map(instructor => (
                  <option key={instructor.id}>{instructor.name} {instructor.surname} - {instructor.email}</option>)
                )}
              </FormControl>
            </FormGroup>
          </div>
          <div id="searchButtonContainer">
            <Button id="searchEventsButton" onClick={this.handleSearchSubmit}>Szukaj</Button>
          </div>
        </div>
        <Table id="reservationsTable" responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Instruktor</th>
              <th>Samochód</th>
              <th>Miasto</th>
              <th>Data rozpoczęcia</th>
              <th>Data końcowa</th>
            </tr>
          </thead>
          <tbody>
            {events.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.instructor.name} {reservation.instructor.surname}</td>
                <td>{reservation.car.brand} {reservation.car.model} - {reservation.car.licensePlate} </td>
                <td>{reservation.drivingCity}</td>
                <td>{reservation.startDate}</td>
                <td>{reservation.finishDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}