import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { player } = this.props;
    const players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(player);
    players.sort((a, b) => b.score - a.score);
    localStorage.setItem('players', JSON.stringify(players));
  }

  render() {
    const { history, correct } = this.props;
    const rightAswers = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        <div>
          {
            correct >= rightAswers ? 'Well Done!' : 'Could be better...'
          }
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          <h3>Play Again</h3>
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/Ranking') }
        >
          <h3>Ranking</h3>
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  correct: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  correct: state.player.correct,
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
