import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './header.css';


export class Header extends Component {
  constructor(props) {
    super(props);
    //this.state = {pods: [], models: [], brands: []}
  }

  componentDidMount() {
//  podsService.getPods().then((pods) => {
//  this.setState({pods: pods});
//})
  }

  render() {
    return (
      <header>
        <h1><Link to={'/'}>Napptify</Link></h1>
      </header>
    );
  }
}