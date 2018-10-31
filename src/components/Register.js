import React, { Component } from 'react';
import Button from './Button';
import Label from './Label';
import Input from './Input';

class Register extends Component {

    render() {
        return (
            <div>
                <Label class="registration-item" for={'RegistrationName'} text="imię" />
                <Input id="RegistrationName" class="registration-item" onChange={(event) => {
                    this.setState({ name: event.target.value });
                }} placeholder="imię" />
                <Label class="registration-item" for={'RegistrationSurname'} text="nazwisko" />
                <Input id="RegistrationSurname" class="registration-item" onChange={(event) => {
                    this.setState({ surname: event.target.value });
                }} placeholder="nazwisko" />
                <Label class="registration-item" for={'RegistrationEmail'} text="login" />
                <Input id="RegistrationEmail" class="registration-item" type={'email'} onChange={(event) => {
                    this.setState({ email: event.target.value });
                }} placeholder="login" />
                <Label class="registration-item" for={'RegistrationPassword'} text="hasło" />
                <Input id="RegistrationPassword" class="registration-item" type={'password'} onChange={(event) => {
                    this.setState({ password: event.target.value });
                }} placeholder="hasło" />
                <br/>
                <select>
                    <option value="student">Student</option>
                    <option value="instructor">Instruktor</option>
                    <option value="admin">Administrator</option>
                </select>
                <br/>
                <br/>
                <Button text="ZAREJESTRUJ" />
            </div>);
    }
}

export default Register;