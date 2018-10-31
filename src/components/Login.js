import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import './../style/App.css';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <Label id="login-email-label" class="login-item" for={'LoginEmail'} text="login" />
                <Input id="LoginEmail" class="login-item" type={'email'} onChange={(event) => {
                    this.setState({ email: event.target.value });
                }} placeholder="login" />
                <Label id="login-password-label" class="login-item" for={'LoginPassword'} text="Hasło" />
                <Input id="LoginPassword" class="login-item" type={'password'} onChange={(event) => {
                    console.log('password changed');
                    this.setState({ password: event.target.value });
                }} placeholder="hasło" minLength="8" />
                <Button id="ButtonLogin" class="login-item" text="zaloguj" color="white" handleClick={(event) => {
                    console.log("Button clicked!!!");
                }} />
            </div>);
    }
}

export default Login;