import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Tooltip, OverlayTrigger, Image } from "react-bootstrap";
import ReactFileReader from 'react-file-reader';
import { API_BASE_URL, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "constants/constants";
import { trimDate } from "utils/APIUtils";
import "./ProfileSettings.css";

const studentUrl = API_BASE_URL + '/student';
const instructorUrl = API_BASE_URL + '/instructor';

const currentUser = {
  role: 'Instruktor'
}

export default class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: {
        value: ''
      },
      name: {
        value: ''
      },
      surname: {
        value: ''
      },
      registrationDate: {
        value: ''
      },
      pesel: {
        value: ''
      },
      email: {
        value: ''
      },
      password: {
        value: ''
      },
      phoneNumber: {
        value: ''
      },
      city: {
        value: ''
      },
      zipCode: {
        value: ''
      },
      street: {
        value: ''
      },
      houseNo: {
        value: ''
      },
      image: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
    this.validateCity = this.validateCity.bind(this);
    this.validateZipCode = this.validateZipCode.bind(this);
    this.validateStreet = this.validateStreet.bind(this);
    this.validateHouseNo = this.validateHouseNo.bind(this);
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
  }

  handleChange = (event, validationFun) => {
    const inputValue = event.target.value;

    this.setState({
      [event.target.id]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  }

  handleSaveChanges() {

    var { id, password, phoneNumber, city, zipCode, street, houseNo } = this.state;

    if (this.validateForm()) {

      console.log(this.state)
      const updateRequest = {
        id: id,
        password: password,
        phoneNumber: phoneNumber,
        address: {
          city: city,
          zipCode: zipCode,
          street: street,
          houseNo: houseNo
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
    else {
      console.log("WIELKI BŁĄd")
    }
  }

  handleChangePhoto = (files) => {

    let photoString = files.base64;
    let photo;

    const jpegSubstring = "data:image/jpeg;base64,";
    const pngSubstring = "data:image/png;base64,";

    if (photoString.includes(jpegSubstring)) {
      photo = photoString.replace(jpegSubstring, "")
    } else if (photoString.includes(pngSubstring)) {
      photo = photoString.replace(pngSubstring, "")
    } else {
      photo = null;
    }

    if (photo != null) {
      const updateRequest = {
        id: 7,
        photo: photo
      }

      fetch(instructorUrl, {
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
          throw new Error('Coś poszło nie tak podczas aktualizacji danych instruktora...');
        }
      });
      this.componentDidMount();
    }
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
        id: { value: data.id },
        name: { value: data.name },
        surname: { value: data.surname },
        registrationDate: { value: trimDate(data.registrationDate) },
        pesel: { value: data.pesel },
        email: { value: data.email },
        phoneNumber: { value: data.phoneNumber },
        city: { value: data.address.city },
        zipCode: { value: data.address.zipCode },
        street: { value: data.address.street },
        houseNo: { value: data.address.houseNo }
      }))


    fetch(instructorUrl + '/7', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Coś poszło nie tak podczas pobierania danych instruktora...');
      }
    }).then(data => this.setState({
      image: data.photo
    }));
  }

  render() {

    var { id, name, surname, registrationDate, pesel, email, password, phoneNumber, city, zipCode, street, houseNo, image } = this.state;

    console.log(this.state)

    const passwordTooltip = (
      <Tooltip id="password-tooltip">
        <strong>Tutaj możesz zmienić swoje hasło.</strong>
      </Tooltip>);

    return (
      <div id="profileSettingsContainer">
        <div id="userPhotoContainer" hidden={currentUser.role !== 'Instruktor'}>
          {/*src={"data:image/jpeg;base64," + image} src="/legoman.jpg"*/}
          <Image id="userPhotoImage" src={"data:image/jpeg;base64," + image} rounded responsive />
          <ReactFileReader fileTypes={[".jpg", ".png"]} base64={true} multipleFiles={false} handleFiles={this.handleChangePhoto}>
            <Button id="userPhotoChangeButton" bsStyle="primary">
              Zmień
          </Button>
          </ReactFileReader>
        </div>
        <div id="nameContainer">
          <FormGroup id="name-form">
            <ControlLabel>Imię</ControlLabel>
            <FormControl id="name"
              disabled
              value={name.value}
            />
          </FormGroup>
          <FormGroup id="surname-form">
            <ControlLabel>Nazwisko</ControlLabel>
            <FormControl id="surname"
              disabled
              value={surname.value}
            />
          </FormGroup>
        </div>

        <div id="basicInfoContainer">
          <FormGroup id="registrationDate-form">
            <ControlLabel>Data rejestracji</ControlLabel>
            <FormControl id="registrationDate"
              disabled
              value={registrationDate.value}
            />
          </FormGroup>
          <FormGroup id="pesel-form">
            <ControlLabel>PESEL</ControlLabel>
            <FormControl id="pesel"
              disabled
              value={pesel.value}
            />
          </FormGroup>
        </div>

        <div id="credentialsContainer">
          <FormGroup id="email-form">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl id="email"
              disabled
              value={email.value}
            />
          </FormGroup>
          <OverlayTrigger placement="left" overlay={passwordTooltip}>
            <FormGroup id="password-form">
              <ControlLabel>Hasło</ControlLabel>
              <FormControl id="password"
                type="password"
                minLength={8}
                value={password.value}
                onChange={(event) => this.handleChange(event, this.validatePassword)}
              />
            </FormGroup>
          </OverlayTrigger>
          <FormGroup id="phoneNumber-form">
            <ControlLabel>Nr telefonu</ControlLabel>
            <FormControl id="phoneNumber" type="text"
              pattern="^\d{3}-\d{3}-\d{3}$||^\d{3} \d{3} \d{3}$||^\d{9}$"
              value={phoneNumber.value}
              onChange={(event) => this.handleChange(event, this.validatePhoneNumber)}
            />
          </FormGroup>
        </div>

        <div id="addressInfoContainer">
          <FormGroup id="city-form">
            <ControlLabel>Miasto</ControlLabel>
            <FormControl id="city"
              value={city.value}
              onChange={(event) => this.handleChange(event, this.validateCity)}
            />
          </FormGroup>
          <FormGroup id="zipCode-form">
            <ControlLabel>Kod pocztowy</ControlLabel>
            <FormControl id="zipCode"
              type="text"
              pattern="^\d{2}-\d{3}$"
              value={zipCode.value}
              onChange={(event) => this.handleChange(event, this.validateZipCode)}
            />
          </FormGroup>
          <FormGroup id="street-form">
            <ControlLabel>Ulica</ControlLabel>
            <FormControl id="street"
              value={street.value}
              onChange={(event) => this.handleChange(event, this.validateStreet)}
            />
          </FormGroup>
          <FormGroup id="houseNo-form">
            <ControlLabel>Nr domu</ControlLabel>
            <FormControl id="houseNo"
              value={houseNo.value}
              onChange={(event) => this.handleChange(event, this.validateHouseNo)}
            />
          </FormGroup>
        </div>
        <Button id="saveSettingsBtn" onClick={this.handleSaveChanges} disabled={!this.validateForm()}>Zapisz</Button>
      </div>
    );
  }

  validateForm() {
    var { password, phoneNumber, city, zipCode, street, houseNo } = this.state;

    //FIXME
    //FIXME
    //FIXME
    //FIXME
    //FIXME
    return password.validateStatus &&
      phoneNumber.validateStatus;// &&
    //   city.validateStatus &&
    //   zipCode.validateStatus &&
    //   street.validateStatus &&
    //   houseNo.validateStatus;
  }

  validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: false,
        message: `Hasło jest zbyt krótkie (Hasło wymaga minimum ${PASSWORD_MIN_LENGTH} znaków).`
      }
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validateStatus: false,
        message: `Hasło jest zbyt długie (Hasło może składać się z maksimum ${PASSWORD_MAX_LENGTH} znaków).`
      }
    } else {
      return {
        validateStatus: true,
        message: null,
      };
    }
  }

  validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return {
        validateStatus: false,
        message: 'Numer telefonu nie może byc pusty.'
      }
    }
    const PHONE_NUMBER_REGEX = RegExp("^\\d{3}-\\d{3}-\\d{3}$||^\\d{3} \\d{3} \\d{3}$||^\\d{9}$");
    if (PHONE_NUMBER_REGEX.test(phoneNumber)) {
      console.log("Numer ok!!!")
      return {
        validateStatus: true,
        message: null,
      };
    } else {
      console.log("błędny numer!!!")
      return {
        validateStatus: false,
        message: 'Numer telefonu nie jest zgodny z podanym formatem.'
      }
    }
  }

  validateCity = (city) => {
    if (city.length < 1) {
      return {
        validateStatus: false,
        message: `Nazwa miasta jest zbyt krótka.`
      }
    } else if (city.length > 100) {
      return {
        validateStatus: false,
        message: `Nazwa miasta jest zbyt długa.`
      }
    } else {
      return {
        validateStatus: true,
        message: null,
      };
    }
  }

  validateZipCode = (zipCode) => {
    if (zipCode.length < 1) {
      return {
        validateStatus: false,
        message: `Kod pocztowy jest zbyt krótki.`
      }
    } else if (zipCode.length > 100) {
      return {
        validateStatus: false,
        message: `Kod pocztowy jest zbyt długi.`
      }
    } else {
      return {
        validateStatus: true,
        message: null,
      };
    }
  }

  validateStreet = (street) => {
    if (street.length < 1) {
      return {
        validateStatus: false,
        message: `Nazwa ulicy jest zbyt krótka.`
      }
    } else if (street.length > 100) {
      return {
        validateStatus: false,
        message: `Nazwa ulicy jest zbyt długa.`
      }
    } else {
      return {
        validateStatus: true,
        message: null,
      };
    }
  }

  validateHouseNo = (houseNo) => {
    if (houseNo.length < 1) {
      return {
        validateStatus: false,
        message: `Numer domu jest zbyt krótki.`
      }
    } else if (houseNo.length > 100) {
      return {
        validateStatus: false,
        message: `Numer domu jest zbyt długi.`
      }
    } else {
      return {
        validateStatus: true,
        message: null,
      };
    }
  }
}