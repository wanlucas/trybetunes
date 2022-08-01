import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
  };

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

  render() {
    const { userName, isLoading } = this.state;

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
        </div>
      </header>
    );
  }
}
