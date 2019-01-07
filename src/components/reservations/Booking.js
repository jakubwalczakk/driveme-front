import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { API_BASE_URL, USER_ROLES } from "constants/constants";
import { request } from "utils/APIUtils";
import Calendar from './../calendar/Calendar';
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from "../../common/ServerError";
import AccessDenied from "../../common/AccessDenied";
// import { pl } from 'date-fns/locale';
import "./Booking.css";

// import plPL from 'antd/lib/locale-provider/pl_PL';
// import { LocaleProvider } from 'antd';
// import { DatePicker } from 'antd';
// ReactDOM.render(<DatePicker />, mountNode);
// import 'antd/dist/antd.css'; 

require('react-datepicker/dist/react-datepicker.css');

const carUrl = API_BASE_URL + '/car';
const instructorUrl = API_BASE_URL + '/instructor';
const cityUrl = API_BASE_URL + '/city';
const eventsUrl = API_BASE_URL + '/event';
const reservationUrl = API_BASE_URL + '/reservation';

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

class Booking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      carBrands: [],
      instructors: [],
      cities: [],
      drivings: [],
      exams: [],
      selectedInstructor: '-',
      selectedCarBrand: '-',
      reservationInstructor: '-',
      reservationCarBrand: '-',
      reservationStartDate: null,
      reservationDuration: '1h',
      reservationCity: '-',
      showReservationModal: false,
      requestResponse: false
    }
    this.handleSelectedCarBrandChange = this.handleSelectedCarBrandChange.bind(this);
    this.handleSelectedInstructorChange = this.handleSelectedInstructorChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

    this.handleReservationModalShow = this.handleReservationModalShow.bind(this);
    this.handleReservationModalClose = this.handleReservationModalClose.bind(this);
    this.prepareCourseModalStructure = this.prepareCourseModalStructure.bind(this);

    this.handleReservationInstructorChange = this.handleReservationInstructorChange.bind(this);
    this.handleReservationCarBrandChange = this.handleReservationCarBrandChange.bind(this);
    this.handleReservationStartDateChange = this.handleReservationStartDateChange.bind(this);
    this.handleReservationDurationChange = this.handleReservationDurationChange.bind(this);
    this.handleReservationCityChange = this.handleReservationCityChange.bind(this);

    this.validateReservationForm = this.validateReservationForm.bind(this);
    this.handleReservationSubmit = this.handleReservationSubmit.bind(this);
  }

  handleSelectedCarBrandChange(event) {
    this.setState({ selectedCarBrand: event.target.value })
  }

  handleSelectedInstructorChange(event) {
    this.setState({ selectedInstructor: event.target.value })
  }

  handleSearchSubmit() {
    const carBrand = this.state.selectedCarBrand;
    const instructorEmail = this.state.selectedInstructor.split(" - ")[1];

    if (carBrand !== '-' && instructorEmail !== '-') {
      request(
        'GET',
        eventsUrl + `/booking?instructor=${instructorEmail}&brand=${carBrand}`
      ).then(data => this.setState({
        reservations: data.reservations,
        drivings: data.drivings,
        exams: data.exams,
        isLoading: false
      }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  handleReservationModalClose() {
    this.setState({ showReservationModal: false })
  }

  handleReservationModalShow() {
    this.setState({ showReservationModal: true })
  }

  prepareCourseModalStructure() {
    var { carBrands, instructors, cities, reservationCarBrand, reservationInstructor,
      reservationStartDate, reservationDuration, reservationCity } = this.state;

    return (
      <Modal show={this.state.showReservationModal} onHide={this.handleReservationModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            REZERWACJA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Marka</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleReservationCarBrandChange} value={reservationCarBrand}>
              <option>-</option>
              {carBrands.map(brand => (
                <option key={brand}>{brand}</option>)
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Instruktor</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleReservationInstructorChange} value={reservationInstructor}>
              <option>-</option>
              {instructors.map(instructor => (
                <option key={instructor.id}>{instructor.name} {instructor.surname} - {instructor.email}</option>)
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Miasto</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleReservationCityChange} value={reservationCity}>
              <option>-</option>
              {cities.map(city => (
                <option key={city.name}>{city.name}</option>)
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Data rozpoczęcia</ControlLabel>
            <DatePicker
              selected={reservationStartDate}
              onChange={this.handleReservationStartDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm"
              timeCaption="czas"
              minDate={(new Date().addDays(3))}
              minTime={new Date(2019, 0, 1, 8)}
              maxTime={new Date(2019, 0, 1, 18)}
              // locale={'pl'}
              isClearable={true}
              showMonthDropdown
              showWeekNumbers
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Czas trwania</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleReservationDurationChange} value={reservationDuration}>
              <option key={'1h'}>{'1h'}</option>
              <option key={'1.5h'}>{'1.5h'}</option>
              <option key={'2h'}>{'2h'}</option>
              <option key={'2.5h'}>{'2.5h'}</option>
              <option key={'3h'}>{'3h'}</option>
              <option key={'3.5h'}>{'3.5h'}</option>
              <option key={'4h'}>{'4h'}</option>
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button className="add-reservation-btn" onClick={this.handleReservationModalClose}>Anuluj</Button>
          <Button className="add-reservation-btn" disabled={!this.validateReservationForm()} onClick={this.handleReservationSubmit}>
            Dodaj
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  validateReservationForm() {
    var { reservationCarBrand, reservationInstructor, reservationCity, reservationStartDate } = this.state;

    return (reservationCarBrand !== '-' &&
      reservationInstructor !== '-' &&
      reservationCity !== '-' &&
      reservationStartDate !== null);
  }

  handleReservationInstructorChange(event) {
    this.setState({ reservationInstructor: event.target.value })
  }

  handleReservationCarBrandChange(event) {
    this.setState({ reservationCarBrand: event.target.value })
  }

  handleReservationCityChange(event) {
    this.setState({ reservationCity: event.target.value })
  }

  handleReservationStartDateChange(event) {
    this.setState({ reservationStartDate: event })
  }

  handleReservationDurationChange(event) {
    this.setState({ reservationDuration: event.target.value })
  }

  handleReservationSubmit() {

    var { reservationCarBrand, reservationInstructor, reservationCity, reservationStartDate,
      reservationDuration, requestResponse } = this.state;

    const instructorEmail = reservationInstructor.split(" - ")[1];
    const duration = parseFloat(reservationDuration.slice(0, -1)) * 60;

    var data = reservationStartDate.toISOString();

    request(
      'GET',
      eventsUrl + `/term_availability?instructor=${instructorEmail}&brand=${reservationCarBrand}
      &startDate=${data}&duration=${duration}`
    ).then(response => this.setState({ requestResponse: response, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    if (requestResponse) {
      const reservationRequest = {
        startDate: reservationStartDate.toISOString(),
        duration: duration,
        instructor: { email: instructorEmail },
        carBrand: reservationCarBrand,
        drivingCity: reservationCity
      }

      request(
        'POST',
        reservationUrl,
        reservationRequest
      ).then(data => this.setState({ isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));

      console.log("REZERWACJA ZOSTAŁA WYSŁANA DO SERWERA!!! | " + instructorEmail + " | " + reservationCarBrand
        + " | " + reservationStartDate + " | " + reservationDuration + " | " + reservationCity)
      this.handleReservationModalClose();
    } else {
      console.log("REZERWACJA NISTETY NIE ZOSTAŁA WYSŁANA DO SERWERA!!! | " + instructorEmail + " | " + reservationCarBrand
        + " | " + reservationStartDate + " | " + reservationDuration + " | " + reservationCity)
      alert(`Niestety, rezerwacja nie została zaakceptowana. 
      Podany termin rezerwacji nie jest dostępny!`);
    }
  }

  componentDidMount() {

    this.setState({ isLoading: true });

    request(
      'GET',
      cityUrl
    ).then(data => this.setState({ cities: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    request(
      'GET',
      carUrl + '/brands'
    ).then(data => this.setState({ carBrands: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    request(
      'GET',
      instructorUrl
    ).then(data => this.setState({ instructors: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    var { isLoading, error, carBrands, instructors, drivings, exams,
      selectedCarBrand, selectedInstructor } = this.state;
    var currentUserRole = this.props.currentUserRole;

    if (error) {
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (currentUserRole !== USER_ROLES.Student) {
      return <AccessDenied />
    } else {
      let reservationModal = this.prepareCourseModalStructure();
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
              <Button id="searchEventsButton" onClick={this.handleSearchSubmit} 
              disabled={selectedCarBrand==='-'||selectedInstructor==='-'}>
                Szukaj
              </Button>
            </div>
          </div>
          <Calendar drivings={drivings} exams={exams} />
          <Button id="reservationButton" onClick={this.handleReservationModalShow}>
            Rezerwuj
          </Button>
          {reservationModal}
        </div>);
    }
  }
}

export default withRouter(Booking);