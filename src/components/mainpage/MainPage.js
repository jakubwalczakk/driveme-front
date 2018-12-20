import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { request } from 'utils/APIUtils';
import { API_BASE_URL, ACCESS_TOKEN } from "constants/constants";
import "./MainPage.css";

const courseUrl = API_BASE_URL + '/mainpage';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPageData: '',
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {
    var options = {
      url: API_BASE_URL + '/mainpage',
      method: 'GET',
    }
    request(options)
    .then(data=>{
      this.setState({
        mainPageData:data
      })
    })
    
  }

  render() {

    var { mainPageData } = this.state;

    console.log("Uwaga")
    console.log(mainPageData);
    return (
      <div id="mainPageContainer">
        DZIEŃ DOBRY, TUTAJ {mainPageData}


      </div>
    );
  }
}