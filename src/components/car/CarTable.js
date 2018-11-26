import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";
import "./CarTable.css";

export default class CarTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/car')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    cars: json,
                })
            });
    }

    render() {

        var { cars } = this.state;

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
                            <tr>
                                <td>{car.id}</td>
                                <td>
                                    <Image id="carImage" src={"data:image/jpeg;base64,"+car.carPhoto} rounded responsive />
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