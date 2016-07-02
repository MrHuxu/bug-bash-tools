import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import EditBugBash from './EditBugBash';

class MenuBar extends Component {
  state = {
    open : false
  };

  handleOpen = () => {
    this.setState({
      open : true
    });
  };

  handleClose = () => {
    this.setState({
      open : false
    });
  };

  render () {
    return (
      <div>
        <AppBar
          title = 'Bug Bash Tool'
          iconElementLeft = {
            <IconButton onTouchTap = {this.handleOpen}>
              <ContentAdd />
            </IconButton>
          }
        />
        <EditBugBash
          open = {this.state.open}
          handleClose = {this.handleClose}
        />
      </div>
    );
  }
}

export default MenuBar;
