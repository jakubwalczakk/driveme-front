import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { API_BASE_URL, CURRENT_USER_ROLE } from "constants/constants";
import { request } from "utils/APIUtils";
import Payment from './Payment';
import "./Payments.css";

const paymentUrl = API_BASE_URL + '/payment/student/';

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

    request({
      url: paymentUrl,
      method: 'GET'
    }).then(data => this.setState({ payments: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }



  render() {

    var { payments, isLoading, error } = this.state;

    if (error) {
      return <p id="paymentsInfoLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="paymentsInfoLabel">Pobieranie danych...</p>
    }

    if (CURRENT_USER_ROLE !== 'Kursant') {
      return <p id="paymentsInfoLabel">Nie posiadasz dostępu do tego zasobu!</p>
    } else {

      const paymentList = payments.map(payment =>
        <Payment key={payment.id} payment={payment} />)

      var totalPayment = 0;

      for (var i = 0; i < payments.length; i++) {
        totalPayment += payments[i].amount;
      }

      return (
        <div id="paymentsContainer" >
          <p id="paymentsHeader">Musisz zapłacić jeszcze: {1500 - totalPayment} zł</p>
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
              {paymentList}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}