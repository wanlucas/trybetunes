import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './album.css';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Player from '../components/Player';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    actSong: '',
    songs: [],
    favorites: [],
    isLoading: true,
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    const favorites = await getFavoriteSongs();
    const { artistName, collectionName, artworkUrl100 } = songs[0];

    this.setState({
      artistName,
      collectionName,
      favorites,
      artworkUrl100,
      songs: songs.slice(1),
      isLoading: false,
    });
  }

  play = (song) => {
    this.setState({ actSong: song });
  }

  render() {
    const {
      songs,
      artistName,
      collectionName,
      isLoading,
      favorites,
      actSong,
      artworkUrl100,
    } = this.state;

    return (
      <div className="page-album">
        <Header />

        {isLoading ? <span>Carregando...</span> : (
          <div>
            <div className="album-artist-info">
              <img src={ artworkUrl100 } alt={ collectionName } />
              <div>
                <h2 data-testid="artist-name">{artistName}</h2>
                <p data-testid="album-name">{collectionName}</p>
              </div>
            </div>

            <ul className="music-list">
              {songs.map((song) => (
                <MusicCard
                  key={ song.trackName }
                  favorites={ favorites }
                  song={ song }
                  play={ this.play }
                />
              ))}
            </ul>

            <Player playlist={ songs } actSong={ actSong } />
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
