import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
      </div>
    );
  }
}
