import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { fetchAllBugBash } from '../actions/BugBashActions';

import EditBugBash from './EditBugBash';

const styles = {
  title : {
    margin : '0 0 0 20px'
  }
};

class MenuBar extends Component {
  static propTypes = {
    dispatch : React.PropTypes.func.isRequire
  };

  state = {
    open  : false,
    value : 1
  };

  componentDidMount () {
    this._refreshBugBashList();
  }

  componentDidUpdate () {
    this._refreshBugBashList();
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

  _refreshBugBashList = () => {
    var selectedVersion = this.refs.version.getInputNode().innerText.replace('\n', '');
    this.props.dispatch(fetchAllBugBash({ version: selectedVersion }));
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
              <MenuItem value = {1} primaryText = '6.9' />
              <MenuItem value = {2} primaryText = 'ALL' />
              <MenuItem value = {3} primaryText = '6.8' />
              <MenuItem value = {4} primaryText = '6.7' />
              <MenuItem value = {5} primaryText = '6.6' />
              <MenuItem value = {6} primaryText = '6.5' />
              <MenuItem value = {7} primaryText = '6.4' />
              <MenuItem value = {8} primaryText = '6.3' />
              <MenuItem value = {9} primaryText = '6.2' />
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
        />
      </div>
    );
  }
}

export default connect()(MenuBar);
