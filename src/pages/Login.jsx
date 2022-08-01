import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    loginDisabled: true,
    isLoading: false,
    name: '',
    password: '',
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

    return (
      isLoading ? (
        <div> Carregando... </div>
      ) : (
        <div data-testid="page-login">
          <form>
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
              data-testid="login-submit-button"
            />
          </form>
        </div>
      )
    );
  }
}

Login.propTypes = {
  history: PropTypes.string,
}.isRequired;
