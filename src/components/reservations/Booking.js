import React, { Component } from "react";
import "./Booking.css";

export default class Booking extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      carBrands: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/car/brands')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy marek samochodów...');
        }
      })
      .then(data => this.setState({ carBrands: data }));
  }

  render() {
    var { carBrands } = this.state;

    return (
      <div id="bookingContainer">
        <p id="bookingLabel">Tutaj możesz dokonać rezerwacji.</p>
        <p>Wybierz markę samochodu</p>
        <select>{carBrands.map(brand => (
          <option>{brand}</option>)
        )}
        </select>
      </div>
    );
  }
}