import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pod_square.css'
import { Image, Col} from 'react-bootstrap';

export class PodSquare extends Component {

  render() {
    let pod = this.props.pod;
    let id = pod.id.attributes['im:id'];
    return (
      <Col xs={6} sm={4} md={4} lg={3}>
        <div className="pod-container">
          <Link to={`/podcast/${id}`}>
            <div className="img-container">
              <Image src={pod['im:image'][2].label} alt={pod.title.label} circle />
            </div>
            <div className="content">
              <h2>{pod['im:name'].label}</h2>
              <p>Author: {pod['im:artist'].label}</p>
            </div>
          </Link>
        </div>
      </Col>
    )
  }
}