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

    return (
      <div id="mainPageContainer">
        Witaj {currentUser}!
        <br />
        DriveMe pozwoli Ci na wygodne zarządzanie kursem szkoleniowym.
        <br/>
        Życzymy owocnej nauki.
      </div>
    );
  }
}

export default withRouter(MainPage);