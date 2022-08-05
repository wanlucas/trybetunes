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
            { userImage
              ? <img src={ userImage } alt={ userName } className="profile-image" />
              : (<div className="default-user-image">{ userName[0] }</div>
              ) }
          </div>
        </div>

        <div>
          <nav className="nav-bar">
            <Link to="/search"><i className="fa-solid fa-magnifying-glass" /></Link>
            <Link to="/favorites"><i className="fa-solid fa-heart" /></Link>
            <Link to="/profile"><i className="fa-solid fa-user" /></Link>
          </nav>
        </div>
      </header>
    );
  }
}
