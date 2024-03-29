import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './profileEdit.css';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    image: '',
    description: '',
    email: '',
    isLoading: false,
    saveButonDisabled: true,
  }

  componentDidMount = async () => {
    const user = await getUser();

    this.setState({ isLoading: false });

    Object.entries(user).forEach(([key, value]) => {
      this.setState({ [key]: value });
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validSaveButton(this.state));
  }

  validSaveButton = (state) => {
    const values = Object.values(state).filter((value) => typeof value === 'string');
    const isEmail = /\S+@\S+\.\S+/;

    this.setState({
      saveButonDisabled: values.some((value) => !value.length)
      || !isEmail.test(state.email),
    });
  }

  save = async () => {
    const { name, description, email, image } = this.state;
    const { history } = this.props;

    await updateUser({ name, description, email, image });
    history.push('/profile');
  }

  render() {
    const { name, image, description, email, saveButonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />

        <form className="user_profile-edit">
          <div className="user_form-header">
            { image && <img src={ image } alt={ name } /> }
            <br />
            <input
              type="text"
              name="image"
              value={ image }
              placeholder="imagem"
              onChange={ this.handleChange }
              data-testid="edit-input-image"
            />
          </div>

          <div className="user_form-info">
            <label htmlFor="user-name">
              <br />
              <input
                type="text"
                id="user-name"
                placeholder="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="edit-input-name"
              />
            </label>

            <label htmlFor="user-email">
              <br />
              <input
                id="user-email"
                type="email"
                placeholder="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="edit-input-email"
              />
            </label>

            <label htmlFor="user-description">
              <br />
              <textarea
                id="user-description"
                name="description"
                cols="30"
                rows="10"
                placeholder="Description"
                value={ description }
                onChange={ this.handleChange }
                data-testid="edit-input-description"
              />
            </label>

            <button
              type="button"
              id="edit-button-save"
              onClick={ this.save }
              disabled={ saveButonDisabled }
            >
              Savar alterações
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;
