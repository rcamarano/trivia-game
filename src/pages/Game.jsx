import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import requestGameApi from './requestApi/requestApi';
import '../App.css';

class Game extends Component {
  state = {
    gameApi: [],
    responseApi: false,
    collorGreen: '',
    collorRed: '',
    mathRandom: [],
    isDisabled: false,
  };

  componentDidMount() {
    const timer = 30000;
    setTimeout(() => this.setState({ isDisabled: true }), timer);
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

  handleStyle = () => {
    this.setState({
      collorGreen: 'green-border',
      collorRed: 'red-border',
    });
  };

  render() {
    const { gameApi, responseApi, collorGreen, collorRed,
      mathRandom, isDisabled } = this.state;
    const question = gameApi[0];
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
                  { mathRandom.map((answer, i) => (
                    answer === question?.correct_answer
                      ? (
                        <button
                          className={ collorGreen }
                          type="button"
                          data-testid="correct-answer"
                          key={ i }
                          onClick={ this.handleStyle }
                          disabled={ isDisabled }
                        >
                          {(answer)}
                        </button>)
                      : (
                        <button
                          className={ collorRed }
                          type="button"
                          data-testid={ `wrong-answer-${i}` }
                          key={ i }
                          onClick={ this.handleStyle }
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Game;
