import React, { Component } from "react";
import { Table, Button, Modal, Badge, FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import "./Exams.css";

const studentId = 10;
const practicalExamUrl = API_BASE_URL + '/practical_exam/student/' + studentId;
const theoreticalExamUrl = API_BASE_URL + '/theoretical_exam/student/' + studentId;

export default class Exams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practicalExam: [],
      theoreticalExams: [],
      error: null,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(practicalExamUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania egzaminu praktycznego...');
        }
      })
      .then(data => this.setState({ practicalExam: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    fetch(theoreticalExamUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Coś poszło nie tak podczas pobierania listy egzaminów teoretycznych...');
        }
      })
      .then(data => this.setState({ theoreticalExams: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }


  render() {

    var { practicalExam, theoreticalExams, isLoading, error } = this.state;

    if (error) {
      return <p id="examsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="examsLoadingLabel">Loading...</p>
    }

    var passed = true;

    return (
      <div id="examsTableContainer">
        <p id="theoreticalExamsLabel">Egzaminy teoretyczne</p>
        <Table id="theoreticalExamsTable" responsive striped bordered condensed hover>
          <thead>
            <th>Data egzaminu</th>
            <th></th>
            <th>Zdobyte punkty</th>
            <th>Wynik</th>
          </thead>
          <tbody>
            {theoreticalExams.map(exam => (
              <tr key={exam.id}>
                <td>{exam.dateOfExam}</td>
                <td>
                  {passed &&
                    <i id="examPassed" class="material-icons">check_circle</i>}
                  {!passed &&
                    <i id="examFailed" class="material-icons">cancel</i>}
                </td>
                <td>{exam.scoredPoints}</td>
                <td>{exam.result}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p id="practicalExamLabel">Egzamin praktyczny</p>
        <p>{practicalExam.dateOfExam} {practicalExam.passed}</p>
        {/* <p>{practicalExam.car.brand} {practicalExam.car.model} {practicalExam.car.licensePlate}</p> */}
        {/* <p>{practicalExam.instructor.name} {practicalExam.instructor.surname}</p> */}
      </div>
    );
  }
}