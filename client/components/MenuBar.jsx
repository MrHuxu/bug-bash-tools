import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import EditBugBash from './EditBugBash';

import { changeVersion } from '../actions/BugBashActions';

const styles = {
  title : {
    margin : '0 0 0 20px'
  }
};

class MenuBar extends Component {
  static propTypes = {
    dispatch : React.PropTypes.func.isRequired,
    version  : React.PropTypes.string.isRequired
  };

  state = {
    open  : false,
    value : 9
  };

  componentDidUpdate () {
    var selectedVersion = this.refs.version.getInputNode().innerText.replace('\n', '');
    this.props.dispatch(changeVersion(selectedVersion));
  }

  _open = () => {
    this.setState({
      open : true
    });
  };

  _close = () => {
    this.setState({
      open : false
    });
  };

  _versionChange = (event, index, value) => {
    this.setState({value});
  };

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <ToolbarTitle text = 'Bug Bash Tool' style = {styles.title} />
            <DropDownMenu
              ref = 'version'
              value = {this.state.value}
              onChange = {this._versionChange}
            >
              <MenuItem value = {16} primaryText = 'ALL' />
              <MenuItem value = {15} primaryText = '6.16' />
              <MenuItem value = {14} primaryText = '6.15' />
              <MenuItem value = {13} primaryText = '6.14' />
              <MenuItem value = {12} primaryText = '6.13' />
              <MenuItem value = {11} primaryText = '6.12' />
              <MenuItem value = {10} primaryText = '6.11' />
              <MenuItem value = {9} primaryText = '6.10' />
              <MenuItem value = {8} primaryText = '6.9' />
              <MenuItem value = {7} primaryText = '6.8' />
              <MenuItem value = {6} primaryText = '6.7' />
              <MenuItem value = {5} primaryText = '6.6' />
              <MenuItem value = {4} primaryText = '6.5' />
              <MenuItem value = {3} primaryText = '6.4' />
              <MenuItem value = {2} primaryText = '6.3' />
              <MenuItem value = {1} primaryText = '6.2' />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className = 'muidocs-icon-custom-sort' />
            <ToolbarSeparator />
            <RaisedButton
              primary
              label = '+'
              onClick = {this._open}
            />
          </ToolbarGroup>
        </Toolbar>
        <EditBugBash
          open = {this.state.open}
          handleClose = {this._close}
          currentVersion = {this.props.version}
        />
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    version : state.bugBash.version
  };
};

export default connect(mapStateToProps)(MenuBar);
