import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { ModalSwitch } from './components/modal_switch/ModalSwitch';
import { Header } from './components/header/Header';
import './index.css';

render(
  <div>
    <BrowserRouter>
      <Header/>
    </BrowserRouter>
    <BrowserRouter>
      <Route component={ModalSwitch}/>
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);