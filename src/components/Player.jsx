import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './player.css';

export default class Player extends Component {
  state = {
    playlist: [],
    player: new Audio(),
    musicProgress: 0,
    actIndex: 0,
    id: '',
  }

  componentDidUpdate() {
    const { actSong, playlist } = this.props;
    const { id } = this.state;

    if (actSong === id) return;

    const actIndex = playlist.findIndex(({ trackId }) => trackId === actSong);
    this.setState({ id: actSong, actIndex, playlist }, () => this.playSong());
  }

  playSong = () => {
    const { playlist, player, actIndex } = this.state;
    const { previewUrl } = playlist[actIndex];

    player.src = previewUrl;
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

  updatePlayer = () => {
    const { player } = this.state;
    const { duration, currentTime } = player;
    const musicProgress = (currentTime / duration) * 100;

    if (Number.isNaN(musicProgress)) return;

    this.setState({ musicProgress });
  }

  render() {
    const { musicProgress } = this.state;

    return (
      <section className="player">
        <div>
          <button type="button" onClick={ this.prevSong }>prev</button>
          <button type="button" onClick={ this.playPauseSong }>D</button>
          <button type="button" onClick={ this.nextSong }>next</button>
        </div>

        <div>
          <input
            className="progressBar"
            type="range"
            readOnly
            value={ musicProgress }
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
