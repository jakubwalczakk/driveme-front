import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {

        //komunikacja z API działa tutaj!!!!
        console.log("Uwaga działam!!!");
        event.preventDefault();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const data = {
            name: 'Jakub',
            surname: 'Walczak',
            email: 'jakub.walczak@email.com',
            password: "PASSWORD",
            phoneNumber: "111222333"
        }

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        };

        const request = new Request('http://localhost:8080/user', options);
        const response = fetch(request);
        const status = response.status;
        console.log(status);
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
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel>Hasło</ControlLabel>
                        <FormControl
                            type="password"
                            minLength="8"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Checkbox id="rememberMeCheckbox">
                        Zapamiętaj mnie
                    </Checkbox>
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