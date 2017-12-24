import React, { Component } from 'react';
import './pod_sidebar.css'
import { Image, Col} from 'react-bootstrap';

export class PodSidebar extends Component {

  getImageUrl(rss) {
    if (rss && rss.image && rss.image[0] && rss.image[0].url) {
      return rss.image[0].url[0];
    } else {
      return "";
    }
  }

  render() {
    let rss = this.props.rss;
    console.log(rss);
    return (
      <Col xs={3} sm={3} md={3} lg={3}>
        <div className="main-box sidebar-container">
          <div className="img-container">
            <Image src={this.getImageUrl(rss)} alt={rss.trackName} rounded />
          </div>
          <div className="content">
            <h3>{rss.trackName}</h3>
            <p>by {rss.artistName}</p>
          </div>
          <p className="bold">Description:</p>
          <p>{rss.description}</p>
        </div>
      </Col>
    )
  }
}