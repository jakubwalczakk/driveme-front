import React, { Component } from "react";
import { Nav, Button, Navbar, NavItem, NavDropdown, MenuItem, Image } from "react-bootstrap";
import "./NavigationBar.css";

export default class NavigationBar extends Component {

    render() {
        return (
            <Navbar className="nav-bar" fixedTop responsive>
                <Navbar.Header>
                    <a href="/">
                        <Image id="logoBrand" src="/favicon.ico" rounded responsive />
                    </a>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={1} href="/course">
                            Kurs
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={2} href="/ratings">
                            Twoje postępy
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={3} href="/reservations">
                            Rezerwacje
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={3} href="/payments">
                            Płatności
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={4} href="/instructors">
                            Instruktorzy
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={5} href="/cars">
                            Samochody
                        </NavItem>
                        <NavItem className="nav-bar-item nav-bar-item-c" eventKey={6} href="/cities">
                            Miasta
                        </NavItem>
                    </Nav>
                    <Nav pullRight className="nav-bar-item">
                        {/* Tutaj zalogowany jako powinno pojawiać się w zamian za przycisku zaloguj, zarejestruj */}
                        <Navbar.Text pullRight id="nav-bar-logged-as">
                            Zalogowany jako: <Navbar.Link id="nav-bar-logged-as-value" href="#jakub.walczak">Jakub Walczak</Navbar.Link>
                        </Navbar.Text>
                        {/* <Button className="nav-bar-btn nav-bar-signin-button" href="/logout">Wyloguj</Button> */}
                        {/* <Button className="nav-bar-btn nav-bar-signin-button" href="/login">Zaloguj</Button>
                        <Button className="nav-bar-btn nav-bar-signup-button" href="/register">Zarejestruj</Button> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}