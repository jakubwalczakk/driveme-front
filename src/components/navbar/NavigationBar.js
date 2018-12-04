import React, { Component } from "react";
import { Nav, Navbar, NavItem, Image } from "react-bootstrap";
import "./NavigationBar.css";

export default class NavigationBar extends Component {

    render() {
        return (
            <Navbar className="nav-bar" fixedTop responsive="true">
                <Navbar.Header responsive="true">
                    <a href="/">
                        {/* <Image id="logoBrand" src="/logo.png" rounded responsive /> */}
                        <Image id="logoBrand" src="/favicon.ico" rounded responsive />
                    </a>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className="nav-bar-item" eventKey={1} href="/course">
                            Kurs
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={2} href="/ratings">
                            Twoje postępy
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={3} href="/reservations">
                            Rezerwacje
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={3} href="/book">
                            Book
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={3} href="/payments">
                            Płatności
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={4} href="/instructors">
                            Instruktorzy
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={5} href="/cars">
                            Samochody
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={6} href="/cities">
                            Miasta
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem className="nav-bar-item nav-bar-btn" href="/login">Zaloguj</NavItem>
                        <NavItem className="nav-bar-item nav-bar-btn" href="/register">Zarejestruj</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}