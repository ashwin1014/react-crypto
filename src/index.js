import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import App from './app/App';
import store from './store';
// import 'antd/dist/antd.css';

const MOUNT_NODE = document.getElementById('app');
const APP_BOOTSTRAP = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

if (MOUNT_NODE.hasChildNodes()) {
  hydrate(APP_BOOTSTRAP, MOUNT_NODE);
} else {
  render(APP_BOOTSTRAP, MOUNT_NODE);
}

reportWebVitals(console.info);
