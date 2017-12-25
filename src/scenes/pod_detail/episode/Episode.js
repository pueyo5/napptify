import React, { Component } from 'react';
import { AudioPlayer } from '../../../components/audio_player/AudioPlayer';
import './episode.css'
import { Col} from 'react-bootstrap';
import { head } from "lodash";

export class Episode extends Component {
  getAudioParam(param){
    const enclosure = head(this.props.episode.enclosure).$;
    return enclosure[param];
  }

  render() {
    let episode = this.props.episode;
    return (
      <Col xs={12} sm={9} md={9} lg={9}>
        <div className="main-box">
          <h2>{episode.title[0]}</h2>
          <p dangerouslySetInnerHTML={{ __html: episode.description}}></p>
        </div>
        <AudioPlayer
          type={this.getAudioParam("type")}
          url={this.getAudioParam("url")}
        />
      </Col>
    )
  }
}