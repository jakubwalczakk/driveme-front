import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { environment } from "environments/environment";
import "./Booking.css";

const carUrl = environment.apiUrl + '/car';

export default class Booking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carBrands: [],
      cars: [],
    }
  }

  componentDidMount() {
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
        }
      })
      .then(data => this.setState({ cars: JSON.parse(data) }));
  }

  render() {
    var { carBrands, cars } = this.state;

    // console.log(cars);

    return (
      <div id="bookingContainer">
        <p id="bookingLabel">Tutaj możesz dokonać rezerwacji.</p>
        <p>Wybierz markę samochodu</p>
        <FormGroup id="carBrandSelectList">
          <ControlLabel>Marka</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option>-</option>
            {carBrands.map(brand => (
              <option>{brand}</option>)
            )}
          </FormControl> 
         </FormGroup>         
      </div>
    );
  }
}