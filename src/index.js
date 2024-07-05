import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from '@containers/Register';
import Login from '@containers/Login';
import App from '@containers/App';
import { CxtProvider } from '@utils/context';
import './index.css';

// import { startVconsole } from './utils/index';

// document.getElementById('root').appendChild(<div>dsdsds</div>);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CxtProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CxtProvider>
  </React.StrictMode>,
);

// 啟動vconsole 用於手機上
// startVconsole();
