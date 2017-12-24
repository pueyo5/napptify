import React, { Component } from 'react';
import { PodsList } from "../pods_list/PodsList";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pods: []
    }
  }

  render() {
    return (
      <div id="home">
        <PodsList/>
      </div>
    );
  }
}