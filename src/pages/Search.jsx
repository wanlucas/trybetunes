import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbum from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import './search.css';

export default class Search extends Component {
  state = {
    artist: '',
    albums: [],
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ artist: value });
  }

  searchArtist = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    const albums = await searchAlbum(artist);

    this.setState({ albums, artist: '' });
  }

  render() {
    const { albums, artist } = this.state;

    return (
      <div className="page-search">
        <Header />
        <form className="search-artist" onSubmit={ this.searchArtist }>
          <label htmlFor="search-bar">
            <input
              id="search-bar"
              type="text"
              placeholder="Buscar artista ou album"
              value={ artist }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
        </form>

        <div>
          <div className="albums-list">
            {albums.map((album) => (
              <AlbumCard key={ album.collectionId } album={ album } />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
