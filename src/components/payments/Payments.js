import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import "./Payments.css";

const studentId = 10;
const paymentUrl = API_BASE_URL + '/payment/student/' + studentId;

export default class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(paymentUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy płatności...');
        }
      })
      .then(data => this.setState({ payments: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  myFunc(date) {
  }

  render() {

    var { payments, isLoading, error } = this.state;

    if (error) {
      return <p id="paymentsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="paymentsLoadingLabel">Loading...</p>
    }

    const debt = 1000;
    return (
      <div id="paymentsContainer" >
        <p id="paymentsHeader">Musisz zapłacić jeszcze: {debt} zł</p>
        <h1 id="paymentsLabel">Lista Twoich wpłat</h1>
        <Table id="paymentsTable" responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th id="paymentNo">#</th>
              <th id="paymentDateCol">Data wpłaty</th>
              <th id="paymentAmountCol">Kwota</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i = 0) => (
              <tr key={payment.id}>
                <td>{++i}</td>
                <td>{payment.date}</td>
                <td>{payment.amount} zł</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}