import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="page-not-found">
        <h1 className="title">
          404
        </h1>
        <div className="desc">
          Podana strona nie istnieje!
        </div>
        <Link to="/"><Button className="go-back-btn">Powrót</Button></Link>
      </div>
    );
  }
}
export default NotFound;