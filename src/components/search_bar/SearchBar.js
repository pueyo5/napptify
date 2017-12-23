import React, { Component } from 'react';
import './search_bar.css';
import { Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ""}
  }
  handleSearch(event){
    this.props.updateSearch(event.target.value.toLowerCase());
  }

  render() {
    return (
    <Form inline>
      <FormGroup controlId="formInlineName">
        <ControlLabel className="pods-counter">{this.props.counter}</ControlLabel>
        {' '}
        <FormControl type="text" placeholder="Filter podcasts..." onChange={this.handleSearch.bind(this)}/>
      </FormGroup>
    </Form>
    );
  }
}