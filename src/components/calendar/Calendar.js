import React, { Component } from 'react';
import AvailableTimes from 'react-available-times';

export default class Calendar extends Component {


  loadMoreEvents(calendarId, start, end) {
    console.log('Loading more events...')
  }


  render() {
    var drivings = this.props.drivings;
    var reservations = this.props.reservations;
    var exams = this.props.exams;
    var selections = drivings.concat(reservations).concat(exams);

    console.log(selections)

    var initial = [];

    selections.forEach(selection => {
      // var startTime = selection.startDate;
      // console.log(startTime)
      // var endTime = selection.finishDate;
      // console.log(endTime)
      // console.log("Selections",selection)
      initial.push({ start: new Date(selection.startDate), end: new Date(selection.finishDate) });
    });

    console.log(initial)

    return (

      <AvailableTimes
        weekStartsOn="monday"
        onChange={(selections) => {
          selections.forEach(({ start, end }) => {
            console.log('Start:', start, 'End:', end);
          })
        }}
        onEventsRequested={({ calendarId, start, end, callback }) => {
          this.loadMoreEvents(calendarId, start, end).then(callback);
        }}
        initialSelections={
          // [{ start: new Date('2019-01-03 11:11'), end: new Date('2019-01-03 14:22') }]}
          initial}
        height={400}
        recurring={false}
        availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']}
        availableHourRange={{ start: 8, end: 22 }}
      />


    );
  }
}