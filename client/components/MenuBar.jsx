import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import EditScores from './EditScores';
import Organise from './Organise';

const styles = {
  btnContainer : {
    padding : '10px 0 0 0'
  },

  menubarBtn : {
    margin : '0 15px 0 15px'
  }
};

class MenuBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      value : 3
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render () {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text = 'Bug Bash Tool' />
        </ToolbarGroup>
        <ToolbarGroup style = {styles.btnContainer}>
          <EditScores style = {styles.menubarBtn} />
          <Organise style = {styles.menubarBtn} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default MenuBar;
