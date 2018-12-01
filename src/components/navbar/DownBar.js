import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./DownBar.css";

export default class DownBar extends Component {
  render() {
    return (
      <Navbar className="down-bar" fixedBottom responsive>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="down-bar-item">
            <Navbar.Text id="down-bar-footer">
              Wykonane w ramach projektu inżynierskiego - Jakub Walczak  ™
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}