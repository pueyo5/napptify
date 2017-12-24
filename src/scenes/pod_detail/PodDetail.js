import React, { Component } from 'react';
import './pod_detail.css';
import { podsService } from "../../services/PodsService";
import { PodSidebar } from "./pod_sidebar/PodSidebar";
import { PodContent } from "./pod_content/PodContent";
import { Episode } from "./episode/Episode";
import { isEmpty } from "lodash";

export class PodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rss: []
    }
  }

  componentDidMount() {
    podsService.getPodDetails({podId: this.props.match.params.podId}).then((details) => {
      this.setState({
        rss: details
      })
    })
  }

  render() {
    let content = null;
    if (isEmpty(this.props.match.params.episodeId)) {
      content = <PodContent
        rss={this.state.rss}
      />;
    } else {
      content = <Episode
        episode={this.state.rss.item[+this.props.match.params.episodeId]}
      />;
    }
    return (
      <div id="details-container">
        <PodSidebar
          rss={this.state.rss}
        />
        {content}
      </div>
    )
  }
}