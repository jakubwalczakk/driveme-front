import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { ACCESS_TOKEN } from "constants/constants";
import { login } from 'utils/APIUtils';
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        };
    }

    handleEmailChange(event) {
        const inputValue = event.target.value;

        this.setState({
            email: {
                value: inputValue,
            }
        });
    }

    handlePasswordChange(event) {
        const inputValue = event.target.value;

        this.setState({
            password: {
                value: inputValue,
            }
        });
    }

    handleSubmit = event => {

        var { email, password } = this.state;

        event.preventDefault();

        const loginRequest = {
            email: email.value,
            password: password.value
        };

        login(loginRequest)
            .then(response => {

                console.log("LOGIN RESPONSE",response)
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);

                this.props.history.push("/main");
            }).catch(error => {
                if (error.status === 401) {
                    console.log('Your Username or Password is incorrect. Please try again!')
                } else {
                    console.log('Sorry! Something went wrong. Please try again!')
                }
            });
    }

    render() {
        return (
            <div className="loginContainer">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <ControlLabel>E-mail</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email.value}
                            onChange={this.handleEmailChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel>Hasło</ControlLabel>
                        <FormControl
                            type="password"
                            minLength="8"
                            value={this.state.password.value}
                            onChange={this.handlePasswordChange}
                        />
                    </FormGroup>
                    {/* <Checkbox id="rememberMeCheckbox">
                        Zapamiętaj mnie
                    </Checkbox> */}
                    {/* <p id="registerQuestion">Nie masz konta?<a id="registerRedirect" href="/register"> Zarejestruj się!</a></p> */}
                    <Button
                        id="login-button"
                        block
                        bsSize="large"
                        type="submit">
                        Zaloguj
                    </Button>
                </form>
            </div>
        );
    }
}