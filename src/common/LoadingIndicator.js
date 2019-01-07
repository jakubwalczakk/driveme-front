import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import './LoadingIndicator.css';

export default class LoadingIndicator extends Component {
  render() {
    return (
      <div className="loading-inidicator" >
        <Loader
          type="ThreeDots"
          color="#631033"
          height="120"
          width="120"
        /></div>
    );
  }
}