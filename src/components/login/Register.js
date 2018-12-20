import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API_BASE_URL, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, EMAIL_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH, SURNAME_MIN_LENGTH, SURNAME_MAX_LENGTH, PESEL_LENGTH } from "constants/constants";
import { signup, checkEmailAvailability } from 'utils/APIUtils';
import './Register.css';

const registrationUrl = API_BASE_URL;

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: {
                value: ''
            },
            surname: {
                value: ''
            },
            pesel: {
                value: ''
            },
            email: {
                value: ''
            },
            // password: {
            //     value: ''
            // },
            // password2: {
            //     value: ''
            // },
            phoneNumber: {
                value: ''
            },
            selectedUserRole: 'Kursant',
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
            }
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handlePeselChange = this.handlePeselChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSelectedUserRoleChange = this.handleSelectedUserRoleChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
        this.handleStreetChange = this.handleStreetChange.bind(this);
        this.handleHouseNoChange = this.handleHouseNoChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    }

    handleNameChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            name: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSurnameChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            surname: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handlePeselChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            pesel: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleEmailChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            email: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handlePasswordChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            password: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handlePasswordRepeatChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            password2: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handlePhoneNumberChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            phoneNumber: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSelectedUserRoleChange(event) {
        this.setState({ selectedUserRole: event.target.value })
        console.log(this.state)
    }

    handleCityChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            city: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleZipCodeChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            zipCode: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleStreetChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            street: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleHouseNoChange(event, validationFun) {
        const target = event.target;
        const inputValue = target.value;

        console.log("target = " + target)
        console.log("inputValue = " + inputValue)

        this.setState({
            houseNo: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {

        var { name, surname, pesel, email, phoneNumber, selectedUserRole, city, zipCode, street, houseNo } = this.state;

        event.preventDefault();

        let signupRequest;

        if (selectedUserRole === 'Kursant') {
            signupRequest = {
                name: name.value,
                surname: surname.value,
                email: email.value,
                phoneNumber: phoneNumber.value,
                userRole: selectedUserRole,
                pesel: pesel.value,
                address: {
                    city: city.value,
                    zipCode: zipCode.value,
                    street: street.value,
                    houseNo: houseNo.value
                }
            };
        } else if (selectedUserRole === "Instruktor") {
            signupRequest = {
                name: name.value,
                surname: surname.value,
                email: email.value,
                phoneNumber: phoneNumber.value,
                userRole: selectedUserRole,
                workingHours: 20
            };
        } else {
            signupRequest = {
                name: name.value,
                surname: surname.value,
                email: email.value,
                phoneNumber: phoneNumber.value,
                userRole: selectedUserRole
            };
        }
        console.log("***SIGNUP REQUEST***")
        console.log(signupRequest)

        signup(signupRequest)
            .then(response => {
                console.log(response);
                // this.props.history.push("/login");
            }).catch(error => {
            });
    }

    isFormValid() {
        var { name, surname, email, phoneNumber, selectedUserRole, city, zipCode, street, houseNo } = this.state;
        return (name.validateStatus &&
            surname.validateStatus &&
            email.validateStatus //&&
            //phoneNumber.validateStatus;
        );
    }

    render() {

        var { name, surname, pesel, email, phoneNumber, selectedUserRole, city, zipCode, street, houseNo } = this.state;

        return (
            <div className="registrationContainer">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="name">
                        <ControlLabel>Imię</ControlLabel>
                        <FormControl
                            autoFocus
                            value={name.value}
                            onChange={(event) => this.handleNameChange(event, this.validateName)}
                        />
                    </FormGroup>
                    <FormGroup controlId="surname">
                        <ControlLabel>Nazwisko</ControlLabel>
                        <FormControl
                            value={surname.value}
                            onChange={(event) => this.handleSurnameChange(event, this.validateSurname)}
                        />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="email"
                            value={email.value}
                            onChange={(event) => this.handleEmailChange(event, this.validateEmail)}
                        />
                    </FormGroup>
                    {/* <FormGroup controlId="password">
                        <ControlLabel>Hasło</ControlLabel>
                        <FormControl
                            type="password"
                            minLength="8"
                            value={this.state.password.value}
                            onChange={(event) => this.handlePasswordChange(event, this.validatePassword)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password2">
                        <ControlLabel>Powtórz hasło</ControlLabel>
                        <FormControl
                            type="password"
                            minLength="8"
                            value={this.state.password2.value}
                            onChange={(event) => this.handlePasswordRepeatChange(event, this.validatePasswordRepeat)}
                        />
                    </FormGroup> */}
                    <FormGroup controlId="phoneNumber">
                        <ControlLabel>Numer telefonu</ControlLabel>
                        <FormControl type="text"
                            pattern="^\d{3}-\d{3}-\d{3}$||^\d{3} \d{3} \d{3}$||^\d{9}$"
                            value={phoneNumber.value}
                            onChange={(event) => this.handlePhoneNumberChange(event, this.validatePhoneNumber)}

                        />
                    </FormGroup>
                    {/* <FormGroup controlId="userRoleSelectList">
                        <ControlLabel>Rola</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="student">Student</option>
                            <option value="administrator">Administrator</option>
                            <option value="instructor">Instruktor</option>
                        </FormControl>
                    </FormGroup> */}

                    <FormGroup id="userRoleSelectList">
                        <ControlLabel>Instruktor</ControlLabel>
                        <FormControl componentClass="select" onChange={this.handleSelectedUserRoleChange} value={selectedUserRole}>
                            <option>Kursant</option>
                            <option>Instruktor</option>
                            <option>Administrator</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="pesel" hidden={selectedUserRole !== 'Kursant'}>
                        <ControlLabel>PESEL</ControlLabel>
                        <FormControl
                            value={pesel.value}
                            onChange={(event) => this.handlePeselChange(event, this.validatePesel)}
                        />
                    </FormGroup>
                    <FormGroup controlId="city" hidden={selectedUserRole !== 'Kursant'}>
                        <ControlLabel>Miasto</ControlLabel>
                        <FormControl
                            value={city.value}
                            onChange={(event) => this.handleCityChange(event, this.validateCity)}
                        />
                    </FormGroup>
                    <FormGroup controlId="zipCode" hidden={selectedUserRole !== 'Kursant'}>
                        <ControlLabel>Kod pocztowy</ControlLabel>
                        <FormControl
                            value={zipCode.value}
                            onChange={(event) => this.handleZipCodeChange(event, this.validateZipCode)}
                        />
                    </FormGroup>
                    <FormGroup controlId="street" hidden={selectedUserRole !== 'Kursant'}>
                        <ControlLabel>Ulica</ControlLabel>
                        <FormControl
                            value={street.value}
                            onChange={(event) => this.handlePeselChange(event, this.validateStreet)}
                        />
                    </FormGroup>
                    <FormGroup controlId="houseNo" hidden={selectedUserRole !== 'Kursant'}>
                        <ControlLabel>Nr domu</ControlLabel>
                        <FormControl
                            value={houseNo.value}
                            onChange={(event) => this.handleHouseNoChange(event, this.validateHouseNo)}
                        />
                    </FormGroup>
                    <Button
                        disabled={!this.isFormValid()}
                        id="register-button"
                        block
                        bsSize="large"
                        type="submit">
                        Zarejestruj
                    </Button>
                </form>
            </div>);
    }

    //validations functions
    validateName = (name) => {
        if (!name) {
            return {
                validateStatus: false,
                errorMsg: `Imię nie może być puste.`
            }
        }
        else if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: false,
                errorMsg: `Imię jest zbyt krótkie (Poprawnę imię zawiera co najmniej ${NAME_MIN_LENGTH} znaków.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: false,
                errorMsg: `Imię jest zbyt długie (Poprawnę imię zawiera co najwyżej ${NAME_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: true,
                errorMsg: null,
            };
        }
    }

    validateSurname = (surname) => {
        if (!surname) {
            return {
                validateStatus: false,
                errorMsg: `Nazwisko nie może być puste.)`
            }
        }
        else if (surname.length < SURNAME_MIN_LENGTH) {
            return {
                validateStatus: false,
                errorMsg: `Nazwisko jest zbyt krótkie (Poprawnę nazwisko zawiera co najmniej ${NAME_MIN_LENGTH} znaków.)`
            }
        } else if (surname.length > SURNAME_MAX_LENGTH) {
            return {
                validationStatus: false,
                errorMsg: `Nazwisko jest zbyt długie (Poprawnę nazwisko zawiera co najwyżej ${NAME_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: true,
                errorMsg: null,
            };
        }
    }

    validatePesel = (pesel) => {
        if (!pesel) {
            return {
                validateStatus: false,
                errorMsg: `Numer PESEL nie może być pusty.)`
            }
        }
        else if (pesel.length !== PESEL_LENGTH) {
            return {
                validateStatus: false,
                errorMsg: `PESEL nie składa się z 11 znaków, poprawny PESEL składa się z ${PESEL_LENGTH} znaków.)`
            }
        }
        const PESEL_REGEX = RegExp('^[0-9]{11}$');
        if (!PESEL_REGEX.test(pesel)) {
            return {
                validateStatus: false,
                message: 'Podany numer PESEL nie jest poprawny.'
            }
        }
        return {
            validateStatus: true,
            errorMsg: null,
        };
    }


    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: false,
                message: 'Email nie może byc pusty.'
            }
        }
        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: false,
                message: 'Podany email nie jest poprawny.'
            }
        }
        return {
            validateStatus: true,
            message: null
        }
    }

    validateEmailAvailability() {
        const emailValue = this.state.email;
        const emailValidation = this.validateEmail(emailValue);

        if (!emailValidation.validateStatus) {
            this.setState({
                email: emailValue,
                ...emailValidation
            });
            return;
        }

        this.setState({
            email: emailValue,
            validateStatus: 'validating',
            errorMsg: null
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: emailValue,
                        validateStatus: true,
                        errorMsg: null
                    });
                } else {
                    this.setState({
                        email: emailValue,
                        validateStatus: false,
                        errorMsg: 'This Email is already registered'
                    });
                }
            }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    email: emailValue,
                    validateStatus: true,
                    errorMsg: null
                });
            });
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

    validatePasswordRepeat = (password) => {
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
            if (password === this.state.password) {
                return {
                    validateStatus: true,
                    message: null,
                };
            } else {
                return {
                    validateStatus: false,
                    message: `Podane hasła nie są ze sobą zgodne.`
                }
            }
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

