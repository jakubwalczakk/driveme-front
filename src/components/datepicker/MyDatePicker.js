import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class MyDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleSelect(date){
    console.log(date);
  }

  render() {
    return (
      <DatePicker placeholderText="Click to select a date"
        selected={this.state.startDate}
        onChange={this.handleChange}
        onSelect={this.handleSelect} 
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd/MM/yyyy hh:mm"
        isClearable={true}
        todayButton={"Dzisiaj"}      />
    );
  }
}