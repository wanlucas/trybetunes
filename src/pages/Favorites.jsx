import React, { Component } from 'react';
import Header from '../components/Header';
import './favorites.css';
import MusicCard from '../components/MusicCard';
import Player from '../components/Player';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favorites: [],
    isLoading: true,
    actSong: '',
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

  play = (song) => {
    this.setState({ actSong: song });
  }

  render() {
    const { favorites, isLoading, actSong } = this.state;

    return isLoading ? <span><i className="fa-solid fa-spinner spining" /></span> : (
      <div data-testid="page-favorites">
        <Header />

        <div className="favorite_songs">
          <h2> Suas musicas preferidas </h2>

          <ul className="favorite-list">
            {favorites.map((song) => (
              <MusicCard
                key={ song.trackName }
                favorites={ favorites }
                play={ this.play }
                song={ song }
                updateFavorites={ this.getFavoriteSongs }
              />
            ))}
          </ul>
        </div>

        <Player playlist={ favorites } actSong={ actSong } />
      </div>
    );
  }
}
