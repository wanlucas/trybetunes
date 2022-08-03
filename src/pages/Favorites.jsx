import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favorites: [],
    isLoading: true,
  };

  componentDidMount = () => this.getFavoriteSongs();

  getFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const favorites = await getFavoriteSongs();

    this.setState({
      favorites,
      isLoading: false,
    });
  }

  render() {
    const { favorites, isLoading } = this.state;

    return isLoading ? <span>Carregando...</span> : (
      <div data-testid="page-favorites">
        <Header />

        <div className="favorite_songs">
          <ul className="favorite-list">
            {favorites.map((song) => (
              <MusicCard
                key={ song.trackName }
                favorites={ favorites }
                song={ song }
                updateFavorites={ this.getFavoriteSongs }
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
