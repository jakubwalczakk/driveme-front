import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { environment } from "environments/environment";
import "./ProfileSettings.css";

const profileUrl = environment.apiUrl + '/student';

export default class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      houseNumber: ""
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  componentDidMount() {
    fetch(profileUrl + '/11')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania danych użytkownika...');
        }
      }).then(data => this.setState({
        name: data.name, surname: data.surname,
        registrationDate: data.registrationDate,
        pesel: data.pesel, email: data.email,
        phoneNumber: data.phoneNumber,
        city: data.address.city, zipCode: data.address.zipCode,
        street: data.address.street, houseNumber: data.address.houseNo
      }))
    // .then(data=>console.log(data));
  }

  render() {
    return (
      <div id="profileSettingsContainer">
        <div id="nameContainer"><FormGroup id="name">
          <ControlLabel>Imię</ControlLabel>
          <FormControl
            disabled
            value={this.state.name}
          />
        </FormGroup> <FormGroup id="surname">
            <ControlLabel>Nazwisko</ControlLabel>
            <FormControl
              disabled
              value={this.state.surname}
            />
          </FormGroup></div>
        <div id="basicInfoContainer">
          <FormGroup id="registrationDate">
            <ControlLabel>Data rejestracji</ControlLabel>
            <FormControl
              disabled
              value={this.state.registrationDate}
            />
          </FormGroup>
          <FormGroup id="pesel">
            <ControlLabel>PESEL</ControlLabel>
            <FormControl
              disabled
              value={this.state.pesel}
            />
          </FormGroup>

        </div>
        <div id="credentialsContainer">
          <FormGroup id="email">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl
              disabled
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup id="password">
            <ControlLabel>Hasło</ControlLabel>
            <FormControl
              type="password"
              minLength={8}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup id="phoneNumber">
            <ControlLabel>Nr telefonu</ControlLabel>
            <FormControl type="text"
              pattern="^\d{3}-\d{3}-\d{3}$||^\d{3} \d{3} \d{3}$||^\d{9}$"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
          </FormGroup></div>
        <div id="addressInfoContainer">
          <FormGroup id="city">
            <ControlLabel>Miasto</ControlLabel>
            <FormControl
              value={this.state.city}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup id="zipCode">
            <ControlLabel>Kod pocztowy</ControlLabel>
            <FormControl type="text"
              pattern="^\d{2}-\d{3}$"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup id="street">
            <ControlLabel>Ulica</ControlLabel>
            <FormControl
              value={this.state.street}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup id="houseNumber">
            <ControlLabel>Nr domu</ControlLabel>
            <FormControl
              value={this.state.houseNumber}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button>Zapisz</Button>
        </div>
      </div>
    );
  }

}