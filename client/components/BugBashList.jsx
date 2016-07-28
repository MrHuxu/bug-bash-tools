import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { red500, blue500 } from 'material-ui/styles/colors';

import EditBugBash from './EditBugBash';
import DeleteBugBash from './DeleteBugBash';

import { fetchBugBash } from '../actions/BugBashActions';
import { fetchMembers } from '../actions/MemberActions';

const styles = {
  btnWrapper : {
    display : 'flex'
  }
};

class BugBashList extends Component {
  static propTypes = {
    dispatch : React.PropTypes.func.isRequired,
    style    : React.PropTypes.object,
    version  : React.PropTypes.string.isRequired,
    ids      : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      Name      : React.PropTypes.string.isRequired,
      Ticket    : React.PropTypes.string.isRequired,
      Version   : React.PropTypes.string.isRequired,
      StartTime : React.PropTypes.string.isRequired,
      EndTime   : React.PropTypes.string.isRequired
    })).isRequired
  };

  state = {
    openEdit   : false,
    openDelete : false,
    data       : {
      _id  : '',
      info : {
        name      : '',
        ticket    : '',
        startTime : '',
        endTime   : ''
      }
    }
  };

  componentDidMount () {
    const { dispatch, version } = this.props;
    dispatch(fetchBugBash({ version: version }));
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState === this.state) {
      const { dispatch, ids, version } = this.props;
      if (prevProps.version === version) {
        dispatch(fetchMembers(ids));
      } else {
        dispatch(fetchBugBash({ version: version }));
      }
    }
  }

  _openEdit = (_id, info, e) => {
    e.stopPropagation();
    this.setState({
      openEdit : true,
      data     : {
        _id  : _id,
        info : info
      }
    });
  };

  _openDelete = (_id, info, e) => {
    e.stopPropagation();
    this.setState({
      openDelete : true,
      data       : {
        _id  : _id,
        info : info
      }
    });
  };

  _closeDialogs = () => {
    this.setState({
      openEdit   : false,
      openDelete : false
    });
  };

  _selectBugBash = (rows) => {
    const { ids, dispatch } = this.props;

    if ('object' === typeof rows && rows.length) {
      dispatch(fetchMembers(rows.map(row => ids[row])));
    } else {
      dispatch(fetchMembers(ids));
    }
  };

  render () {
    const { ids, infos } = this.props;
    const rows = ids.map(_id => {
      var info = infos[_id];
      return (
        <TableRow
          key = {`bug-bash-${_id}`}
        >
          <TableRowColumn>{info.Name}</TableRowColumn>
          <TableRowColumn>{info.Ticket}</TableRowColumn>
          <TableRowColumn>{info.Version}</TableRowColumn>
          <TableRowColumn>{info.StartTime}</TableRowColumn>
          <TableRowColumn>{info.EndTime}</TableRowColumn>
          <TableRowColumn>
            <div style = {styles.btnWrapper}>
              <IconButton
                onClick = {this._openEdit.bind(this, _id, info)}
              >
                <EditorModeEdit color = {blue500} />
              </IconButton>
              <IconButton
                onClick = {this._openDelete.bind(this, _id, info)}
              >
                <ActionDelete color = {red500} />
              </IconButton>
            </div>
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div style = {this.props.style}>
        <Table
          selectable
          multiSelectable
          enableSelectAll
          onRowSelection = {this._selectBugBash.bind(null)}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Ticket</TableHeaderColumn>
              <TableHeaderColumn>Version</TableHeaderColumn>
              <TableHeaderColumn>Start Time</TableHeaderColumn>
              <TableHeaderColumn>End Time</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway = {false}>
            {rows}
          </TableBody>
        </Table>
        <EditBugBash
          open = {this.state.openEdit}
          data = {this.state.data}
          handleClose = {this._closeDialogs}
          currentVersion = {this.props.version}
        />
        <DeleteBugBash
          open = {this.state.openDelete}
          data = {this.state.data}
          handleClose = {this._closeDialogs}
        />
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    version : state.bugBash.version,
    ids     : state.bugBash.ids,
    infos   : state.bugBash.infos
  };
};

export default connect(mapStateToProps)(BugBashList);
