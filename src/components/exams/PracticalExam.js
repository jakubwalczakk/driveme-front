import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Exams.css";

export default class PracticalExam extends Component {
  render() {
    var exam = this.props.exam;
    return (
      <tr key={exam.id}>
        <td>{exam.startDate}</td>
        <td>{exam.student.name}</td>
        <td>{exam.car.brand}</td>
        <td>
          {exam.passed &&
            <i id="examPassed" className="material-icons">check_circle</i>}
          {exam.passed &&
            <i id="examFailed" className="material-icons">cancel</i>}
          {exam.passed === null}{
            <Button>
              Oceń
          </Button>}
        </td>
        <td>{exam.scoredPoints}</td>
        <td>{Math.round(exam.result * 100)}%</td>
      </tr>
    )
  }
}