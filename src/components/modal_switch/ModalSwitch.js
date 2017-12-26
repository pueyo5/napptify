import React, { Component } from 'react';
import { PodsList } from "../../scenes/pods_list/PodsList";
import { PodDetail } from "../../scenes/pod_detail/PodDetail";
import { Switch, Route, Redirect } from 'react-router-dom'

export class ModalSwitch extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' render={(props)=><PodsList {...props} scene_loading={this.props.scene_loading}/>}/>
        <Route exact path='/podcast/:podId' render={(props)=><PodDetail {...props}  scene_loading={this.props.scene_loading}/>}/>}/>
        <Route path='/podcast/:podId/episode/:episodeId' render={(props)=><PodDetail {...props}  scene_loading={this.props.scene_loading}/>}/>}/>
        <Redirect to="/" />
      </Switch>
    )
  }
}