import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { red500, blue500 } from 'material-ui/styles/colors';

import EditBugBash from './EditBugBash';
import DeleteBugBash from './DeleteBugBash';

const styles = {
  btnWrapper : {
    display : 'flex'
  }
};

class BugBashList extends Component {
  static propTypes = {
    style : React.PropTypes.object,
    ids   : ImmutablePropTypes.listOf(React.PropTypes.number).isRequired,
    infos : ImmutablePropTypes.mapOf(ImmutablePropTypes.mapOf(React.PropTypes.string)).isRequired
  };

  state = {
    openEdit   : false,
    openDelete : false,
    data       : {
      id   : 0,
      info : {}
    }
  };

  handleOpenEdit = (id, info) => {
    this.setState({
      openEdit : true,
      data     : {
        id   : id,
        info : info
      }
    });
  };

  handleOpenDelete = (id, info) => {
    this.setState({
      openDelete : true,
      data       : {
        id   : id,
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

  render () {
    const { ids, infos } = this.props;
    const rows = ids.toJS().map(id => {
      var info = infos.get(id.toString()).toJS();
      return (
        <TableRow key = {`bug-bash-${id}`}>
          <TableRowColumn>{info.name}</TableRowColumn>
          <TableRowColumn>{info.ticket}</TableRowColumn>
          <TableRowColumn>{info.startTime}</TableRowColumn>
          <TableRowColumn>{info.endTime}</TableRowColumn>
          <TableRowColumn>
            <div style = {styles.btnWrapper}>
              <IconButton
                onClick = {this.handleOpenEdit.bind(this, id, info)}
              >
                <EditorModeEdit color = {blue500} />
              </IconButton>
              <IconButton
                onClick = {this.handleOpenDelete.bind(this, id, info)}
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Ticket</TableHeaderColumn>
              <TableHeaderColumn>Start Time</TableHeaderColumn>
              <TableHeaderColumn>End Time</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
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
    ids   : state.bugBash.get('ids'),
    infos : state.bugBash.get('infos')
  };
};

export default connect(mapStateToProps)(BugBashList);
