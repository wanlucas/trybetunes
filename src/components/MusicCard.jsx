import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

export default class MusicCard extends Component {
  render() {
    const { song } = this.props;
    const { collectionName, trackName, artworkUrl100, previewUrl } = song;

    return (
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
          <button type="button" className="favorite-icon"> Favorite </button>
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
