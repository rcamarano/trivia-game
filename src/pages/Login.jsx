import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    email: '',
    userName: '',
    isValid: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validationLogin());
  };

  validationLogin = () => {
    const maxLengthPass = 6;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, userName } = this.state;
    const validation = !(emailRegex.test(email) && userName.length >= maxLengthPass);

    this.setState({
      isValid: validation,
    });
  };

  fetchAPI = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  };

  handleClick = async (e) => {
    e.preventDefault();
    const tokenAPI = await this.fetchAPI();
    const { history } = this.props;
    localStorage.setItem('token', tokenAPI);
    console.log();
    history.push('/Game');
  };

  render() {
    const { isValid } = this.state;
    return (

      <div>
        <form>
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            id=""
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-player-name"
            type="text"
            name="userName"
            id=""
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ isValid }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
