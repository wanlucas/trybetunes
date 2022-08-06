import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import './login.css';

export default class Login extends Component {
  state = {
    loginDisabled: true,
    isLoading: false,
    name: '',
  };

  rules = {
    minNameLength: 3,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.handleButton());
  };

  handleButton = () => {
    const { minNameLength } = this.rules;

    this.setState(({ name }) => {
      const someValueIsInvalid = name.length < minNameLength;

      return { loginDisabled: someValueIsInvalid };
    });
  }

  saveUser = (event) => {
    const { name } = this.state;

    event.preventDefault();
    this.setState({ isLoading: true });
    createUser({ name }).then(() => this.login());
  };

  login = () => {
    const { history } = this.props;

    history.push('/search');
  }

  render() {
    const { loginDisabled, isLoading } = this.state;

    return isLoading ? <span><i className="fa-solid fa-spinner spining" /></span> : (
      <div className="page-login">
        <form className="form-login">
          <input
            type="text"
            onChange={ this.handleChange }
            name="name"
            placeholder="Name"
            data-testid="login-name-input"
          />

          <input
            type="password"
            name="password"
            onChange={ this.handleChange }
            placeholder="Password"
          />

          <input
            type="submit"
            value="Entrar"
            disabled={ loginDisabled }
            onClick={ this.saveUser }
            className="login-submit-button"
          />
        </form>

        <div className="login-image">
          <img src="https://i.pinimg.com/originals/83/6e/84/836e84586da179931d04e8aafa0a672f.jpg" alt="music-logo" />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string,
}.isRequired;
