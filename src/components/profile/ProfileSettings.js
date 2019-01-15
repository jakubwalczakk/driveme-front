import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel, Tooltip, OverlayTrigger, Image } from "react-bootstrap";
import ReactFileReader from 'react-file-reader';
import { API_BASE_URL, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "constants/constants";
import { trimDate, request } from "utils/APIUtils";
import { USER_ROLES } from "../../constants/constants";
import AccessDenied from '../../common/AccessDenied';
import "./ProfileSettings.css";

const studentUrl = API_BASE_URL + '/student';
const instructorUrl = API_BASE_URL + '/instructor';

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      user: null,
      password: {
        value: '',
      },
      phoneNumber: {
        value: '',
      },
      image: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
    this.getTheUser = this.getTheUser.bind(this);
  }

  handleChange = (event, validationFun) => {

    const inputValue = event.target.value;

    this.setState({
      [event.target.id]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    })
  }

  handleSaveChanges() {
    var { password, user, image } = this.state;
    var currentUserRole = this.props.currentUserRole;

    if (currentUserRole === (USER_ROLES.Student || USER_ROLES.Admin)) {
      const updateRequest = {
        id: user.id,
        password: password.value,
        phoneNumber: user.phoneNumber
      }

      request(
        'PUT',
        studentUrl,
        updateRequest
      ).then(this.setState({ isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
    else if (currentUserRole === USER_ROLES.Instructor) {
      const updateRequest = {
        id: user.id,
        photo: image,
        password: password.value,
        phoneNumber: user.phoneNumber
      }

      request(
        'PUT',
        instructorUrl,
        updateRequest
      ).then(this.setState({ isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  handleChangePhoto(files) {
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

      this.setState({
        image: photo
      })
    } else {
      alert('Został wybrany zły format zdjęcia. Spróbuj ponownie! (tym razem wybierz format .jpg lub .png)')
    }
  }

  getTheUser() {
    var currentUserRole = this.props.currentUserRole;
    var userId = this.props.currentUser.id;
    var specifiedPath = '';

    if (currentUserRole === USER_ROLES.Student) {
      specifiedPath = '/student';
    } else if (currentUserRole === USER_ROLES.Instructor) {
      specifiedPath = '/instructor';
    } else if (currentUserRole === USER_ROLES.Admin) {
      specifiedPath = '/admin';
    }
    request(
      'GET',
      'http://localhost:8080' + specifiedPath + "/" + userId
    ).then(response => {
      this.setState({ user: response, image: response.photo });
    })
  }

  render() {
    var { password, image, user } = this.state;

    const passwordTooltip = (
      <Tooltip id="password-tooltip">
        <strong>Tutaj możesz zmienić swoje hasło.</strong>
      </Tooltip>);

    var currentUser = this.props.currentUser;
    var currentUserRole = this.props.currentUserRole;

    if (user === null) {
      this.getTheUser();
    }

    let studentDetails;
    if (currentUserRole === USER_ROLES.Student) {
      studentDetails = (

        <div>
          <FormGroup id="registrationDate-form">
            <ControlLabel>Data rejestracji</ControlLabel>
            <FormControl id="registrationDate"
              disabled
              value={(user && trimDate(user.registrationDate)) || ''}
            />
          </FormGroup>
          <FormGroup id="pesel-form">
            <ControlLabel>PESEL</ControlLabel>
            <FormControl id="pesel"
              disabled
              value={(user && user.pesel) || ''}
            />
          </FormGroup>
        </div>
      )
    }

    if (currentUser === null || undefined) {
      return <AccessDenied />;
    }
    return (
      <div id="profileSettingsContainer">
        <div id="userPhotoContainer" hidden={currentUserRole !== USER_ROLES.Instructor}>
          <Image id="userPhotoImage" src={"data:image/jpeg;base64," + image} rounded responsive />
          <ReactFileReader fileTypes={[".jpg", ".png"]} base64={true} multipleFiles={false} handleFiles={this.handleChangePhoto}>
            <Button id="userPhotoChangeButton" bsStyle="primary">
              Zmień zdjęcie
          </Button>
          </ReactFileReader>
        </div>
        <div id="nameContainer">
          <FormGroup id="name-form">
            <ControlLabel>Imię</ControlLabel>
            <FormControl id="name"
              disabled
              value={currentUser.name}
            />
          </FormGroup>
          <FormGroup id="surname-form">
            <ControlLabel>Nazwisko</ControlLabel>
            <FormControl id="surname"
              disabled
              value={currentUser.surname}
            />
          </FormGroup>
          <FormGroup id="email-form">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl id="email"
              disabled
              value={currentUser.email}
            />
          </FormGroup>
        </div>

        <div id="basicInfoContainer">
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
              value={(user && user.phoneNumber) || ''}
              onChange={(event) => this.handleChange(event, this.validatePhoneNumber)}
            />
          </FormGroup>
          {studentDetails}
        </div>
        <Button id="saveSettingsBtn" onClick={this.handleSaveChanges}>Zapisz</Button>
      </div>
    );
  }

  validateForm() {
    var { password, user } = this.state;

    return password.validateStatus &&
      user.phoneNumber.validateStatus;
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
      return {
        validateStatus: true,
        message: null,
      };
    } else {
      return {
        validateStatus: false,
        message: 'Numer telefonu nie jest zgodny z podanym formatem.'
      }
    }
  }
}

export default withRouter(ProfileSettings);