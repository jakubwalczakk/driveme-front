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
      currentLoggedUser:''
    }
  }

  loadCurrentLoggedUser() {
    if (localStorage.getItem(ACCESS_TOKEN)) {

      fetch('http://localhost:8080/user/me', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
        },
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania zalogowanego użytkownika...');
        }
      }).then(response => {
        this.setState({ currentLoggedUser: response })
      });
    } else {
      console.log("Nie można pobrać informacji na temat zalogowanego użytkownika");
    }
  }

  componentDidMount() {
    this.loadCurrentLoggedUser();
  }

  render() {

    return (
      <div id="mainPageContainer">
        Witaj {this.state.currentLoggedUser.name}!
        <br/>
        Ten serwis pozwoli Ci na wygodne rezerwowanie terminów jazd.

      </div>
    );
  }
}