import React, { Component } from 'react';
import './pods_list.css';
import { PodSquare } from "./pod_square/PodSquare";
import { Grid, Row} from 'react-bootstrap';

export class PodsList extends Component {

  render() {
    return (
      <Grid>
      <Row id="pod-list" >
          {this.props.pods.map(pod =>
            <PodSquare
              key={pod.id.attributes['im:id']}
              pod={pod}
            />
          )}
        </Row>
      </Grid>
    )
  }
}