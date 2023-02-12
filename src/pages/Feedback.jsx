import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { correct } = this.props;
    const rightAswers = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        <div>
          {
            correct >= rightAswers ? 'Well Done!' : 'Could be better...'
          }
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  correct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  correct: state.player.correct,
});

export default connect(mapStateToProps)(Feedback);
