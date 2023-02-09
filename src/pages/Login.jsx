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
            // onClick={}
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
