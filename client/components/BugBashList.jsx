import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { red500, blue500 } from 'material-ui/styles/colors';

import EditBugBash from './EditBugBash';
import DeleteBugBash from './DeleteBugBash';

import { fetchAllBugBash } from '../actions/BugBashActions';
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
    ids      : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      name      : React.PropTypes.string.isRequired,
      ticket    : React.PropTypes.string.isRequired,
      startTime : React.PropTypes.string.isRequired,
      endTime   : React.PropTypes.string.isRequired
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
    this.props.dispatch(fetchAllBugBash());
  }

  handleOpenEdit = (_id, info, e) => {
    e.stopPropagation();
    this.setState({
      openEdit : true,
      data     : {
        _id  : _id,
        info : info
      }
    });
  };

  handleOpenDelete = (_id, info, e) => {
    e.stopPropagation();
    this.setState({
      openDelete : true,
      data       : {
        _id  : _id,
        info : info
      }
    });
  };

  handleClose = () => {
    this.setState({
      openEdit   : false,
      openDelete : false
    });
  };

  handleSelect = (rows) => {
    const { ids, dispatch } = this.props;

    if ('string' === typeof rows) {
      dispatch(fetchMembers());
    } else {
      dispatch(fetchMembers(rows.map(row => ids[row])));
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
          <TableRowColumn>{info.name}</TableRowColumn>
          <TableRowColumn>{info.ticket}</TableRowColumn>
          <TableRowColumn>{info.startTime}</TableRowColumn>
          <TableRowColumn>{info.endTime}</TableRowColumn>
          <TableRowColumn>
            <div style = {styles.btnWrapper}>
              <IconButton
                onClick = {this.handleOpenEdit.bind(this, _id, info)}
              >
                <EditorModeEdit color = {blue500} />
              </IconButton>
              <IconButton
                onClick = {this.handleOpenDelete.bind(this, _id, info)}
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
          onRowSelection = {this.handleSelect.bind(null)}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Ticket</TableHeaderColumn>
              <TableHeaderColumn>Start Time</TableHeaderColumn>
              <TableHeaderColumn>End Time</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>
        <EditBugBash
          open = {this.state.openEdit}
          data = {this.state.data}
          handleClose = {this.handleClose}
        />
        <DeleteBugBash
          open = {this.state.openDelete}
          data = {this.state.data}
          handleClose = {this.handleClose}
        />
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    ids   : state.bugBash.ids,
    infos : state.bugBash.infos
  };
};

export default connect(mapStateToProps)(BugBashList);
