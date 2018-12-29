import React, { Component } from "react";

export default class TheoreticalExam extends Component {
  render() {
    return (
      <tr key={this.props.exam.id}>
        <td>{this.props.exam.startDate}</td>
        <td>
          {this.props.exam.passed &&
            <i id="examPassed" className="material-icons">check_circle</i>}
          {!this.props.exam.passed &&
            <i id="examFailed" className="material-icons">cancel</i>}
        </td>
        <td>{this.props.exam.scoredPoints}</td>
        <td>{Math.round(this.props.exam.result * 100)}%</td>
      </tr>
    )
  }
}