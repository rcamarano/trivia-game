import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import requestGameApi from './requestApi/requestApi';
import '../App.css';
import { updateScore } from '../redux/actions';

class Game extends Component {
  state = {
    gameApi: [],
    responseApi: false,
    collorGreen: '',
    collorRed: '',
    mathRandom: [],
    isDisabled: false,
    // score: 0,
    gameDifficulty: 0,
    timeLeft: 30,
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
        console.log('Entrou.');
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

    if (apiData.response_code === codeError) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }
    const numbeRandom = 0.5;

    this.setState({
      gameApi: apiData.results,
      responseApi: true,
      mathRandom: [
        apiData.results[0].correct_answer,
        ...apiData.results[0].incorrect_answers,
      ].sort(() => Math.random() - numbeRandom),
    });
  };

  compareDifficulty = async (difficulty) => {
    if (difficulty === 'hard') {
      await this.setState({
        gameDifficulty: 3,
      });
    } else if (difficulty === 'medium') {
      await this.setState({
        gameDifficulty: 2,
      });
    } else if (difficulty === 'easy') {
      await this.setState({
        gameDifficulty: 1,
      });
    }
  };

  handleStyle = async ({ id }, difficulty) => {
    const { dispatch } = this.props;
    const { timeLeft } = this.state;
    console.log(id);
    this.setState({
      collorGreen: 'green-border',
      collorRed: 'red-border',
    });
    await this.compareDifficulty(difficulty);
    this.stopTimer();

    const correctAnswer = 10;
    const wrongAnswer = 0;

    const { gameDifficulty } = this.state;

    if (id === 'correct') {
      const totalValue = correctAnswer + (timeLeft * gameDifficulty);
      return dispatch(updateScore(totalValue));
    } if (id === 'wrong') {
      const totalValue = wrongAnswer;
      return dispatch(updateScore(totalValue));
    }
  };

  render() {
    const { gameApi, responseApi, collorGreen, collorRed,
      mathRandom, isDisabled, timeLeft } = this.state;
    const question = gameApi[0];

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
                  {question.category}
                </h1>
                <h2 data-testid="question-text">
                  {question.question}
                </h2>
                <div data-testid="answer-options">
                  { mathRandom.map((answer, i) => (
                    answer === question?.correct_answer
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
