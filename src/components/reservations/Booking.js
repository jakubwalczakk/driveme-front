import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import ModalExample from "components/modal/ModalExample";
import "./Booking.css";
import MyDatePicker from "../datepicker/MyDatePicker";

const carUrl = API_BASE_URL + '/car';
const instructorUrl = API_BASE_URL + '/instructor';

export default class Booking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carBrands: [],
      instructors: [],
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
        }
      })
      .then(data => this.setState({ instructors: data }));
  }

  render() {
    var { carBrands, instructors } = this.state;

    return (
      <div id="bookingContainer">
        <p id="bookingLabel">Tutaj możesz dokonać rezerwacji</p>
        <p>Wybierz markę samochodu</p>
        <FormGroup id="carBrandSelectList">
          <ControlLabel>Marka</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option>-</option>
            {carBrands.map(brand => (
              <option key={brand}>{brand}</option>)
            )}
          </FormControl>
        </FormGroup>
        <p>Wybierz instruktora</p>
        <FormGroup id="instructorSelectList">
          <ControlLabel>Instruktor</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option>-</option>
            {instructors.map(instructor => (
              <option key={instructor.id}>{instructor.name + ' ' + instructor.surname + ' - ' + instructor.email}</option>)
            )}
          </FormControl>
        </FormGroup>
        {/* <ModalExample /> */}
        <MyDatePicker/>
      </div>
    );
  }
}