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
    let rss = this.props.rss;
    let items = rss.item || [];
    console.log(pod);
    console.log(rss);
    return (
      <Col xs={9} sm={9} md={9} lg={9}>
        <div className="main-box">
          <h2>Episodes: {pod.trackCount}</h2>
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
            {items.map( (episode, i) =>
              <tr key={i}>
                <td>
                  <Link to={`/podcast/${pod.collectionId}/episode/${i}`}>
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