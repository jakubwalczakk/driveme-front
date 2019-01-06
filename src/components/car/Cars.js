import React, { Component } from "react";
import { Table, Image, Button, Modal, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import ReactFileReader from 'react-file-reader';
import { request } from "utils/APIUtils";
import { API_BASE_URL } from "constants/constants";
import { withRouter } from "react-router-dom";
import Car from "./Car";
import "./Cars.css";

const carUrl = API_BASE_URL + '/car';

class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            isLoading: false,
            error: null,
            showAddModal: false,
            carBrands: [],
            newCarBrand: 'RENAULT',
            newCarModel: '',
            newCarLicensePlate: '',
            newCarImage: '',
            newCarGasType: 'Benzyna'
        };

        this.handleShowAddModal = this.handleShowAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.prepareAddModalStructure = this.prepareAddModalStructure.bind(this);

        this.handleNewCarBrandChange = this.handleNewCarBrandChange.bind(this);
        this.handleNewCarModelChange = this.handleNewCarModelChange.bind(this);
        this.handleNewCarLicensePlateChange = this.handleNewCarLicensePlateChange.bind(this);
        this.handleAddNewCarPhoto = this.handleAddNewCarPhoto.bind(this);
        this.handleNewCarGasTypeChange = this.handleNewCarGasTypeChange.bind(this);

        this.handleSubmitAddCar = this.handleSubmitAddCar.bind(this);
    }

    handleNewCarModelChange(event) {
        this.setState({
            newCarModel: event.target.value
        });
    }

    handleNewCarLicensePlateChange(event) {
        this.setState({
            newCarLicensePlate: event.target.value
        });
    }

    handleShowAddModal() {
        this.setState({ showAddModal: true });
    }

    handleCloseAddModal() {
        this.setState({ showAddModal: false });
    }

    handleNewCarBrandChange(event) {
        this.setState({ newCarBrand: event.target.value })
    }

    handleAddNewCarPhoto = (files) => {

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

        document.getElementById('newCarImage').setAttribute('src', "data:image/jpeg;base64," + photo);
        this.setState({
            newCarImage: photo
        })
    }

    handleNewCarGasTypeChange(event) {
        this.setState({ newCarGasType: event.target.value })
    }

    handleSubmitAddCar() {

        var { newCarBrand, newCarModel, newCarLicensePlate, newCarImage, newCarGasType } = this.state;

        const addCarRequest = {
            brand: newCarBrand,
            model: newCarModel,
            licensePlate: newCarLicensePlate,
            photo: newCarImage,
            gasType: newCarGasType,
        }

        // console.log(addCarRequest)

        request({
            url: carUrl,
            method: 'POST',
            body: JSON.stringify(addCarRequest)
        }).then(data => this.setState({ isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));

        this.handleCloseAddModal();
    }

    prepareAddModalStructure() {

        var { carBrands, newCarBrand, showAddModal, newCarModel, newCarLicensePlate, newCarImage, newCarGasType } = this.state;

        return (
            <Modal show={showAddModal} onHide={this.handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dodaj nowy samochód
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="addCarModal">
                        <div id="addCarDataModal">
                            <FormGroup className="addCarForm">
                                <ControlLabel>Marka</ControlLabel>
                                <FormControl componentClass="select" onChange={this.handleNewCarBrandChange} value={newCarBrand}>
                                    {carBrands.map(brand => (
                                        <option key={brand}>{brand}</option>)
                                    )}
                                </FormControl>
                            </FormGroup>
                            <FormGroup id="car-model-form" className="addCarForm">
                                <ControlLabel>Model</ControlLabel>
                                <FormControl id="carModel" type="text"
                                    value={newCarModel}
                                    onChange={this.handleNewCarModelChange}
                                />
                            </FormGroup>
                            <FormGroup id="car-licensePlate-form" className="addCarForm">
                                <ControlLabel>Tablica rejestracyjna</ControlLabel>
                                <FormControl id="carLicensePlate" type="text"
                                    value={newCarLicensePlate}
                                    onChange={this.handleNewCarLicensePlateChange}
                                />
                            </FormGroup>
                            <FormGroup className="addCarForm">
                                <ControlLabel>Silnik</ControlLabel>
                                <FormControl componentClass="select" onChange={this.handleNewCarGasTypeChange} value={newCarGasType}>
                                    <option>Benzyna</option>
                                    <option>Ropa naftowa</option>
                                    <option>Gaz</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                        <div id="addCarPhotoModal">
                            <Image id="newCarImage" src={"data:image/jpeg;base64," + newCarImage} rounded responsive />
                            <ReactFileReader fileTypes={[".jpg", ".png"]} base64={true} multipleFiles={false} handleFiles={this.handleAddNewCarPhoto}>
                                <div id="uploadCarPhotoButtonContainer">
                                    <Button id="uploadCarPhotoButton" bsStyle="primary" disabled={newCarImage !== ''}>
                                        Dodaj zdjęcie
                                    </Button>
                                </div>
                            </ReactFileReader>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="add-car-btn" onClick={this.handleCloseAddModal}>Anuluj</Button>
                    <Button className="add-car-btn" onClick={this.handleSubmitAddCar}>Dodaj</Button>
                </Modal.Footer>
            </Modal >
        );
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        request({
            url: carUrl + '/brands',
            method: 'GET',
        }).then(data => this.setState({ carBrands: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));

        request({
            url: carUrl,
            method: 'GET'
        }).then(data => this.setState({ cars: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {

        var { cars, isLoading, error, showAddModal } = this.state;
        let addModal;

        if (showAddModal) {
            addModal = this.prepareAddModalStructure();
        }

        if (error) {
            return <p id="carsErrorLabel">{error.message}</p>
        }

        if (isLoading) {
            return <p id="carsLoadingLabel">Pobieranie danych...</p>
        }

        let buttonVisibility;
        if ('Administrator' === 'Administrator') {
            buttonVisibility = (
                <Button id="addCarButton" onClick={this.handleShowAddModal}>
                    Dodaj samochód
                </Button>);
        }

        const carList = cars.map(car => <Car key={car.licensePlate} car={car} />);

        return (
            <div id="carsTableContainer">
                <h1 id="carsHeader">Dostępne pojazdy</h1>
                {buttonVisibility}
                <Table id="carsTable" responsive striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th id="carBrandCol">Marka</th>
                            <th id="carModelCol">Model</th>
                            <th id="carLicensePlateCol">Rejestracja</th>
                            <th id="carGasTypeCol">Typ paliwa</th>
                            <th id="carImgCol"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carList}
                    </tbody>
                </Table>
                {addModal}
            </div>
        );
    }
}

export default withRouter(Cars);