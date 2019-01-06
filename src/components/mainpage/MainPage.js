import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import "./MainPage.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPageData: '',
      isLoading: false,
      error: null,
    }
  }

  render() {

    var currentUser = this.props.currentUser && this.props.currentUser.name;
    //TODO
    return (
      <div id="mainPageContainer">
        Witaj {currentUser}!
        <br />
        Ten serwis pozwoli Ci na wygodne rezerwowanie terminów jazd szkoleniowych.
      </div>
    );
  }
}

export default withRouter(MainPage);