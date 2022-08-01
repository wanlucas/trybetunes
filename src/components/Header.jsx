import React, { Component } from 'react';
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
        <span data-testid="header-user-name">{userName}</span>
      </header>
    );
  }
}
