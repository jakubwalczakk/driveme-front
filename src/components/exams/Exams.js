import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { API_BASE_URL, CURRENT_USER_ROLE } from "constants/constants";
import { request } from "utils/APIUtils";
import PracticalExam from './PracticalExam';
import TheoreticalExam from './TheoreticalExam';
import "./Exams.css";

const practicalExamUrl = API_BASE_URL + '/practical_exam/student';
const theoreticalExamUrl = API_BASE_URL + '/theoretical_exam/student';
const instructorPracticalExamsUrl = API_BASE_URL + '/practical_exam/instructor';

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

      const instructorExams = instructorPracticalExams.map(exam =>
        <PracticalExam key={exam.id} exam={exam} />)

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
            {instructorExams}
          </tbody>
        </Table>
      </div>);
    } else if (CURRENT_USER_ROLE === 'Kursant') {

      const studentExams = theoreticalExams.map(exam =>
        <TheoreticalExam key={exam.id} exam={exam} />)

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
            {studentExams}
          </tbody>
        </Table>
        {/* TODO */}
        <p id="practicalExamLabel">Egzamin praktyczny</p>
        {/* TODO */}
        <p>{practicalExam.id}</p>
        <p>{practicalExam.startDate}</p>
        <p>{practicalExam.duration}</p>
        <p>{practicalExam.finishDate}</p>
      </div>);
    } else {
      return <div id="examsTableContainer">
        <p>Nie posiadasz dostępu do tego zasobu!</p>
      </div>
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