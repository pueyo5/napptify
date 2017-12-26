import React, { Component } from 'react';
import './pod_detail.css';
import { podsService } from "../../services/PodsService";
import { PodSidebar } from "./pod_sidebar/PodSidebar";
import { PodContent } from "./pod_content/PodContent";
import { Loading } from "../../components/loading/Loading";
import { Episode } from "./episode/Episode";
import { isEmpty } from "lodash";

export class PodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pod: [],
      loading: true
    }
  }

  componentDidMount() {
    this.props.scene_loading(true);
    podsService.getPodDetails({podId: this.props.match.params.podId})
    .then((details) => {
      this.props.scene_loading(false);
      this.setState({
        pod: details,
        loading: false
      })
    })
    .catch((error) => {
      this.props.history.goBack();
    })
  }

  render() {
    if (this.state.loading){
      return (
        <Loading/>
      )
    }
    let content = null;
    if (isEmpty(this.props.match.params.episodeId)) {
      content = <PodContent
        pod={this.state.pod}
      />;
    } else {
      const episodes = this.state.pod.episodes || [];
      content = <Episode
        episode={episodes[+this.props.match.params.episodeId]}
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