import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from "constants/constants";
import { request } from "utils/APIUtils";
import "./Exams.css";


const rateExamUrl = API_BASE_URL + '/practical_exam/rate';

export default class PracticalExam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      showRateModal: false,
      examPassed: false
    }
    this.prepareRateModal = this.prepareRateModal.bind(this);
    this.handleCloseRateModal = this.handleCloseRateModal.bind(this);
    this.handleShowRateModal = this.handleShowRateModal.bind(this);
    this.handleRated = this.handleRated.bind(this);
    this.handleExamFailed = this.handleExamFailed.bind(this);
    this.handleExamPassed = this.handleExamPassed.bind(this);
  }

  prepareRateModal() {

    var { showRateModal } = this.state;

    return (
      <Modal show={showRateModal} onHide={this.handleCloseRateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Wynik egzaminu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Oceń rezultat egzaminu!
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleExamFailed}>Niezdany</Button>
          <Button onClick={this.handleExamPassed}>Zdany</Button>
        </Modal.Footer>
      </Modal >
    );
  }

  handleCloseRateModal() {
    this.setState({ showRateModal: false });
  }

  handleShowRateModal() {
    this.setState({ showRateModal: true });
  }

  handleExamFailed() {
    this.setState({ examPassed: false });
    this.handleRated();
  }

  handleExamPassed() {
    this.setState({ examPassed: true });
    this.handleRated();
  }

  handleRated() {

    var { examPassed } = this.state;

    const examId = this.props.exam.id;
    const rateRequest = {
      examId: examId,
      passed: examPassed
    }

    request(
      'PUT',
      rateExamUrl,
      rateRequest
    ).then(data => this.setState({ isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    this.handleCloseRateModal();
  }

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