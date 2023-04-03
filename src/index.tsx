import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { Routing } from './common/ui/routing/routing';
import { store } from './store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routing />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
