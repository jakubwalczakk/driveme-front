import React, { Component } from "react";
import "./Payments.css";

export default class Payment extends Component {

  render() {
    return (
      <tr key={this.props.payment.id}>
        <td>{this.props.payment.date}</td>
        <td>{this.props.payment.amount} zł</td>
      </tr>
    )
  }
}