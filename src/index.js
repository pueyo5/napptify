import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { ModalSwitch } from './components/modal_switch/ModalSwitch';
import './index.scss';

render(
  <BrowserRouter>
    <Route component={ModalSwitch}/>
  </BrowserRouter>,
  document.getElementById('root')
);