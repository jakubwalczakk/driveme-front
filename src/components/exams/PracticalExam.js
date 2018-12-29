import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Exams.css";

export default class PracticalExam extends Component {
  render() {
    return (
      <tr key={this.props.exam.id}>
        <td>{this.props.exam.startDate}</td>
        <td>{this.props.exam.student.name}</td>
        <td>{this.props.exam.car.brand}</td>
        <td>
          {this.props.exam.passed &&
            <i id="examPassed" className="material-icons">check_circle</i>}
          {this.props.exam.passed &&
            <i id="examFailed" className="material-icons">cancel</i>}
          {this.props.passed === null}{
            <Button>
              Oceń
          </Button>}
        </td>
        <td>{this.props.scoredPoints}</td>
        <td>{Math.round(this.props.exam.result * 100)}%</td>
      </tr>
    )
  }
}