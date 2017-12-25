import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pod_sidebar.css';
import { Image, Col} from 'react-bootstrap';

export class PodSidebar extends Component {

  render() {
    let pod = this.props.pod;
    return (
      <Col xs={12} sm={3} md={3} lg={3}>
        <div className="main-box sidebar-container">
          <div className="img-container">
            <Link to={`/podcast/${pod.id}`}>
              <Image src={pod.img} alt={pod.name} rounded />
            </Link>
          </div>
          <div className="content">
            <h3><Link to={`/podcast/${pod.id}`}>{pod.name}</Link></h3>
            <p>by <Link to={`/podcast/${pod.id}`}>{pod.author}</Link></p>
          </div>
          <p className="bold">Description:</p>
          <p dangerouslySetInnerHTML={{ __html: pod.desc}}></p>
        </div>
      </Col>
    )
  }
}