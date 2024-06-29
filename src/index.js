import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './containers/Register';
// import Login from './containers/Login';

import { startVconsole } from './utils/index';

// document.getElementById('root').appendChild(<div>dsdsds</div>);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Register />

  </React.StrictMode>,
);

// 啟動vconsole 用於手機上
startVconsole();
