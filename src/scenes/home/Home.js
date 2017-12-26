import React, { Component } from 'react';
import { Header } from '../../components/header/Header';
import { Route } from 'react-router-dom';
import { ModalSwitch } from '../../components/modal_switch/ModalSwitch';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene_loading: true
    }
    this.updateLoading = this.updateLoading.bind(this)
  }

  updateLoading(loading){
    this.setState({
      scene_loading: loading
    })
  }

  render() {
    return (
      <div>
        <Header scene_loading={this.state.scene_loading}/>
        <Route render={(props)=><ModalSwitch {...props} scene_loading={this.updateLoading}/>}/>
      </div>
    )
  }
}