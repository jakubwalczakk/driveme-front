import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = BigCalendar.momentLocalizer(moment)

const myEvents = [];

export default class MyCalendar extends Component {

  render() {
    return (
      <div>
        <BigCalendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
        />
      </div>);
  }
} 