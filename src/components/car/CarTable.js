import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";
import { environment } from "environments/environment";
import "./CarTable.css";

const carUrl = environment.apiUrl + '/car';

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
                    throw new Error('Coś poszło nie tak podczas pobierania samochodów...');
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
                <Table id="carsTable" responsive striped bordered condensed hover>
                    <thead>
                        <th id="carIdCol">#</th>
                        <th id="carImgCol">Image</th>
                        <th id="carBrandCol">Marka</th>
                        <th id="carModelCol">Model</th>
                        <th id="carLicensePlateCol">Numer rejestracji</th>
                        <th id="carGasTypeCol">Typ paliwa</th>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>
                                    <Image id="carImage" src={"data:image/jpeg;base64," + car.carPhoto} rounded responsive />
                                </td>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.licensePlate}</td>
                                <td>{car.gasType}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}