import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbum from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    artist: '',
    searchDisabled: true,
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
    const album = await searchAlbum(artist);

    console.log(album);
  }

  render() {
    const { searchDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.searchArtist }>
          <label htmlFor="search-bar">
            Nome do artista
            <input
              id="search-bar"
              type="text"
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
      </div>
    );
  }
}
