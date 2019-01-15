import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";
import { request } from "utils/APIUtils";
import { API_BASE_URL, USER_ROLES } from "constants/constants";
import LoadingIndicator from "../../common/LoadingIndicator";
import ServerError from '../../common/ServerError';
import AccessDenied from "../../common/AccessDenied";
import PracticalExam from './PracticalExam';
import StudentExam from './StudentExam';
import "./Exams.css";

const practicalExamUrl = API_BASE_URL + '/practical_exam/student';
const instructorPracticalExamsUrl = API_BASE_URL + '/practical_exam/instructor';

class Exams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practicalExam: null,
      instructorPracticalExams: [],
      error: null,
      isLoading: false,
    }
    this.prepareTheContent = this.prepareTheContent.bind(this);
  }

  prepareTheContent() {
    var { practicalExam, instructorPracticalExams } = this.state;
    var currentUserRole = this.props.currentUserRole;

    if (currentUserRole === USER_ROLES.Instructor) {

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
    } else if (currentUserRole === USER_ROLES.Student) {



      if (practicalExam !== null && practicalExam !== undefined) {
        const studentExam = <StudentExam key={practicalExam.id} exam={practicalExam} />
        return (<div id="examsTableContainer">
          <p id="practicalExamLabel">Egzamin praktyczny</p>
          <Table id="practicalExamsTable" responsive striped bordered condensed hover>
            <thead>
              <tr>
                <th>Data egzaminu</th>
                <th>Samochód</th>
                <th>Typ silnika</th>
                <th>Instruktor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentExam}
            </tbody>
          </Table>
        </div>);
      } else {
        return (
          <div id="examsTableContainer">
            <p id="practicalExamLabel">
              Twój egzamin praktyczny jeszcze się nie odbył.
              <br />
              W celu ustalenia daty egzaminu zgłoś się do biura akademii.
            </p>
          </div>);
      }
    } else {
      return <AccessDenied />
    }
  }

  componentDidMount() {

    if (this.props.isAuthenticated) {

      this.setState({ isLoading: true });

      var currentUserRole = this.props.currentUserRole;

      if (currentUserRole === USER_ROLES.Student) {

        request(
          'GET',
          practicalExamUrl
        ).then(data => this.setState({ practicalExam: data, isLoading: false }))
          .catch(error => this.setState({ error, isLoading: false }));

      } else if (currentUserRole === USER_ROLES.Instructor) {

        request(
          'GET',
          instructorPracticalExamsUrl,
        ).then(data => this.setState({ instructorPracitcalExamsUrl: data, isLoading: false }))
          .catch(error => this.setState({ error, isLoading: false }));
      }
    }
  }

  render() {

    var { error, isLoading } = this.state;

    if (error) {
      return <ServerError />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    let content = this.prepareTheContent();

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default withRouter(Exams);