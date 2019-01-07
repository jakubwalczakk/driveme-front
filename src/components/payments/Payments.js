import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { API_BASE_URL, USER_ROLES } from "constants/constants";
import { request } from "utils/APIUtils";
import { withRouter } from "react-router-dom";
import Payment from './Payment';
import "./Payments.css";
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from "../../common/ServerError";
import AccessDenied from "../../common/AccessDenied";

const paymentUrl = API_BASE_URL + '/payment/student';

class Payments extends Component {
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

    request(
      'GET',
      paymentUrl
    ).then(data => this.setState({ payments: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    var { payments, isLoading, error } = this.state;
    var currentUserRole = this.props.currentUserRole;

    if (error) {
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (currentUserRole !== USER_ROLES.Student) {
      return <AccessDenied />
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
                {/* <th id="paymentNo">#</th> */}
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

export default withRouter(Payments);