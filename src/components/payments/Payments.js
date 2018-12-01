import React,{Component} from "react";
import "./Payments.css";

export default class Payments extends Component{
  constructor(props){
    super(props);
    this.state={
      payments: []
    }
  }

  render(){
    const debt = 1000;
    return(
      <div>
        <p id="paymentsLabel">Musisz zapłacić jeszcze: {debt} PLN. </p>
      </div>
    );
  }
}