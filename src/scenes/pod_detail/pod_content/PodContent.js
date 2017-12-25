import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pod_content.css'
import { Table, Col} from 'react-bootstrap';

export class PodContent extends Component {

  getFormatedDate(data){
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return day + '/' + month + '/' + year;
  }

  render() {
    let pod = this.props.pod;
    let episodes = pod.episodes || [];
    return (
      <Col xs={12} sm={9} md={9} lg={9}>
        <div className="main-box">
          <h2>Episodes: {episodes.length}</h2>
        </div>
        <div className="main-box">
          <Table responsive className="episodes-table">
            <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
            </thead>
            <tbody>
            {episodes.map( (episode, i) =>
              <tr key={i}>
                <td>
                  <Link to={`/podcast/${pod.id}/episode/${i}`}>
                    {episode.title[0]}
                  </Link>
                </td>
                <td>{this.getFormatedDate(episode.pubDate)}</td>
                <td>{episode['itunes:duration']}</td>
              </tr>
            )}
            </tbody>
          </Table>
        </div>
      </Col>
    )
  }
}