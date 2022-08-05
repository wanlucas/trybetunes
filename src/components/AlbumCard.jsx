import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './albumCard.css';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    const { collectionName, artworkUrl100, artistName, collectionId } = album;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="music-card"
      >

        <img className="artist-image" src={ artworkUrl100 } alt={ collectionName } />
        <div className="artist-info">
          <h2>{ collectionName }</h2>
          <p>{ artistName }</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.object,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  artistName: PropTypes.string,
}.isRequired;
