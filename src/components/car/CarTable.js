import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";
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
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

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

        var { cars, isLoading, error } = this.state;

        if (error) {
            return <p id="carsErrorLabel">{error.message}</p>
        }

        if (isLoading) {
            return <p id="carsLoadingLabel">Loading...</p>
        }

        return (
            <div id="carsTableContainer">
                <h1 id="carsHeader">Dostępne pojazdy</h1>
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
            </div>
        );
    }
}