import React, { Component } from "react";
import { Table, Image, Button, Modal, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
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
            selectedCarBrand: '-',
        };
        this.handleShowAddModal = this.handleShowAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.prepareAddModalStructure = this.prepareAddModalStructure.bind(this);
    }

    handleShowAddModal() {
        this.setState({ showAddModal: true });
    }

    handleCloseAddModal() {
        this.setState({ showAddModal: false });
    }

    prepareAddModalStructure() {

        var { carBrands, selectedCarBrand } = this.state;

        return (
            <Modal show={this.state.showAddModal} onHide={this.handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dodaj nowy samochód
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="selectBrandContainer">
                        <p id="carBrandSelectLabel">Wybierz markę samochodu</p>
                        <FormGroup id="carBrandSelectList">
                            <ControlLabel>Marka</ControlLabel>
                            <FormControl componentClass="select" onChange={this.handleSelectedCarBrandChange} value={selectedCarBrand}>
                                <option>-</option>
                                {carBrands.map(brand => (
                                    <option key={brand}>{brand}</option>)
                                )}
                            </FormControl>
                        </FormGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="add-car-btn" onClick={this.handleCloseAddModal}>Anuluj</Button>
                    <Button className="add-car-btn" onClick={this.handleLogoutButtonClick}>Dodaj</Button>
                </Modal.Footer>
            </Modal>
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

        return (
            <div id="carsTableContainer">
                <div id="headerDiv">
                    <h1 id="carsHeader">Dostępne pojazdy</h1>
                    {/* <Button id="addCarButton">Dodaj samochód</Button> */}
                </div>
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
                                    <Image id="carImage" src={"data:image/jpeg;base64," + car.carPhoto} rounded responsive />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* <Button onClick={this.handleShowAddModal}>Dodaj samochód!</Button>
                {addModal} */}
            </div>
        );
    }
}