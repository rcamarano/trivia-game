import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateEmail, updateUsername } from '../redux/actions';

class Login extends React.Component {
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

  refresh = () => {
    const { history } = this.props;
    history.push('/Config');
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email, userName } = this.state;
    const tokenAPI = await this.fetchAPI();
    localStorage.setItem('token', tokenAPI);
    dispatch(updateEmail(email));
    dispatch(updateUsername(userName));
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
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.refresh }
          >
            Configurações
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

export default connect()(Login);
