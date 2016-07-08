import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import EditBugBash from './EditBugBash';

const styles = {
  title : {
    margin : '0 0 0 20px'
  }
};

class MenuBar extends Component {
  state = {
    open  : false,
    value : 1
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

  handleVersionChange = (event, index, value) => {
    this.setState({value});
  };

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <ToolbarTitle text = 'Bug Bash Tool' style = {styles.title} />
            <DropDownMenu value = {this.state.value} onChange = {this.handleVersionChange}>
              <MenuItem value = {1} primaryText = '6.9' />
              <MenuItem value = {2} primaryText = '6.8' />
              <MenuItem value = {3} primaryText = '6.7' />
              <MenuItem value = {4} primaryText = '6.6' />
              <MenuItem value = {5} primaryText = '6.5' />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className = 'muidocs-icon-custom-sort' />
            <ToolbarSeparator />
            <RaisedButton
              primary
              label = '+'
              onClick = {this.handleOpen}
            />
          </ToolbarGroup>
        </Toolbar>
        <EditBugBash
          open = {this.state.open}
          handleClose = {this.handleClose}
        />
      </div>
    );
  }
}

export default MenuBar;
