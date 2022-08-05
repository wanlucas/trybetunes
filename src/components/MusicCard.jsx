import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './musicCard.css';
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
    const { checked } = this.state;
    const { song, play } = this.props;
    const { collectionName, trackName, artworkUrl100, trackId } = song;

    return (
      <li className="music_card">
        <div className="music_card-left">
          <button
            type="button"
            onClick={ () => play(song) }
          >
            <i className="fa-solid fa-play" />
          </button>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h3>{ trackName }</h3>
        </div>

        <div className="music_card-right">
          <label htmlFor={ `toggle_${trackId}-favorite` }>
            { checked
              ? <i className="fa-solid fa-heart favorite" />
              : <i className="fa-regular fa-heart" />}

            <input
              id={ `toggle_${trackId}-favorite` }
              className="toggle_favorite-input"
              type="checkbox"
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
