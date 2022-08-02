import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Player extends Component {
  render() {
    const { src } = this.props;

    return (
      <audio data-testid="audio-component" src={ src } controls>
        <track kind="captions" />
      </audio>
    );
  }
}

Player.propTypes = {
  src: PropTypes.string.isRequired,
};
