import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
  }

  componentDidMount() {
    const { favorites, song: { trackId } } = this.props;

    this.setState({
      checked: favorites.some((song) => song.trackId === trackId),
    });
  }

  handleChange = async ({ target: { checked } }) => {
    const { song, updateFavorites } = this.props;

    this.setState({
      isLoading: true,
      checked,
    });

    if (checked) await addSong(song);
    else await removeSong(song);

    this.setState({ isLoading: false });
    if (updateFavorites) updateFavorites();
  }

  render() {
    const { checked, isLoading } = this.state;
    const { song, play } = this.props;
    const { collectionName, trackName, artworkUrl100, trackId } = song;

    return isLoading ? <span>Carregando...</span> : (
      <li className="music_card">
        <div className="music_card-left">
          <input
            type="button"
            value="Play"
            onClick={ () => play(song) }
          />
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h3>{ trackName }</h3>
        </div>

        <div className="music_card-right">
          <label htmlFor="toggle-favorite">
            Favorita
            <input
              id="toggle-favorite"
              type="checkbox"
              className="favorite-icon"
              value="Favorite"
              checked={ checked }
              onChange={ this.handleChange }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      </li>
    );
  }
}

MusicCard.propTypes = {
  play: PropTypes.func,
  song: PropTypes.object,
}.isRequired;
