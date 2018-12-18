import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Tooltip, OverlayTrigger } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { trimDate } from "utils/APIUtils";
import "./ProfileSettings.css";

const studentUrl = API_BASE_URL + '/student';

export default class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      surname: "",
      registrationDate: [],
      pesel: "",
      email: "",
      password: "",
      phoneNumber: "",
      city: "",
      zipCode: "",
      street: "",
      houseNo: ""
    }
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSave() {
    console.log(this.state)
    const updateRequest={
      id: this.state.id,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      address:{
        city: this.state.city,
        zipCode: this.state.zipCode,
        street: this.state.street,
        houseNo: this.state.houseNo
      }
    }
    console.log(updateRequest)

    fetch(studentUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateRequest)
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Coś poszło nie tak podczas aktualizacji danych studenta...');
      }
    });

  }

  componentDidMount() {
    fetch(studentUrl + '/11')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania danych użytkownika...');
        }
      }).then(data => this.setState({
        id: data.id, name: data.name, surname: data.surname,
        registrationDate: trimDate(data.registrationDate),
        pesel: data.pesel, email: data.email, password: data.password,
        phoneNumber: data.phoneNumber,
        city: data.address.city, zipCode: data.address.zipCode,
        street: data.address.street, houseNo: data.address.houseNo
      }))
  }

  render() {

    const tooltip = (
      <Tooltip id="password-tooltip">
        <strong>Tutaj możesz zmienić swoje hasło.</strong>
      </Tooltip>);

    return (
      <div id="profileSettingsContainer">
        <div id="nameContainer">
          <FormGroup id="name-form">
            <ControlLabel>Imię</ControlLabel>
            <FormControl id="name"
              disabled
              value={this.state.name}
            />
          </FormGroup>
          <FormGroup id="surname-form">
            <ControlLabel>Nazwisko</ControlLabel>
            <FormControl id="surname"
              disabled
              value={this.state.surname}
            />
          </FormGroup>
        </div>

        <div id="basicInfoContainer">
          <FormGroup id="registrationDate-form">
            <ControlLabel>Data rejestracji</ControlLabel>
            <FormControl id="registrationDate"
              disabled
              value={this.state.registrationDate}
            />
          </FormGroup>
          <FormGroup id="pesel-form">
            <ControlLabel>PESEL</ControlLabel>
            <FormControl id="pesel"
              disabled
              value={this.state.pesel}
            />
          </FormGroup>
        </div>

        <div id="credentialsContainer">
          <FormGroup id="email-form">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl id="email"
              disabled
              value={this.state.email}
            />
          </FormGroup>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <FormGroup id="password-form">
              <ControlLabel>Hasło</ControlLabel>
              <FormControl id="password"
                type="password"
                minLength={8}
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
          </OverlayTrigger>
          <FormGroup id="phoneNumber-form">
            <ControlLabel>Nr telefonu</ControlLabel>
            <FormControl id="phoneNumber" type="text"
              pattern="^\d{3}-\d{3}-\d{3}$||^\d{3} \d{3} \d{3}$||^\d{9}$"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
          </FormGroup>
        </div>

        <div id="addressInfoContainer">
          <FormGroup id="city-form">
            <ControlLabel>Miasto</ControlLabel>
            <FormControl id="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup id="zipCode-form">
            <ControlLabel>Kod pocztowy</ControlLabel>
            <FormControl id="zipCode"
              type="text"
              pattern="^\d{2}-\d{3}$"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup id="street-form">
            <ControlLabel>Ulica</ControlLabel>
            <FormControl id="street"
              value={this.state.street}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup id="houseNo-form">
            <ControlLabel>Nr domu</ControlLabel>
            <FormControl id="houseNo"
              value={this.state.houseNo}
              onChange={this.handleChange}
            />
          </FormGroup>
        </div>
        <Button id="saveSettingsBtn" onClick={this.handleSave}>Zapisz</Button>
      </div>
    );
  }

}