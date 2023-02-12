import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import requestGameApi from './requestApi/requestApi';
import '../App.css';
import { updateScore } from '../redux/actions';

class Game extends Component {
  state = {
    responseApi: false,
    collorGreen: '',
    collorRed: '',
    isDisabled: false,
    // score: 0,
    gameDifficulty: 0,
    timeLeft: 30,
    buttonClicked: false,
    questionIndex: 0,
    question: [],

  };

  componentDidMount() {
    this.startTimer();
    this.startingGame();
  }

  startTimer = () => {
    const thousand = 1000;
    this.interval = setInterval(() => {
      const { timeLeft } = this.state;
      if (timeLeft > 0) {
        this.setState((prevState) => ({
          timeLeft: prevState.timeLeft - 1,
        }));
      } else {
        clearInterval(this.interval);
      }
    }, thousand);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  startingGame = async () => {
    const { history } = this.props;
    const codeError = 3;
    const token = localStorage.getItem('token');
    const apiData = await requestGameApi(token);

    const results = apiData.results.map((result) => {
      const answers = this.randomQuestions(
        result.correct_answer,
        result.incorrect_answers,
      );
      return { ...result, answers };
    });

    if (apiData.response_code === codeError) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }
    this.setState({
      responseApi: true,
      question: results,
    });
  };

  randomQuestions = (correct, incorrect) => {
    const arrayQuestions = [correct, ...incorrect];
    const randomNumber = 0.5;
    const mathRandom = arrayQuestions.sort(() => Math.random() - randomNumber);
    return mathRandom;
  };

  compareDifficulty = async (difficulty) => {
    if (difficulty === 'hard') {
      await this.setState({
        gameDifficulty: 3,
      });
    }
    if (difficulty === 'medium') {
      await this.setState({
        gameDifficulty: 2,
      });
    }
    if (difficulty === 'easy') {
      await this.setState({
        gameDifficulty: 1,
      });
    }
  };

  handleStyle = async ({ id }, difficulty) => {
    const { dispatch } = this.props;
    const { timeLeft } = this.state;
    await this.compareDifficulty(difficulty);
    this.stopTimer();

    this.setState({
      collorGreen: 'green-border',
      collorRed: 'red-border',
      buttonClicked: true,
    });

    const correctAnswer = 10;
    const wrongAnswer = 0;
    const { gameDifficulty } = this.state;

    if (id === 'correct') {
      const totalValue = correctAnswer + (timeLeft * gameDifficulty);
      console.log(timeLeft);
      console.log(gameDifficulty);
      return dispatch(updateScore(totalValue));
    } if (id === 'wrong') {
      const totalValue = wrongAnswer;
      return dispatch(updateScore(totalValue));
    }
  };

  handleNext = () => {
    const { questionIndex } = this.state;
    const Numberfive = 5;
    this.setState({
      collorGreen: '',
      collorRed: '',
      timeLeft: 30,
    });
    this.startTimer();
    if (questionIndex === Numberfive - 1) {
      const { history } = this.props;
      history.push('/Feedback');
    } else if (questionIndex < Numberfive) {
      this.setState({
        questionIndex: questionIndex + 1,
      });
    }
  };

  render() {
    const { question, responseApi, collorGreen, collorRed,
      isDisabled, timeLeft, buttonClicked, questionIndex } = this.state;
    if (timeLeft === 0) {
      this.setState({
        isDisabled: true,
      });
    }

    return (
      <div>
        {timeLeft}
        <Header />
        { responseApi
            && (
              <div>
                <h1 data-testid="question-category">
                  {question[questionIndex].category}
                </h1>
                <h2 data-testid="question-text">
                  {question[questionIndex].question}
                </h2>
                <div data-testid="answer-options">
                  { question[questionIndex].answers.map((answer, i) => (
                    answer === question[questionIndex].correct_answer
                      ? (
                        <button
                          className={ collorGreen }
                          id="correct"
                          type="button"
                          data-testid="correct-answer"
                          key={ i }
                          onClick={
                            ({ target }) => this.handleStyle(target, question.difficulty)
                          }
                          disabled={ isDisabled }
                        >
                          {(answer)}
                        </button>)
                      : (
                        <button
                          className={ collorRed }
                          id="wrong"
                          type="button"
                          data-testid={ `wrong-answer-${i}` }
                          key={ i }
                          onClick={
                            ({ target }) => this.handleStyle(target, question.difficulty)
                          }
                          disabled={ isDisabled }
                        >
                          {(answer)}
                        </button>)
                  ))}
                </div>
                { buttonClicked
                && (
                  <button
                    data-testid="btn-next"
                    onClick={ this.handleNext }
                  >
                    Next
                  </button>
                )}
              </div>)}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
