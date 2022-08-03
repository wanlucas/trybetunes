import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    songs: [],
    favorites: [],
    isLoading: true,
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    const favorites = await getFavoriteSongs();
    const { artistName, collectionName } = songs[0];

    this.setState({
      artistName,
      collectionName,
      favorites,
      songs: songs.slice(1),
      isLoading: false,
    });
  }

  render() {
    const {
      songs,
      artistName,
      collectionName,
      isLoading,
      favorites,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        {isLoading ? <span>Carregando...</span> : (
          <div>
            <h2 data-testid="artist-name">{artistName}</h2>
            <p data-testid="album-name">{collectionName}</p>

            <ul className="music-list">
              {songs.map((song) => (
                <MusicCard
                  key={ song.trackName }
                  favorites={ favorites }
                  song={ song }
                />
              ))}
            </ul>
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
