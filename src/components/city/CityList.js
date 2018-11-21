import React, { Component } from "react";

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
                <div className="cities">
                    <ol>
                        {cities.map(city => (
                            <li key={city.id}>{city.name}</li>
                        ))}
                    </ol>
                </div>
            );
        }
    }
}