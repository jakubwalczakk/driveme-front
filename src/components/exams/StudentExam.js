import React, { Component } from "react";

export default class StudentExam extends Component {
  render() {
    var exam = this.props.exam;
    return (
      <tr key={exam.id}>
        <td>{exam.startDate}</td>
        <td>{exam.car.brand} - {exam.car.model}</td>
        <td>{exam.car.gasType}</td>
        <td>{exam.instructor.name} {exam.instructor.surname}</td>
        <td>
          {exam.passed &&
            <i id="examPassed" className="material-icons">check_circle</i>}
          {!exam.passed &&
            <i id="examFailed" className="material-icons">cancel</i>}
        </td>
      </tr>
    )
  }
}