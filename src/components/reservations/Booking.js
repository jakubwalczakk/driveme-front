import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Table, Button } from "react-bootstrap";
import { API_BASE_URL, CURRENT_USER_ROLE } from "constants/constants";
import { request } from "utils/APIUtils";
import "./Booking.css";

const carUrl = API_BASE_URL + '/car';
const instructorUrl = API_BASE_URL + '/instructor';
const eventsUrl = API_BASE_URL + '/event';
const eventsSpecifiedUrl = eventsUrl + '/events';

export default class Booking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
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
      request({
        url: eventsSpecifiedUrl,
        method: 'POST',
        body: JSON.stringify(searchRequest)
      }).then(data => this.setState({ events: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));

    } else {
      console.log("No niestety...")

      request({
        url: eventsUrl,
        method: 'GET'
      }).then(data => this.setState({ events: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  componentDidMount() {

    request({
      url: carUrl + '/brands',
      method: 'GET'
    }).then(data => this.setState({ carBrands: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    request({
      url: instructorUrl,
      method: 'GET'
    }).then(data => this.setState({ instructors: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    var { isLoading, error, carBrands, instructors, events, selectedCarBrand, selectedInstructor } = this.state;

    if (error) {
      return <p className="bookingsInfoLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p className="bookingsInfoLabel">Pobieranie danych...</p>
    }

    if (CURRENT_USER_ROLE !== 'Kursant') {
      return <p className="bookingsInfoLabel">Nie posiadasz dostępu do tego zasobu!</p>
    } else {
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
        </div>);
    }
  }
}