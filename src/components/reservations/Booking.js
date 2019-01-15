import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale'
import { API_BASE_URL, USER_ROLES } from "constants/constants";
import { request } from "utils/APIUtils";
import Calendar from './../calendar/Calendar';
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from "../../common/ServerError";
import AccessDenied from "../../common/AccessDenied";
import 'react-datepicker/dist/react-datepicker.css';
import "./Booking.css";

registerLocale('enGB', enGB);

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
      selectedInstructorId: 0,
      selectedCarBrand: '-',
      reservationInstructorId: 0,
      reservationCarBrand: '-',
      reservationStartDate: null,
      reservationDuration: 0,
      reservationCity: '-',
      showReservationModal: false,
    }
    this.handleSelectedCarBrandChange = this.handleSelectedCarBrandChange.bind(this);
    this.handleSelectedInstructorIdChange = this.handleSelectedInstructorIdChange.bind(this);
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

  handleSelectedInstructorIdChange(event) {
    const selectedIndex = event.target.options.selectedIndex;
    this.setState({
      selectedInstructorId: event.target.options[selectedIndex].getAttribute('key-data')
    });
  }

  handleSearchSubmit() {
    var { selectedCarBrand, selectedInstructorId } = this.state;

    if (selectedCarBrand !== '-' && selectedInstructorId !== 0) {
      request(
        'GET',
        eventsUrl + `/booking?instructor=${selectedInstructorId}&brand=${selectedCarBrand}`
      ).then(data => this.setState({
        drivings: data.drivings,
        exams: data.exams,
        isLoading: false
      })).catch(error => this.setState({ error, isLoading: false }));
    } else if (selectedInstructorId !== 0) {
      request(
        'GET',
        eventsUrl + `/booking?instructor=${selectedInstructorId}`
      ).then(data => this.setState({
        drivings: data.drivings,
        exams: data.exams,
        isLoading: false
      })).catch(error => this.setState({ error, isLoading: false }));
    }
  }

  handleReservationModalClose() {
    this.setState({ showReservationModal: false })
  }

  handleReservationModalShow() {
    this.setState({ showReservationModal: true })
  }

  prepareCourseModalStructure() {
    var { carBrands, instructors, cities, reservationStartDate } = this.state;

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
            <FormControl componentClass="select" onChange={this.handleReservationCarBrandChange}>
              <option>-</option>
              {carBrands.map(brand => (
                <option key={brand}>{brand}</option>)
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Instruktor</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleReservationInstructorChange}>
              <option key={0}>-</option>
              {instructors.map(instructor => (
                <option key={instructor.id} key-data={instructor.id}>
                  {instructor.name} {instructor.surname} - {instructor.email}
                </option>)
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Miasto</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleReservationCityChange}>
              <option key={0}>-</option>
              {cities.map(city => (
                <option key={city.id} key-data={city.id}>
                  {city.name}
                </option>)
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
              dateFormat="dd MMMM, yyyy HH:mm"
              timeCaption="czas"
              minDate={(new Date().addDays(3))}
              minTime={new Date(2019, 0, 1, 6)}
              maxTime={new Date(2019, 0, 1, 22)}
              locale='enGB'
              showMonthDropdown
              showWeekNumbers
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Czas trwania</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleReservationDurationChange}>
              <option key={0} key-data={0}>0</option>
              <option key={'1h'} key-data={'1h'}>{'1h'}</option>
              <option key={'1.5h'} key-data={'1.5h'}>{'1.5h'}</option>
              <option key={'2h'} key-data={'2h'}>{'2h'}</option>
              <option key={'2.5h'} key-data={'2.5h'}>{'2.5h'}</option>
              <option key={'3h'} key-data={'3h'}>{'3h'}</option>
              <option key={'3.5h'} key-data={'3.5h'}>{'3.5h'}</option>
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
    var { reservationCarBrand, reservationInstructorId, reservationCity, reservationStartDate, reservationDuration } = this.state;

    return (reservationCarBrand !== '-' &&
      reservationInstructorId !== 0 &&
      reservationCity !== '-' &&
      reservationStartDate !== null &&

      reservationDuration !== 0);
  }

  handleReservationInstructorChange(event) {
    const selectedIndex = event.target.options.selectedIndex;
    this.setState({
      reservationInstructorId: event.target.options[selectedIndex].getAttribute('key-data')
    });
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
    const selectedIndex = event.target.options.selectedIndex;
    this.setState({
      reservationDuration: event.target.options[selectedIndex].getAttribute('key-data')
    });
  }

  handleReservationSubmit() {

    var { reservationCarBrand, reservationInstructorId, reservationCity, reservationStartDate, reservationDuration } = this.state;
    const duration = parseFloat(reservationDuration.slice(0, -1)) * 60;

    var data = reservationStartDate.toISOString();

    const reservationRequest = {
      startDate: data,
      duration: duration,
      instructor: { id: reservationInstructorId },
      carBrand: reservationCarBrand,
      drivingCity: reservationCity
    }

    var availabilityRequestResponse;

    request(
      'GET',
      eventsUrl + `/term_availability?instructor=${reservationInstructorId}&brand=${reservationCarBrand}
      &startDate=${data}&duration=${duration}`
    ).then(response => {
      availabilityRequestResponse = response
    }).then(() => {
      if (availabilityRequestResponse) {
        request(
          'POST',
          reservationUrl,
          reservationRequest
        ).then(response => {
          if (response) {
           this.handleReservationModalClose();
          } else {
            alert(`Niestety, nie udało się dokonać rezerwacji.`);
          }
        })
      } else {
        alert(`Niestety, rezerwacja nie została zaakceptowana. 
              Podany termin rezerwacji nie jest dostępny!`);
      }
    })
      .catch(error => this.setState({ error, isLoading: false }));
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
      selectedCarBrand, selectedInstructorId } = this.state;
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
                <FormControl componentClass="select" onChange={this.handleSelectedInstructorIdChange}>
                  <option>-</option>
                  {instructors.map(instructor => (
                    <option key={instructor.id} key-data={instructor.id}>
                      {instructor.name} {instructor.surname} - {instructor.email}
                    </option>)
                  )}
                </FormControl>
              </FormGroup>
            </div>
            <div id="searchButtonContainer">
              <Button id="searchEventsButton" onClick={this.handleSearchSubmit}
                disabled={selectedInstructorId === 0}>
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