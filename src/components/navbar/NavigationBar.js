import React, { Component } from "react";
import { Nav, Navbar, NavItem, Image, Modal, Button } from "react-bootstrap";
import { getCurrentUser } from "utils/APIUtils";
import "./NavigationBar.css";

const currentUserName = 'Jakub';
const currentUser = getCurrentUser();

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            showModal: false,
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleShowLogoutModal = this.handleShowLogoutModal.bind(this);
        this.handleCloseLogoutModal = this.handleCloseLogoutModal.bind(this);
        this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
        this.prepareModalStructure = this.prepareModalStructure.bind(this);
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleShowLogoutModal() {
        this.setState({ showModal: true });
    }

    handleCloseLogoutModal() {
        this.setState({ showModal: false });
    }

    handleLogoutButtonClick() {
        console.log("WYLOGOWUJĘ CIĘ KOLEŻKO");
        this.props.history.push("/");
        this.handleCloseLogoutModal();
    }

    prepareModalStructure() {
        return (
            <Modal show={this.state.showModal} onHide={this.handleCloseLogoutModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 id="logoutHeader">{`Hej ${currentUserName},`}</h1>
                    <p id="logoutQuestion">czy na pewno chcesz się wylogować?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="logout-btn" onClick={this.handleCloseLogoutModal}>Anuluj</Button>
                    <Button className="logout-btn" onClick={this.handleLogoutButtonClick}>Wyloguj</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        var { isLoggedIn, showModal } = this.state;
        let loggingNavItem;
        let logoutModal;

        if (isLoggedIn) {
            loggingNavItem =
                <Nav pullRight>
                    <NavItem id="welcomeMsg" className="nav-bar-item-logged" href="/profile">
                        {`Cześć ${currentUserName}!`}
                    </NavItem>
                    <NavItem id="logoutButton" className="material-icons nav-bar-item-logged" onClick={this.handleShowLogoutModal}>
                        power_settings_new
                    </NavItem>
                </Nav>
        } else {
            // loggingNavItem =<Nav pullRight>
            //         <NavItem className="nav-bar-item nav-bar-btn" href="/login">Zaloguj</NavItem>
            //         <NavItem className="nav-bar-item nav-bar-btn" href="/register">Zarejestruj</NavItem>
            //     </Nav>
        }

        if (showModal) {
            logoutModal = this.prepareModalStructure();
        }

        return (
            <Navbar className="nav-bar" fixedTop responsive="true" hidden={!isLoggedIn}>
            {/* <Navbar className="nav-bar" fixedTop responsive="true" hidden={true}> */}
                <Navbar.Header responsive="true">
                    <a href="/">
                        <Image id="logoBrand" src="/logo.png" rounded responsive />
                    </a>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className="nav-bar-item" eventKey={1} href="/course">
                            Kurs
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={2} href="/progress">
                            Twoje postępy
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={2} href="/rate">
                            Oceń
                        </NavItem>
                        <NavItem className="nav-bar-item" eventKey={3} href="/students">
                            Kursanci
                        </NavItem>
                        <NavItem disabled={!currentUser.role==='Administrator'} className="nav-bar-item" eventKey={3} href="/register">
                            Rejestruj
                        </NavItem>


                        <NavItem className="nav-bar-item" href="/login">
                            Zaloguj
                        </NavItem>

                        <NavItem className="nav-bar-item" eventKey={3} href="/exams">
                            Egzaminy
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
                    {logoutModal}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

