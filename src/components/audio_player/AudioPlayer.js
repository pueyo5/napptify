import React, { Component } from 'react';
import './audio_player.css';

export class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      url: this.props.url
    }
  }

  render() {
    return (
      <div>
        <audio controls>
          <source src={this.state.url} type={this.state.type} />
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  }
}