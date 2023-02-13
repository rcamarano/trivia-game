import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    infoRaking: JSON.parse(localStorage.getItem('players')),
  };

  render() {
    const { infoRaking } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {infoRaking.map((player, index) => (
          <div key={ index }>
            <img src={ player.image } alt="gravatar" />
            <p data-testid={ `player-name-${index}` }>
              {player.userName}
            </p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          <h3>Play Again</h3>
        </button>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Ranking);
