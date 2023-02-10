import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import requestGameApi from './requestApi/requestApi';

class Game extends Component {
  state = {
    gameApi: [],
    responseApi: false,
  };

  componentDidMount() {
    this.startingGame();
  }

  startingGame = async () => {
    const { history } = this.props;
    const codeError = 3;
    const token = localStorage.getItem('token');

    const apiData = await requestGameApi(token);

    if (apiData.response_code === codeError) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      gameApi: apiData.results,
      responseApi: true,
    });
  };

  render() {
    const { gameApi, responseApi } = this.state;
    const question = gameApi[0];
    const numbeRandom = 0.5;
    return (
      <div>
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
                  {[
                    question.correct_answer,
                    ...question.incorrect_answers,
                  ].sort(() => Math.random() - numbeRandom).map((answer, i) => (
                    answer === question.correct_answer
                      ? (
                        <button
                          type="button"
                          data-testid="correct-answer"
                          key={ i }
                        >
                          {(answer)}
                        </button>)
                      : (
                        <button
                          type="button"
                          data-testid={ `wrong-answer-${i}` }
                          key={ i }
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Game;
