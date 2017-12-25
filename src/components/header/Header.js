import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './header.css';

export class Header extends Component {

  render() {
    return (
      <header>
        <h1><Link to={'/'}>Napptify</Link></h1>
        {(this.props.scene_loading)?<h1>Loading</h1>:null}
      </header>
    );
  }
}