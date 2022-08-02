import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
  }

  handleChange = async ({ target: { checked } }) => {
    const { song } = this.props;

    this.setState({
      isLoading: true,
      checked,
    });

    if (checked) await addSong(song);
    else await removeSong(song);

    this.setState({ isLoading: false });
  }

  render() {
    const { checked, isLoading } = this.state;
    const { song } = this.props;
    const { collectionName, trackName, artworkUrl100, previewUrl, trackId } = song;

    return isLoading ? <span>Carregando...</span> : (
      <li className="music_card">
        <div className="music_card-left">
          <input
            type="button"
            value="Play"
          />
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h3>{ trackName }</h3>
        </div>

        <div className="music_card-right">
          <input
            type="checkbox"
            className="favorite-icon"
            value="Favorite"
            checked={ checked }
            onChange={ this.handleChange }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </div>

        <Player src={ previewUrl } />
      </li>
    );
  }
}

MusicCard.propTypes = {
  play: PropTypes.func,
  song: PropTypes.object,
}.isRequired;
