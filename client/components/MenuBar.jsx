import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

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
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text = 'Bug Bash Tool' />
        </ToolbarGroup>
        <ToolbarGroup float = 'right'>
          <RaisedButton
            primary
            label = 'Add Bug Bash'
            onTouchTap = {this.handleOpen}
          />
          <EditBugBash
            open = {this.state.open}
            handleClose = {this.handleClose}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default MenuBar;
