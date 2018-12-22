import React, { Component } from "react";
import { Table, Image, Button, Modal, FormGroup, ControlLabel, FormControl, Thumbnail } from "react-bootstrap";
import ReactFileReader from 'react-file-reader';
import { API_BASE_URL } from "constants/constants";
import "./CarTable.css";

const carUrl = API_BASE_URL + '/car';

export default class CarTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            isLoading: false,
            error: null,
            showAddModal: false,
            carBrands: [],
            newCarBrand: '',
            newCarModel: {
                value: ''
            },
            newCarLicensePlate: {
                value: ''
            },
            newCarImage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleShowAddModal = this.handleShowAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.prepareAddModalStructure = this.prepareAddModalStructure.bind(this);
        this.handleSubmitAddCar = this.handleSubmitAddCar.bind(this);
        this.handleAddCarPhoto = this.handleAddCarPhoto.bind(this);
        this.handleSelectedCarBrandChange = this.handleSelectedCarBrandChange.bind(this);
        this.handleNewCarModelChange = this.handleNewCarModelChange.bind(this);
        this.handleNewCarLicensePlateChange = this.handleNewCarLicensePlateChange.bind(this);
    }

    handleChange = (event) => {
        const inputValue = event.target.value;

        console.log(inputValue)

        this.setState({
            [event.target.id]: {
                value: inputValue,
            }
        });
    }

    handleNewCarModelChange(event) {
        this.setState({
            newCarModel: {
                value: event.target.value
            }
        });
    }

    handleNewCarLicensePlateChange(event) {
        this.setState({
            newCarLicensePlate: {
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

    handleSelectedCarBrandChange = (event) => {
        this.setState({ selectedCarBrand: event.target.value })
    }

    handleAddCarPhoto = (files) => {

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

    handleSubmitAddCar() {

        var { newCarBrand, newCarModel, newCarLicensePlate, newCarImage } = this.state;

        const addCarRequest = {
            brand: newCarBrand,
            model: newCarModel.value,
            gasType: 'Gaz',
            licensePlate: newCarLicensePlate.value,
            photo: newCarImage
        }

        console.log(addCarRequest);

        // fetch(carUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(addCarRequest)
        // }).then(response => {
        //     if (response.ok) {
        //         return response.json();
        //     } else {
        //         throw new Error('Coś poszło nie tak podczas dodawania nwoego samochodu...');
        //     }
        // });
    }

    prepareAddModalStructure() {

        var { carBrands, newCarBrand: selectedCarBrand, showAddModal, newCarModel, newCarLicensePlate, newCarImage } = this.state;

        return (
            <Modal show={showAddModal} onHide={this.handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dodaj nowy samochód
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="addCarModal">
                        <div id="addCarModalBrand">
                            <FormGroup className="addCarForm">
                                <ControlLabel>Marka</ControlLabel>
                                <FormControl componentClass="select" onChange={this.handleSelectedCarBrandChange} value={selectedCarBrand}>
                                    <option>-</option>
                                    {carBrands.map(brand => (
                                        <option key={brand}>{brand}</option>)
                                    )}
                                </FormControl>
                            </FormGroup>
                            <FormGroup id="car-model-form" className="addCarForm">
                                <ControlLabel>Model</ControlLabel>
                                <FormControl id="carModel" type="text"
                                    value={newCarModel.value}
                                    onChange={this.handleNewCarModelChange}
                                />
                            </FormGroup>
                            <FormGroup id="car-licensePlate-form" className="addCarForm">
                                <ControlLabel>Tablica rejestracyjna</ControlLabel>
                                <FormControl id="carLicensePlate" type="text"
                                    value={newCarLicensePlate.value}
                                    onChange={this.handleNewCarLicensePlateChange}
                                />
                            </FormGroup>
                        </div>
                        <div id="addCarModalPhoto">
                            <Image id="newCarImage" src={"data:image/jpeg;base64," + newCarImage} rounded responsive />
                            <ReactFileReader fileTypes={[".jpg", ".png"]} base64={true} multipleFiles={false} handleFiles={this.handleAddCarPhoto}>
                                <div id="uploadCarPhotoButtonContainer">
                                    <Button id="uploadCarPhotoButton" bsStyle="primary">
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

        fetch(carUrl + '/brands')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Coś poszło nie tak podczas pobierania listy marek samochodów...');
                }
            })
            .then(data => this.setState({ carBrands: data }));

        fetch(carUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Coś poszło nie tak podczas pobierania listy samochodów...');
                }
            })
            .then(data => this.setState({ cars: data, isLoading: false }))
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
            return <p id="carsLoadingLabel">Loading...</p>
        }

        let currentUser = 'Adminisatrator';

        return (
            <div id="carsTableContainer">
                <h1 id="carsHeader">Dostępne pojazdy</h1>
                <Button id="addCarButton" hidden={currentUser === 'Administrator'} onClick={this.handleShowAddModal}>
                    Dodaj samochód
                </Button>
                <Table id="carsTable" responsive striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th id="carBrandCol">Marka</th>
                            <th id="carModelCol">Model</th>
                            {/* <th id="carLicensePlateCol">Numer rejestracji</th> */}
                            <th id="carGasTypeCol">Typ paliwa</th>
                            <th id="carImgCol"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                {/* <td>{car.licensePlate}</td> */}
                                <td>{car.gasType}</td>
                                <td>
                                    <Image id="carImage" src={"data:image/jpeg;base64," + car.photo} rounded responsive />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {addModal}
            </div>
        );
    }
}