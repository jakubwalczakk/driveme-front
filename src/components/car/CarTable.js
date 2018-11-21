import React, { Component } from "react";
import { Table } from "react-bootstrap";

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
            <Table responsive striped bordered condensed hover>
                <thead>
                    <th>#</th>
                    <th>IMG</th>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Numer rejestracji</th>
                    <th>Typ paliwa</th>
                </thead>
                <tbody>
                    {cars.map(car=>(
                        <tr>
                            <td>{car.id}</td>
                            <td> </td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.licensePlate}</td>
                            <td>{car.gasType}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            );
    }
}