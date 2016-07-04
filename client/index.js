import '../node_modules/animate.css/animate.min.css';
import '../node_modules/nprogress/nprogress.css';

import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { StyleRoot } from 'radium';
import { rootStore } from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './components/App';

render(
  <MuiThemeProvider muiTheme = {getMuiTheme()}>
    <Provider store = {rootStore}>
      <StyleRoot style = {{ height: '100%' }}>
        <App />
      </StyleRoot>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('bug-bash-tools')
);
