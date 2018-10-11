import React, { Component } from 'react';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: 'EMAIL',
            password: 'PASSWORD'
        };
    }

    render() {
        return (
            <div>
                <input
                    type="email"
                    //value={this.state.email}
                    onChange={(event) => {
                        this.setState({ email: event.target.value });
                    }} />
                <br />
                Value of the input email: {this.state.email}
                <br />
                <input
                    type="password"
                    //value={this.state.password}
                    onChange={(event) => {
                        this.setState({ password: event.target.value });
                    }} />
                <br />
                Value of the input password: {this.state.password}
                <br />
            </div>);
    }
}

export default Login;