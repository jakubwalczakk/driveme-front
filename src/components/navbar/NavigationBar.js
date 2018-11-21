import React, { Component } from "react";
import { Nav, Button, Navbar, NavItem, NavDropdown, MenuItem, Image } from "react-bootstrap";
import "./NavigationBar.css";

export default class NavigationBar extends Component {

    render() {
        return (
            <Navbar className="nav-bar" fixedTop responsive>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">
                            <Image width="50px" src="/houston.png" rounded responsive />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={4} href="/ratings">
                            Twoje postępy
                        </NavItem>
                        <NavDropdown className="nav-bar-item nav-bar-item-c" eventKey={3} title="Jazdy">
                            <MenuItem eventKey={3.1} href="/reservations">Rezerwacje</MenuItem>
                            <MenuItem eventKey={3.2} href="/drivings">Jazdy</MenuItem>
                        </NavDropdown>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={5} href="/payments">
                            Płatności
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={1} href="/instructors">
                            Instruktorzy
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={2} href="/cars">
                            Samochody
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={3} href="/cities">
                            Miasta
                        </NavItem>
                    </Nav>
                    <Nav pullRight className="nav-bar-item">
                        <Button className="nav-bar-btn nav-bar-signin-button" href="/login">Zaloguj</Button>
                        <Button className="nav-bar-btn nav-bar-signup-button" href="/register">Zarejestruj</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}