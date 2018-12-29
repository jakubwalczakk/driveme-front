import React, { Component } from "react";
import { Nav, Navbar, NavItem, Image, Modal, Button } from "react-bootstrap";
import { getCurrentUser, logout, request } from "utils/APIUtils";
import { API_BASE_URL, ACCESS_TOKEN, CURRENT_USER_ROLE } from 'constants/constants';
import "./NavigationBar.css";

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            showModal: false,
            currentLoggedUser: ''
        };

        this.loadCurrentLoggedUser = this.loadCurrentLoggedUser.bind(this);
        this.prepareNavBarStructure = this.prepareNavBarStructure.bind(this);
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
        logout();
        this.handleCloseLogoutModal();
        // this.props.history.push("/");
        // this.props.history.push("/login")
    }

    prepareModalStructure() {
        return (
            <Modal show={this.state.showModal} onHide={this.handleCloseLogoutModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 id="logoutHeader">{`Hej Jakub,`}</h1>
                    <p id="logoutQuestion">czy na pewno chcesz się wylogować?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="logout-btn" onClick={this.handleCloseLogoutModal}>Anuluj</Button>
                    <Button className="logout-btn" onClick={this.handleLogoutButtonClick}>Wyloguj</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    loadCurrentLoggedUser() {
        // if (localStorage.getItem(ACCESS_TOKEN)) {

        //     request({
        //         url: 'http://localhost:8080/user/me',
        //         method: 'GET'
        //     }).then(data => this.setState({ currentLoggedUser: data, isLoading: false }))
        //         .catch(error => this.setState({ error, isLoading: false }));
        // } else {
        //     console.log("Nie można pobrać informacji na temat zalogowanego użytkownika");
        //     throw new Error('Nie można pobrać informacji na temat zalogowanego użytkownika...');
        // }
    }

    componentDidMount() {
        this.loadCurrentLoggedUser();
    }

    prepareNavBarStructure() {
        if (CURRENT_USER_ROLE === 'Kursant') {
            return (<Nav>
                <NavItem className="nav-bar-item" eventKey={1} href="/course">
                    Kurs
                </NavItem>
                <NavItem className="nav-bar-item" eventKey={2} href="/progress">
                    Twoje postępy
                </NavItem>
                <NavItem className="nav-bar-item" eventKey={3} href="/exams">
                    Egzaminy
                </NavItem>
                <NavItem className="nav-bar-item" eventKey={3} href="/reservations">
                    Rezerwacje
                </NavItem>
                {/* <NavItem className="nav-bar-item" eventKey={3} href="/book">
                    Rezerwuj
                </NavItem> */}
                <NavItem className="nav-bar-item" eventKey={3} href="/payments">
                    Płatności
                </NavItem>
            </Nav>);
        } else if (CURRENT_USER_ROLE === 'Administrator') {
            return (
                <Nav>
                    <NavItem className="nav-bar-item" eventKey={3} href="/register">
                        Rejestruj
                    </NavItem>
                    <NavItem className="nav-bar-item" eventKey={3} href="/students">
                        Kursanci
                    </NavItem>
                </Nav>);
        } else if (CURRENT_USER_ROLE === 'Instruktor') {
            return (
                <Nav>
                    <NavItem className="nav-bar-item" eventKey={3} href="/exams">
                        Egzaminy
                    </NavItem>
                    <NavItem className="nav-bar-item" eventKey={3} href="/reservations">
                        Rezerwacje
                    </NavItem>
                    <NavItem className="nav-bar-item" eventKey={2} href="/drivings">
                        Jazdy
                    </NavItem>
                </Nav>
            )
        }
    }

    render() {

        var { isLoggedIn, showModal, currentLoggedUser } = this.state;

        let loggingNavItem;
        let logoutModal;

        console.log("AUTH", currentLoggedUser.authorities);

        if (isLoggedIn) {
            loggingNavItem =
                <Nav pullRight>
                    <NavItem id="welcomeMsg" className="nav-bar-item-logged" href="/profile">
                        {`Cześć ${currentLoggedUser.name}!`}
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

        let navBarTypes = this.prepareNavBarStructure();

        return (
            <Navbar className="nav-bar" fixedTop responsive="true" hidden={false}>
                <Navbar.Header responsive="true">
                    <a href="/main">
                        <Image id="logoBrand" src="/logo.png" rounded responsive />
                    </a>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {navBarTypes}
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

