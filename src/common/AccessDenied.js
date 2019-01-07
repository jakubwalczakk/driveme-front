import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './AccessDenied.css';

class AccessDenied extends Component {
  render() {
    return (
      <div className="access-denied-page">
        <h1 className="title">
          Odmowa dostępu
        </h1>
        <div className="desc">
          Niestety, nie posiadasz dostępu do podanej strony!
        </div>
        <Link to="/"><Button className="go-back-btn">Powrót</Button></Link>
      </div>
    );
  }
}

export default AccessDenied;
