import React, { Component } from "react";
import { Nav, Navbar, NavItem, Image } from "react-bootstrap";
import "./NavigationBar.css";

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: true };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let loggingNavItem;

        if (isLoggedIn) {
            loggingNavItem =
                <Nav pullRight>
                    <NavItem className="nav-bar-item-logged" href="/profile">
                        Cześć Jakub!
                    </NavItem>
                    <NavItem className="material-icons nav-bar-item-logged" href="/logout">
                        power_settings_new
                    </NavItem>
                </Nav>
        } else {
            loggingNavItem =
                <Nav pullRight>
                    <NavItem className="nav-bar-item nav-bar-btn" href="/login">Zaloguj</NavItem>
                    <NavItem className="nav-bar-item nav-bar-btn" href="/register">Zarejestruj</NavItem>
                </Nav>
        }

        return (
            <Navbar className="nav-bar" fixedTop responsive="true">
                <Navbar.Header responsive="true">
                    <a href="/">
                        <Image id="logoBrand" src="/logo.png" rounded responsive />
                        {/* <Image id="logoBrand" src="/favicon.ico" rounded responsive /> */}
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
                    {loggingNavItem}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}