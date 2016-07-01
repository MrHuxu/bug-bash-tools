import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const styles = {
  menubarBtn : {
    margin : '10px 0 10px 12px'
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
        <ToolbarGroup>
          <RaisedButton
            secondary
            style = {styles.menubarBtn}
            label = 'Edit Scores'
          />
          <ToolbarSeparator />
          <RaisedButton
            primary
            label = 'Organise Bug Bash'
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default MenuBar;
