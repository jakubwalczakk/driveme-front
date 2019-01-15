import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, Image, Button, Modal, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import ReactFileReader from 'react-file-reader';
import { request } from "utils/APIUtils";
import { API_BASE_URL } from "constants/constants";
import { USER_ROLES } from "../../constants/constants";
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from '../../common/ServerError';
import City from "./City";
import "./CityList.css";

const cityUrl = API_BASE_URL + '/city';

class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            isLoading: false,
            error: null,
            showAddModal: false,
            newCityName: {
                value: ''
            },
            newCityDescription: {
                value: ''
            },
            newCarImage: '',
        };

        this.handleShowAddModal = this.handleShowAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.prepareAddModalStructure = this.prepareAddModalStructure.bind(this);

        this.handleNewCityNameChange = this.handleNewCityNameChange.bind(this);
        this.handleNewCityDescriptionChange = this.handleNewCityDescriptionChange.bind(this);

        this.handleSubmitAddCity = this.handleSubmitAddCity.bind(this);
    }

    handleNewCityNameChange(event) {
        this.setState({
            newCityName: {
                value: event.target.value
            }
        });
    }

    handleNewCityDescriptionChange(event) {
        this.setState({
            newCityDescription: {
                value: event.target.value
            }
        });
    }

    handleShowAddModal() {
        this.setState({ showAddModal: true });
    }

    handleCloseAddModal() {
        this.setState({ showAddModal: false });
    }

    handleAddNewCityPhoto = (files) => {

        let photoString = files.base64;
        let photo;

        const jpegSubstring = "data:image/jpeg;base64,";
        const pngSubstring = "data:image/png;base64,";

        if (photoString.includes(jpegSubstring)) {
            photo = photoString.replace(jpegSubstring, "")
        } else if (photoString.includes(pngSubstring)) {
            photo = photoString.replace(pngSubstring, "")
        } else {
            photo = null;
        }

        document.getElementById('newCityImage').setAttribute('src', "data:image/jpeg;base64," + photo);
        this.setState({
            newCityImage: photo
        })
    }

    handleSubmitAddCity() {

        var { newCityName, newCityDescription, newCityImage } = this.state;

        const addCityRequest = {
            name: newCityName.value,
            description: newCityDescription.value,
            image: newCityImage
        }

        request(
            'POST',
            cityUrl,
            addCityRequest
        ).then(data => this.setState({ isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));

        this.handleCloseAddModal();
        this.componentDidMount();
    }

    prepareAddModalStructure() {

        var { showAddModal, newCityName, newCityDescription, newCityImage } = this.state;

        return (
            <Modal show={showAddModal} onHide={this.handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dodaj nowe miasto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="addCityModal">
                        <div id="addCityDataModal">
                            <FormGroup className="addCityForm">
                                <ControlLabel>Nazwa</ControlLabel>
                                <FormControl onChange={this.handleNewCityNameChange} value={newCityName.value} />
                            </FormGroup>
                            <FormGroup className="addCityForm">
                                <ControlLabel>Opis</ControlLabel>
                                <FormControl onChange={this.handleNewCityDescriptionChange} value={newCityDescription.value} />
                            </FormGroup>
                        </div>
                        <div id="addCityPhotoModal">
                            <Image id="newCityImage" src={"data:image/jpeg;base64," + newCityImage} rounded responsive />
                            <ReactFileReader fileTypes={[".jpg", ".png"]} base64={true} multipleFiles={false} handleFiles={this.handleAddNewCityPhoto}>
                                <div>
                                    <Button id="uploadCityPhotoButton" bsStyle="primary">
                                        Dodaj zdjęcie
                                    </Button>
                                </div>
                            </ReactFileReader>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="add-city-btn" onClick={this.handleCloseAddModal}>Anuluj</Button>
                    <Button className="add-city-btn" onClick={this.handleSubmitAddCity}>Dodaj</Button>
                </Modal.Footer>
            </Modal >
        );
    }

    componentDidMount() {
        this.setState({ isLoading: true });


        request(
            'GET',
            cityUrl
        ).then(data => this.setState({ cities: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        var { cities, isLoading, error, showAddModal } = this.state;
        var currentUserRole = this.props.currentUserRole;
        let addModal;

        if (isLoading) {
            return <LoadingIndicator />
        }

        if (error) {
            return <ServerError />
        }

        if (showAddModal) {
            addModal = this.prepareAddModalStructure();
        }


        let buttonVisibility;
        if (currentUserRole === USER_ROLES.Admin) {
            buttonVisibility = (
                <Button id="addCityButton" onClick={this.handleShowAddModal}>
                    Dodaj miasto
                </Button>);
        }

        const cityList = cities.map(city =>
            <City key={city.id} city={city} />);

        return (
            <div id="drivingCitiesContainer" >
                <h1 id="drivingCitiesHeader">Miasta w których jeździmy</h1>
                {buttonVisibility}
                <Table id="drivingCitiesTable" responsive striped bordered condensed hover>
                    <tbody>
                        {cityList}
                    </tbody>
                </Table>
                {addModal}
            </div>
        );
    }
}

export default withRouter(CityList);