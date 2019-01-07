import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import "./MainPage.css";
import { USER_ROLES } from "../../constants/constants";

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
    var currentUserRole = this.props.currentUserRole;

    let msg = '';
    if (currentUserRole === USER_ROLES.Student) {
      msg = 'Studencie'
    } else if (currentUserRole === USER_ROLES.Instructor) {
      msg = 'Instruktorze'
    } else if (currentUserRole === USER_ROLES.Admin) {
      msg = 'Administratorze'
    }

    return (
      <div id="mainPageContainer">
        {`Witaj ${currentUser}!
        Ten serwis odmieni Twoje życie.`}
      </div>
    );
  }
}

export default withRouter(MainPage);