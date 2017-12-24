import React, { Component } from 'react';
import './pod_sidebar.css'
import { Image, Col} from 'react-bootstrap';

export class PodSidebar extends Component {

  render() {
    let pod = this.props.pod;
    let rss = this.props.rss;
    console.log(rss);
    return (
      <Col xs={3} sm={3} md={3} lg={3}>
        <div className="main-box sidebar-container">
          <div className="img-container">
            <Image src={pod.artworkUrl100} alt={pod.trackName} rounded />
          </div>
          <div className="content">
            <h3>{pod.trackName}</h3>
            <p>by {pod.artistName}</p>
          </div>
          <p className="bold">Description:</p>
          <p>{rss.description}</p>
        </div>
      </Col>
    )
  }
}