import React, { Component } from 'react';
import './pods_list.css';
import { PodSquare } from "./pod_square/PodSquare";
import { SearchBar } from '../../components/search_bar/SearchBar';
import { Header } from '../../components/header/Header';
import { Grid, Row} from 'react-bootstrap';
import { podsService } from "../../services/PodsService";

export class PodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pods: [],
      allPods: [],
      scene_loading: true,
      loading: true
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount() {
    podsService.getPods().then((pods) => {
      this.setState({
        pods: pods,
        allPods: pods,
        counter: pods.length,
        scene_loading: false,
        loading: false
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
      <div>
        <Header scene_loading={this.state.scene_loading}/>
        <div id="pods-container">
          <SearchBar
            updateSearch={this.updateSearch}
            counter={this.state.counter}
          />
          <Grid>
            <Row id="pods-list" >
              {this.state.pods.map((pod, i) =>
                  <PodSquare
                    key={pod.id.attributes['im:id']}
                    pod={pod}
                    index={i}
                  />
              )}
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}