import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";
import "./CityList.css";

export default class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            isLoaded: false,
        };
    }


    componentDidMount() {
        fetch('http://localhost:8080/city')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    cities: json,
                    isLoaded: true,
                })
            });
    }

    render() {

        var { isLoaded, cities } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="drivingCitiesContainer">
                    <Table id="drivingCitiesTable" responsive striped bordered condensed hover>
                        {/* <thead>
                            <th id="drivingCityName">Miasto</th>
                            <th id="drivingCityDesc">Opis</th>
                            <th id="drivingCityPhoto">Photo</th>
                        </thead> */}
                        <tbody>
                            {cities.map(city => (
                                <tr>
                                    <td>{city.name}</td>
                                    <td>
                                        {<Image id="drivingCityNamePhoto" src={"data:image/jpeg;base64," + city.image} responsive />}
                                    </td>
                                    <td>{city.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}