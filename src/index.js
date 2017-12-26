import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './scenes/home/Home'
import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

render(
  <div>
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);