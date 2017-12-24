import React, { Component } from 'react';
import './pod_sidebar.css'
import { Image, Col} from 'react-bootstrap';

export class PodSidebar extends Component {

  render() {
    let pod = this.props.pod;
    return (
      <Col xs={3} sm={3} md={3} lg={3}>
        <div className="main-box sidebar-container">
          <div className="img-container">
            <Image src={pod._image} alt={pod._title} rounded />
          </div>
          <div className="content">
            <h3>{pod._title}</h3>
            <p>by {pod._author}</p>
          </div>
          <p className="bold">Description:</p>
          <p dangerouslySetInnerHTML={{ __html: pod._description}}></p>
        </div>
      </Col>
    )
  }
}