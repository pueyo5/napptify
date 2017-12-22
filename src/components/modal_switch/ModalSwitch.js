import React, { Component } from 'react';
import { Home } from "../../scenes/home/Home";
import { Switch, Route } from 'react-router-dom'

export class ModalSwitch extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/podcast/:podId' component={Home}/>
      </Switch>
    )
  }
}