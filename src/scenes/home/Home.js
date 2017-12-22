import React, { Component } from 'react';
import { Header } from '../../components/header/Header';
import { PodsList } from "./pods_list/PodsList";
import { podsService } from "../../services/PodsService";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.pods = [];
    this.state = {
      pods: []
    }
  }

  componentDidMount() {
    podsService.getPods().then((pods) => {
      this.setState({pods: pods});
    })
  }

  render() {
    return (
      <div id="home">
        <Header/>
        <PodsList
          pods={this.state.pods}
        />
      </div>
    );
  }
}