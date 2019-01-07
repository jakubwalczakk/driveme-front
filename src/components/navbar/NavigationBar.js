import React, { Component } from "react";
import { Nav, Navbar, NavItem, Image, Modal, Button } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { USER_ROLES } from 'constants/constants';
import "./NavigationBar.css";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };

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
        this.props.handleLogout();
        this.handleCloseLogoutModal();
    }

    prepareModalStructure() {
        var currentUserName = this.props.currentUser && this.props.currentUser.name;

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

    prepareNavBarStructure() {
        var currentUserRole = this.props.currentUserRole;

        if (currentUserRole === USER_ROLES.Student) {
            return (
                <Nav>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/course") }}>
                        Kurs
                    </NavItem>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/progress") }}>
                        Twoje postępy
                    </NavItem>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/exams") }}>
                        Egzaminy
                    </NavItem>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/reservations") }}>
                        Rezerwacje
                    </NavItem>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/payments") }}>
                        Płatności
                    </NavItem>
                </Nav>);
        } else if (currentUserRole === USER_ROLES.Admin) {
            return (
                <Nav>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/register") }}>
                        Rejestruj
                    </NavItem>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/students") }}>
                        Kursanci
                    </NavItem>
                </Nav>);
        } else if (currentUserRole === USER_ROLES.Instructor) {
            return (
                <Nav>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/exams") }}>
                        Egzaminy
                    </NavItem>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/reservations") }}>
                        Rezerwacje
                    </NavItem>
                    <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/drivings") }}>
                        Jazdy
                    </NavItem>
                </Nav>
            )
        }
    }

    render() {
        var { showModal } = this.state;

        var currentUser = this.props.currentUser;
        var currentUserName = currentUser && currentUser.name;

        let loggingNavItem;
        let logoutModal;

        if (this.props.isAuthenticated) {
            loggingNavItem =
                <Nav pullRight>
                    <NavItem id="welcomeMsg" className="nav-bar-item-logged" onClick={() => this.props.history.push('/profile')}>
                        {`Cześć ${currentUserName}!`}
                    </NavItem>

                    <NavItem id="logoutButton" className="material-icons nav-bar-item-logged" onClick={this.handleShowLogoutModal}>
                        power_settings_new
                    </NavItem>
                </Nav>
        }

        if (showModal) {
            logoutModal = this.prepareModalStructure();
        }

        let navBarTypes = this.prepareNavBarStructure();

        return (
            <Navbar className="nav-bar" fixedTop responsive="true" hidden={!this.props.isAuthenticated}>
                <Navbar.Header responsive="true">
                    <Image id="logoBrand" src="/logo.png" rounded responsive />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className="material-icons nav-bar-item" onClick={() => this.props.history.push('/')}>
                            home
                        </NavItem>
                        {navBarTypes}
                        <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/instructors") }}>
                            Instruktorzy
                        </NavItem>
                        <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/cars") }}>
                            Samochody
                        </NavItem>
                        <NavItem className="nav-bar-item" onClick={() => { this.props.history.push("/cities") }}>
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

export default withRouter(NavigationBar);