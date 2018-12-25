import React, { Component } from "react";
import { Table, Button, Modal, Badge, FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import { API_BASE_URL, CURRENT_USER_ROLE } from "constants/constants";
import { request } from "utils/APIUtils";
import "./Exams.css";

const studentId = 10;
const instructorId = 7;
const practicalExamUrl = API_BASE_URL + '/practical_exam/student/' + studentId;
const theoreticalExamUrl = API_BASE_URL + '/theoretical_exam/student/' + studentId;
const instructorPracticalExamsUrl = API_BASE_URL + '/practical_exam/instructor/' + instructorId;

export default class Exams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practicalExam: [],
      instructorPracticalExams: [],
      theoreticalExams: [],
      error: null,
      isLoading: false,
    }
    this.prepareTheContent = this.prepareTheContent.bind(this);
  }

  prepareTheContent() {
    var { practicalExam, theoreticalExams, instructorPracticalExams } = this.state;
    if (CURRENT_USER_ROLE === 'Instruktor') {
      return (<div id="examsTableContainer">
        <p id="examsLabel">Przeprowadzone egzaminy praktyczne</p>
        <Table id="practicalExamsTable" responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Data egzaminu</th>
              <th>Kursant</th>
              <th>Auto</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {instructorPracticalExams.map(exam => (
              <tr key={exam.id}>
                <td>{exam.dateOfExam}</td>
                <td>{exam.student.name}</td>
                <td>{exam.car.brand}</td>
                <td>
                  {exam.passed &&
                    <i id="examPassed" className="material-icons">check_circle</i>}
                  {!exam.passed &&
                    <i id="examFailed" className="material-icons">cancel</i>}
                  {exam.passed === null}{
                    <Button>
                      Oceń
                </Button>}
                </td>
                <td>{exam.scoredPoints}</td>
                <td>{Math.round(exam.result * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>);
    } else if (CURRENT_USER_ROLE === 'Kursant') {
      return (<div id="examsTableContainer">
        <p id="examsLabel">Egzaminy teoretyczne</p>
        <Table id="theoreticalExamsTable" responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Data egzaminu</th>
              <th>Status</th>
              <th>Zdobyte punkty</th>
              <th>Wynik</th>
            </tr>
          </thead>
          <tbody>
            {theoreticalExams.map(exam => (
              <tr key={exam.id}>
                <td>{exam.dateOfExam}</td>
                <td>
                  {exam.passed &&
                    <i id="examPassed" className="material-icons">check_circle</i>}
                  {!exam.passed &&
                    <i id="examFailed" className="material-icons">cancel</i>}
                </td>
                <td>{exam.scoredPoints}</td>
                <td>{Math.round(exam.result * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p id="practicalExamLabel">Egzamin praktyczny</p>
        <p>{practicalExam.dateOfExam} {practicalExam.passed}</p>
        {/* <p>{practicalExam.car}</p> */}
        {/* <p>{practicalExam.car.brand} {practicalExam.car.model} {practicalExam.car.licensePlate}</p> */}
        {/* <p>{practicalExam.instructor.name} {practicalExam.instructor.surname}</p> */}
      </div>);
    } else {
      return <p>Nie posiadasz dostępu do tego zasobu!</p>
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    if (CURRENT_USER_ROLE === 'Kursant') {

      request({
        url: practicalExamUrl,
        method: 'GET'
      }).then(data => this.setState({ practicalExam: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));

      request({
        url: theoreticalExamUrl,
        method: 'GET'
      }).then(data => this.setState({ theoreticalExams: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));

    } else if (CURRENT_USER_ROLE === 'Instruktor') {
      
      request({
        url: instructorPracticalExamsUrl,
        method: 'GET'
      }).then(data => this.setState({ instructorPracitcalExamsUrl: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  render() {

    var { error, isLoading } = this.state;

    if (error) {
      return <p id="examsErrorLabel">{error.message}</p>
    }

    if (isLoading) {
      return <p id="examsLoadingLabel">Pobieranie danych...</p>
    }

    let content = this.prepareTheContent();

    return (
      <div>
        {content}
      </div>
    );
  }
}