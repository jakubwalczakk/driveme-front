import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { environment } from "environments/environment";
import "./Payments.css";

const paymentUrl = environment.apiUrl + '/payment';

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
          throw new Error('Coś poszło nie tak podczas pobierania listy płątności...');
        }
      })
      .then(data => this.setState({ payments: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
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
        <p id="paymentsHeader">Musisz zapłacić jeszcze: {debt} PLN. </p>
        <h1 id="paymentsLabel">Lista Twoich wpłat</h1>
        <Table id="paymentsTable" responsive striped bordered condensed hover>
          <thead>
            <th id="paymentNo">#</th>
            <th id="paymentDateCol">Data wpłaty</th>
            <th id="paymentAmountCol">Kwota</th>
          </thead>
          <tbody>
            {payments.map((payment, i = 0) => (
              <tr key={payment.id}>
                <td>{++i}</td>
                <td>{payment.date}</td>
                <td>{payment.amount} PLN</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}