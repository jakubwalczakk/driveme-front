import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { environment } from "environments/environment";
import './Register.css';

const registrationUrl = environment.apiUrl + '/user';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            email: "",
            password: "",
            phoneNumber: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {

        console.log("Uwaga działam podczas rejestracji!!!");
        event.preventDefault();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(this.state),
        };

        const request = new Request(registrationUrl, options);
        const response = fetch(request);
        const status = response.status;
        console.log(status);
    }

    render() {
        return (
            <div className="Register">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="name">
                        <ControlLabel>Imię</ControlLabel>
                        <FormControl
                            autoFocus
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="surname">
                        <ControlLabel>Nazwisko</ControlLabel>
                        <FormControl
                            value={this.state.surname}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
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
                    <FormGroup controlId="phoneNumber">
                        <ControlLabel>Numer telefonu</ControlLabel>
                        <FormControl
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
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
                    <Button
                        id="register-button"
                        block
                        bsSize="large"
                        type="submit">
                        Zarejestruj
                    </Button>
                </form>
            </div>);
    }
}