import React,{Component} from "react";
import "./Payments.css";

export default class Payments extends Component{
  render(){
    const debt = 1000;
    return(
      <div>
        <p id="paymentsLabel">Musisz zapłacić jeszcze: {debt} PLN. </p>
      </div>
    );
  }
}