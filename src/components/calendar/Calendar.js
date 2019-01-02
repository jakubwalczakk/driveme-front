import React, { Component } from 'react';
import AvailableTimes from 'react-available-times';
import Timeline from 'react-time-line'

export default class Calendar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  loadMoreEvents(calendarId, start, end) {
    console.log('Loading more events...')
  }

  getInitialEvents() {
    var initialEvents = this.props.events;

    this.setState({
      events: initialEvents
    })
    this.forceUpdate();
  }

  render() {

    var reservations = this.props.reservations;
    var drivings = this.props.drivings;
    var exams = this.props.exams;

    var selections = reservations.concat(drivings).concat(exams);

    var initial = [];

    selections.forEach(selection => {
      let startDate = new Date(selection.startDate);
      let finishDate = new Date(selection.finishDate);

      let startTime = startDate.getHours() + ':' + startDate.getMinutes();
      let finishTime = finishDate.getHours() + ':' + finishDate.getMinutes();

      initial.push({ ts: startDate, text: `${selection.eventType} [${startTime} - ${finishTime}]` })
    })

    initial = initial.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return b.ts - a.ts;
    });

    return (
      <Timeline items={initial} />

      // <AvailableTimes
      //   weekStartsOn="monday"
      //   onChange={(selections) => {
      //     selections.forEach(({ start, end }) => {
      //       console.log('Start:', start, 'End:', end);
      //     })
      //   }}
      //   onEventsRequested={({ calendarId, start, end, callback }) => {
      //     this.loadMoreEvents(calendarId, start, end).then(callback);
      //   }}
      //   initialSelections={
      //     // [{ start: new Date('2019-01-03 11:11'), end: new Date('2019-01-03 14:22') }]}
      //     [initial]}
      //   height={400}
      //   recurring={false}
      //   availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']}
      //   availableHourRange={{ start: 8, end: 22 }}
      // />
    );
  }
}