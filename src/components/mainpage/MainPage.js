import React, { Component } from "react";
import "./MainPage.css";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPageData: '',
      isLoading: false,
      error: null,
    }
  }

  render() {

    //TODO
    return (
      <div id="mainPageContainer">
        Witaj !
        <br />
        Ten serwis pozwoli Ci na wygodne rezerwowanie terminów jazd.
      </div>
    );
  }
}