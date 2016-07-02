import '../node_modules/animate.css/animate.min.css';
import '../node_modules/nprogress/nprogress.css';

import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.

import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { rootStore } from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './components/App';

reactDom.render(
  <MuiThemeProvider muiTheme = {getMuiTheme()}>
    <Provider store = {rootStore}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('bug-bash-tools')
);
