import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './ServerError.css';

class ServerError extends Component {
  render() {
    return (
      <div className="server-error-page">
        <h1 className="server-error-title">
          500
      </h1>
        <div className="server-error-desc">
          O nie! :( Coś poszło nie tak podczas pobierania danych z serwera. Spróbuj ponownie później!
        </div>
        <Link to="/">
          <Button className="server-error-go-back-btn">
            Powrót
          </Button>
        </Link>
      </div>
    )
  }
}

export default ServerError;
