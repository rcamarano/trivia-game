import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { history, player } = this.props;
    console.log(player.assertions);
    const rightAswers = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        <div>
          {
            player.assertions >= rightAswers ? 'Well Done!' : 'Could be better...'
          }
        </div>
        <div data-testid="feedback-total-score">
          { player.score }
        </div>
        <div data-testid="feedback-total-question">
          { player.assertions }
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
