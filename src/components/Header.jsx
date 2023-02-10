import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
            alt=""
          />
          <span
            data-testid="header-player-name"
          >
            Nome do jogador:
            {' '}
            {userName}
          </span>
          <span
            data-testid="header-score"
          >
            Placar: 0
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.userName,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.any,
}.isRequired;
