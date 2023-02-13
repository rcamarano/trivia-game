import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>

        <h1 data-testid="ranking-title">
          Ranking
        </h1>
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

export default Ranking;
