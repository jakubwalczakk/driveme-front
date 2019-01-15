import React, { Component } from 'react';
import Timeline from 'react-time-line'
import './Calendar.css';

export default class Calendar extends Component {

  render() {

    var drivings = this.props.drivings;
    var exams = this.props.exams;

    var reservations = drivings.concat(exams);

    var initial = [];

    reservations.forEach(reservation => {
      let startDate = new Date(reservation.startDate);
      let finishDate = new Date(reservation.finishDate);

      let startTime = startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes();
      let finishTime = finishDate.getHours() + ':' + (finishDate.getMinutes() < 10 ? '0' : '') + finishDate.getMinutes();

      initial.push({ ts: startDate, text: `${reservation.eventType} [${startTime} - ${finishTime}]` })
    })

    initial = initial.sort(function (a, b) {
      return b.ts - a.ts;
    });

    if (initial.length !== 0) {
      return (
        <Timeline items={initial} />
      );
    } else {
      return <p id="calendar-lack-info">
        Brak danych do wyświetlenia!
      </p>
    }

  }
}