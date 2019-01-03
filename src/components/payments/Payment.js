import React, { Component } from "react";
import "./Payments.css";

export default class Payment extends Component {

  render() {
    var payment = this.props.payment;
    return (
      <tr key={payment.id}>
        <td>{payment.date}</td>
        <td>{payment.amount} zł</td>
      </tr>
    )
  }
}