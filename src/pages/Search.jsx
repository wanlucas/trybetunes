import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbum from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

export default class Search extends Component {
  state = {
    artist: '',
    artistName: '',
    searchDisabled: true,
    albums: [],
  }

  rules = {
    minimunSearchLength: 2,
  }

  handleChange = ({ target: { value } }) => {
    const { minimunSearchLength } = this.rules;
    const searchValueIsInvalid = value.length < minimunSearchLength;

    this.setState({
      searchDisabled: searchValueIsInvalid,
      artist: value,
    });
  }

  searchArtist = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    const albums = await searchAlbum(artist);

    this.setState({ albums, artist: '', artistName: artist });
  }

  render() {
    const { searchDisabled, albums, artist, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.searchArtist }>
          <label htmlFor="search-bar">
            Nome do artista
            <input
              id="search-bar"
              type="text"
              value={ artist }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>

          <input
            type="submit"
            disabled={ searchDisabled }
            data-testid="search-artist-button"
            value="Buscar"
          />
        </form>

        <div>
          <span>{`Resultado de álbuns de: ${artistName}`}</span>

          <div className="albums-list">
            {!albums.length && <span> Nenhum álbum foi encontrado </span>}

            {albums.map((album) => (
              <AlbumCard key={ album.collectionId } album={ album } />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
