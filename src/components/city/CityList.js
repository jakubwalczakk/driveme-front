import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";
import "./CityList.css";

export default class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            isLoading: false,
            error: null,
        };
    }


    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('http://localhost:8080/city')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Coś poszło nie tak podczas pobierania listy miast...');
                }
            })
            .then(data => this.setState({ cities: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {

        var { cities, isLoading, error } = this.state;

        if (error) {
            return <p id="citiesErrorLabel">{error.message}</p>
        }

        if (isLoading) {
            return <p id="citiesLoadingLabel">Loading...</p>
        }

        return (
            <div id="drivingCitiesContainer" >
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