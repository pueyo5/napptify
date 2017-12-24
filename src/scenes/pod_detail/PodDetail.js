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
      pod: []
    }
  }

  componentDidMount() {
    podsService.getPodDetails({podId: this.props.match.params.podId}).then((details) => {
      this.setState({
        pod: details
      })
    })
  }

  render() {
    let content = null;
    if (isEmpty(this.props.match.params.episodeId)) {
      content = <PodContent
        pod={this.state.pod}
      />;
    } else {
      content = <Episode
        episode={this.state.pod._episodes[+this.props.match.params.episodeId]}
      />;
    }
    return (
      <div id="details-container">
        <PodSidebar
          pod={this.state.pod}
        />
        {content}
      </div>
    )
  }
}