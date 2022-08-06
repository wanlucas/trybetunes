import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, isFavorite } from '../services/favoriteSongsAPI';
import './player.css';

export default class Player extends Component {
  state = {
    checked: false,
    isPaused: true,
    playlist: [],
    player: new Audio(),
    musicProgress: 0,
    actIndex: 0,
    actSong: {},
    id: '',
  }

  componentDidUpdate() {
    const { actSong, playlist } = this.props;
    const { id } = this.state;

    if (actSong.trackId === id) return;

    const actIndex = playlist.findIndex(({ trackId }) => trackId === actSong.trackId);
    this.setState({
      id: actSong.trackId,
      actSong,
      actIndex,
      playlist,
    }, () => this.playSong());
  }

  playSong = () => {
    const { playlist, player, actIndex } = this.state;
    const actSong = playlist[actIndex];

    this.setState({
      actSong,
      checked: isFavorite(actSong),
      isPaused: false,
    });

    player.src = actSong.previewUrl;
    player.ontimeupdate = () => this.updatePlayer();
    player.play();
  }

  nextSong = () => {
    const { playlist, actIndex } = this.state;
    const next = actIndex + 1;

    if (playlist[next]) {
      this.setState({ actIndex: next }, () => this.playSong());
    }
  }

  prevSong = () => {
    const { playlist, actIndex } = this.state;
    const prev = actIndex - 1;

    if (playlist[prev]) {
      this.setState({ actIndex: prev }, () => this.playSong());
    }
  }

  playPauseSong = () => {
    const { player } = this.state;

    if (!player.src.length) return;
    if (player.paused) player.play();
    else player.pause();
    this.setState({ isPaused: player.paused });
  }

  setProgress = ({ target: { value } }) => {
    const { player } = this.state;
    const { duration } = player;

    player.currentTime = (value / 100) * duration;
  }

  changeVolume = ({ target: { value } }) => {
    const { player } = this.state;
    const volume = value / 100;

    player.volume = volume;
  }

  updatePlayer = () => {
    const { player } = this.state;
    const { duration, currentTime } = player;
    const musicProgress = (currentTime / duration) * 100;

    if (Number.isNaN(musicProgress)) return;

    this.setState({ musicProgress });
  }

  handleFavorite = async ({ target: { checked } }) => {
    const { actSong } = this.state;

    if (checked) await addSong(actSong);
    else await removeSong(actSong);

    this.setState({ checked });
  }

  render() {
    const { musicProgress, actSong, checked, isPaused } = this.state;
    const { trackName, collectionName, artworkUrl60, artistName } = actSong;

    return (
      <section className="player">
        <div className="player-left">
          <img src={ artworkUrl60 } alt={ collectionName } />

          <div>
            <h5>{ trackName }</h5>
            <p>{ artistName }</p>
          </div>

          <label htmlFor="player-favorite">
            { checked
              ? <i className="fa-solid fa-heart favorite" />
              : <i className="fa-regular fa-heart" />}

            <input
              className="toggle_favorite-input"
              id="player-favorite"
              type="checkbox"
              checked={ checked }
              onChange={ this.handleFavorite }
            />
          </label>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button type="button" onClick={ this.prevSong }>
              <i className="fa-solid fa-backward-step" />
            </button>

            <button type="button" onClick={ this.playPauseSong }>
              { isPaused
                ? <i className="fa-solid fa-play" />
                : <i className="fa-solid fa-pause" />}
            </button>

            <button type="button" onClick={ this.nextSong }>
              <i className="fa-solid fa-forward-step" />
            </button>
          </div>

          <div className="player-progress">
            <input
              className="progressBar"
              type="range"
              value={ musicProgress }
              onChange={ this.setProgress }
              min={ 0 }
              max={ 100 }
            />
          </div>
        </div>

        <div className="player-right">
          <i className="fa-solid fa-volume-high volume" />
          <input
            className="progressBar"
            type="range"
            onChange={ this.changeVolume }
            min={ 0 }
            max={ 100 }
          />
        </div>
      </section>
    );
  }
}

Player.propTypes = {
  actSong: PropTypes.string.isRequired,
  playlist: PropTypes.array,
}.isRequired;
