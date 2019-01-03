import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
            email: '',
            password: ''
        };
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit(event) {
        var { email, password } = this.state;

        event.preventDefault();

        const loginRequest = {
            email: email,
            password: password
        };

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);

                this.props.history.push("/main");
            }).catch(error => {
                if (error.status === 401) {
                    console.log('Twój e-mail lub hasło jest niepoprawne. Spróbuj ponownie!')
                } else {
                    console.log('Przepraszamy! Coś poszło nie tak :( Spróbuj ponownie.')
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
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel>Hasło</ControlLabel>
                        <FormControl
                            type="password"
                            minLength="8"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </FormGroup>
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