import React, { Component } from 'react';
import { PodsList } from "../../scenes/pods_list/PodsList";
import { PodDetail } from "../../scenes/pod_detail/PodDetail";
import { Switch, Route, Redirect } from 'react-router-dom'

export class ModalSwitch extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={PodsList}/>
        <Route exact path='/podcast/:podId' component={PodDetail}/>
        <Route path='/podcast/:podId/episode/:episodeId' component={PodDetail}/>
        <Redirect to="/" />
      </Switch>
    )
  }
}