import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    userName: '',
    userImage: '',
    isLoading: true,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const { name, image } = await getUser();

    this.setState({
      userName: name,
      userImage: image,
      isLoading: false,
    });
  }

  render() {
    const { userName, isLoading, userImage } = this.state;

    return isLoading ? <div> Carregando... </div> : (
      <header className="header-component">
        <div className="header-top">
          <h1>TrybeTunes</h1>
          <div className="user-perfil">
            <span className="header-user-name">{userName}</span>
            { userImage ? <img src={ userImage } alt={ userName } /> : (
              <div className="default-user-image">{ userName[0] }</div>
            ) }
          </div>
        </div>

        <div>
          <nav className="nav-bar">
            <Link to="/search">Pesquisar</Link>
            <Link to="/favorites">Favoritas</Link>
            <Link to="/profile">Perfil</Link>
          </nav>
        </div>
      </header>
    );
  }
}
