import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { request } from 'utils/APIUtils';
import { API_BASE_URL, ACCESS_TOKEN } from "constants/constants";
import "./MainPage.css";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPageData: '',
      isLoading: false,
      error: null,
      currentLoggedUser: ''
    }
  }

  loadCurrentLoggedUser() {
    // if (localStorage.getItem(ACCESS_TOKEN)) {

    //   request({
    //     url: 'http://localhost:8080/user/me',
    //     method: 'GET'
    //   }).then(data => this.setState({ currentLoggedUser: data, isLoading: false }))
    //     .catch(error => this.setState({ error, isLoading: false }));
    // } else {
    //   console.log("Nie można pobrać informacji na temat zalogowanego użytkownika");
    //   throw new Error('Nie można pobrać informacji na temat zalogowanego użytkownika...');
    // }
  }

  componentDidMount() {
    this.loadCurrentLoggedUser();
  }

  render() {

    return (
      <div id="mainPageContainer">
        Witaj {this.state.currentLoggedUser.name}!
        <br />
        Ten serwis pozwoli Ci na wygodne rezerwowanie terminów jazd.
  
      </div>
    );
  }
}