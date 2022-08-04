import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, isFavorite } from '../services/favoriteSongsAPI';
import './player.css';

export default class Player extends Component {
  state = {
    checked: false,
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

    if (player.paused) player.play();
    else player.pause();
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
    const { musicProgress, actSong, checked } = this.state;
    const { trackName, collectionName, artworkUrl60 } = actSong;

    return (
      <section className="player">
        <div className="player-left">
          <img src={ artworkUrl60 } alt={ collectionName } />

          <div>
            <h5>{ trackName }</h5>
            <p>{ collectionName }</p>
          </div>

          <input type="checkbox" checked={ checked } onChange={ this.handleFavorite } />
        </div>

        <div className="player-center">
          <div>
            <button type="button" onClick={ this.prevSong }>prev</button>
            <button type="button" onClick={ this.playPauseSong }>D</button>
            <button type="button" onClick={ this.nextSong }>next</button>
          </div>

          <div>
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
