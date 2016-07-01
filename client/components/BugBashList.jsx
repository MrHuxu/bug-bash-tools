import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { red500, blue500 } from 'material-ui/styles/colors';

import EditBugBash from './EditBugBash';

const styles = {
  btnWrapper : {
    display : 'flex'
  }
};

class BugBashList extends Component {
  state = {
    open : false,
    data : {
      id   : '',
      info : {}
    }
  };

  handleOpen = (id, info) => {
    this.setState({
      open : true,
      data : {
        id   : id,
        info : info
      }
    });
  };

  handleClose = () => {
    this.setState({
      open : false
    });
  };

  render () {
    const { ids, infos } = this.props;
    const rows = ids.toJS().map(id => {
      var info = infos.get(id.toString()).toJS();
      return (
        <TableRow>
          <TableRowColumn>{info.name}</TableRowColumn>
          <TableRowColumn>{info.ticket}</TableRowColumn>
          <TableRowColumn>{info.startTime}</TableRowColumn>
          <TableRowColumn>{info.endTime}</TableRowColumn>
          <TableRowColumn>
            <div style = {styles.btnWrapper}>
              <IconButton
                onClick = {this.handleOpen.bind(this, id, info)}
              >
                <EditorModeEdit color = {blue500} />
              </IconButton>
              <IconButton>
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
          open = {this.state.open}
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
