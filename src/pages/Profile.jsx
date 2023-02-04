import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import './profile.css';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    name: '-',
    image: '-',
    description: '-',
    email: '-',
  }

  componentDidMount = async () => {
    const user = await getUser();

    Object.entries(user).forEach(([key, value]) => {
      this.setState({ [key]: value || '-' });
    });
  }

  render() {
    const { name, image, description, email } = this.state;

    return (
      <div className="page-profile">
        <Header />

        <div className="user-profile">
          <div className="profile-header">
            <div>
              { image !== '-'
                && <img src={ image } alt={ name } className="profile-image" /> }
              <h2 className="profile-user_name">{name}</h2>
            </div>
            <Link to="profile/edit">Editar perfil</Link>
          </div>

          <div className="user-info">
            <div>
              <h3>E-mail</h3>
              <p>{ email }</p>
            </div>
            <div>
              <h3>Descrição</h3>
              <p>{ description }</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
