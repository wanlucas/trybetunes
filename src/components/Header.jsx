import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    userName: '',
    searchDisabled: true,
    isLoading: true,
  };

  rules = {
    minimunSearchLength: 2,
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const { name } = await getUser();

    this.setState({
      userName: name,
      isLoading: false,
    });
  }

  handleChange = ({ target: { value } }) => {
    const { minimunSearchLength } = this.rules;
    const searchValueIsInvalid = value.length < minimunSearchLength;

    this.setState({ searchDisabled: searchValueIsInvalid });
  }

  render() {
    const { userName, isLoading, searchDisabled } = this.state;

    return isLoading ? <div> Carregando... </div> : (
      <header data-testid="header-component">
        <div className="header-top">
          <h1>TrybeTunes</h1>
          <div className="user-perfil">
            <span data-testid="header-user-name">{userName}</span>
          </div>
        </div>

        <div>
          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>

          <form>
            <label htmlFor="search-bar">
              Nome do artista
              <input
                id="search-bar"
                type="text"
                data-testid="search-artist-input"
                onChange={ this.handleChange }
              />
            </label>

            <input
              type="submit"
              disabled={ searchDisabled }
              data-testid="search-artist-button"
              value="Buscar"
            />
          </form>
        </div>
      </header>
    );
  }
}
