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
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handlePeselChange = this.handlePeselChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSelectedUserRoleChange = this.handleSelectedUserRoleChange.bind(this);
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
            }
        });
    }

    handleSelectedUserRoleChange(event) {
        this.setState({ selectedUserRole: event.target.value })
        console.log(this.state)
    }

    handleSubmit(event) {

        var { name, surname, email, phoneNumber, selectedUserRole } = this.state;

        event.preventDefault();

        const signupRequest = {
            name: name.value,
            surname: surname.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            role: selectedUserRole
        };
        console.log("***SIGNUP REQUEST***")
        console.log(signupRequest)

        // signup(signupRequest)
        //     .then(response => {
        //         console.log(response);
        //         this.props.history.push("/login");
        //     }).catch(error => {
        //     });
    }

    isFormValid() {
        var { name, surname, email, phoneNumber, selectedUserRole } = this.state;
        return (name.validateStatus === 'success' &&
            surname.validateStatus === 'success' &&
            email.validateStatus === 'success' //&&
            //this.state.phoneNumber.validateStatus === 'success' /
        );
    }

    render() {

        var { name, surname, pesel, email, phoneNumber, selectedUserRole } = this.state;

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
                    <FormGroup controlId="pesel">
                        <ControlLabel>PESEL</ControlLabel>
                        <FormControl
                            value={pesel.value}
                            onChange={(event) => this.handlePeselChange(event, this.validatePesel)}
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
                validateStatus: 'error',
                errorMsg: `Imię nie może być puste.)`
            }
        }
        else if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Imię jest zbyt krótkie (Poprawnę imię zawiera co najmniej ${NAME_MIN_LENGTH} znaków.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Imię jest zbyt długie (Poprawnę imię zawiera co najwyżej ${NAME_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateSurname = (surname) => {
        if (!surname) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwisko nie może być puste.)`
            }
        }
        else if (surname.length < SURNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwisko jest zbyt krótkie (Poprawnę nazwisko zawiera co najmniej ${NAME_MIN_LENGTH} znaków.)`
            }
        } else if (surname.length > SURNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nazwisko jest zbyt długie (Poprawnę nazwisko zawiera co najwyżej ${NAME_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validatePesel = (pesel) => {
        if (!pesel) {
            return {
                validateStatus: 'error',
                errorMsg: `Numer PESEL nie może być pusty.)`
            }
        }
        else if (pesel.length !== PESEL_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `PESEL nie składa się z 11 znaków, poprawny PESEL składa się z ${PESEL_LENGTH} znaków.)`
            }
        }
        const PESEL_REGEX = RegExp('^[0-9]{11}$');
        if (!PESEL_REGEX.test(pesel)) {
            return {
                validateStatus: 'error',
                message: 'Podany numer PESEL nie jest poprawny.'
            }
        }
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }


    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                message: 'Email nie może byc pusty.'
            }
        }
        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                message: 'Podany email nie jest poprawny.'
            }
        }
        return {
            validateStatus: 'success',
            message: null
        }
    }

    validateEmailAvailability() {
        const emailValue = this.state.email;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
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
                        validateStatus: 'success',
                        errorMsg: null
                    });
                } else {
                    this.setState({
                        email: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    });
                }
            }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    email: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                });
            });
    }

    validatePassword = (password) => {
        if (password.lenght < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                message: `Hasło jest zbyt krótkie (Hasło wymaga minimum ${PASSWORD_MIN_LENGTH} znaków).`
            }
        } else if (password.lenght > PASSWORD_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                message: `Hasło jest zbyt długie (Hasło może składać się z maksimum ${PASSWORD_MAX_LENGTH} znaków).`
            }
        } else {
            return {
                validateStatus: 'success',
                message: null,
            };
        }
    }

    validatePasswordRepeat = (password) => {
        if (password.lenght < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                message: `Hasło jest zbyt krótkie (Hasło wymaga minimum ${PASSWORD_MIN_LENGTH} znaków).`
            }
        } else if (password.lenght > PASSWORD_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                message: `Hasło jest zbyt długie (Hasło może składać się z maksimum ${PASSWORD_MAX_LENGTH} znaków).`
            }
        } else {
            if (password === this.state.password) {
                return {
                    validateStatus: 'success',
                    message: null,
                };
            } else {
                return {
                    validateStatus: 'error',
                    message: `Podane hasła nie są ze sobą zgodne.`
                }
            }
        }
    }

    validatePhoneNumber = (phoneNumber) => {
        const PHONE_NUMBER_REGEX = RegExp("^\\d{3}-\\d{3}-\\d{3}$||^\\d{3} \\d{3} \\d{3}$||^\\d{9}$");
        if (PHONE_NUMBER_REGEX.test(phoneNumber)) {
            console.log("Numer ok!!!")
            return {
                validateStatus: 'success',
                message: null,
            };
        } else {
            console.log("błędny numer!!!")
            return {
                validateStatus: 'error',
                message: 'Numer telefonu nie jest zgodny z podanym formatem.'
            }
        }
    }
}

