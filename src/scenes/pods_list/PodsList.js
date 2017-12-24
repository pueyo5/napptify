import React, { Component } from 'react';
import './pods_list.css';
import { PodSquare } from "./pod_square/PodSquare";
import { SearchBar } from '../../components/search_bar/SearchBar';
import { Grid, Row} from 'react-bootstrap';
import { podsService } from "../../services/PodsService";

export class PodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pods: [],
      allPods: []
    }
  }

  componentDidMount() {
    podsService.getPods().then((pods) => {
      this.setState({
        pods: pods,
        allPods: pods,
        counter: pods.length
      })
    })
  }

  updateSearch(query){
    let pods = this.state.allPods.filter((pod) => {
      return pod['im:name'].label.toLowerCase().includes(query) || pod['im:artist'].label.toLowerCase().includes(query)
    });
    this.setState({
      pods: pods,
      counter: pods.length
    });
  }

  render() {
    return (
      <div id="pods-container">
        <SearchBar
          updateSearch={this.updateSearch.bind(this)}
          counter={this.state.counter}
        />
        <Grid>
          <Row id="pods-list" >
            {this.state.pods.map(pod =>
              <PodSquare
                key={pod.id.attributes['im:id']}
                pod={pod}
              />
            )}
          </Row>
        </Grid>
      </div>
    )
  }
}