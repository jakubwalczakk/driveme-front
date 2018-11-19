import React, { Component } from "react";

export default class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/car')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    cars: json,
                })
            });
    }

    render() {

        var { isLoaded, cars } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="ABC">
                    <ul>
                        {cars.map(car => (
                            <li key={car.id}>{car.brand} - {car.model}<br />
                                {car.licensePlate}<br />
                                Paliwo: {car.gasType}</li>
                        ))}
                    </ul>
                </div>
            )
        }
    }
}