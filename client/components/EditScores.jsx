import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { changeScore } from '../actions/PersonActions';

const styles = {
  dialogContentStyle : {
    width : '100%'
  }
};

class EditScores extends Component {
  state = {
    open : false
  };

  handleScoreChange (id, level) {
    this.props.dispatch(changeScore({
      id    : id,
      level : 'p' + level,
      value : Number(arguments[arguments.length - 1])
    }));
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render () {
    const { ids, infos } = this.props;
    const actions = [
      <FlatButton
        label = 'Ok'
        primary
        keyboardFocused
        onTouchTap = {this.handleClose}
      />
    ];
    const rows = ids.toJS().map(id => {
      var info = infos.get(id.toString()).toJS();
      return (
        <TableRow>
          <TableRowColumn>{info.name}</TableRowColumn>
          {[1, 2, 3, 4].map(level => {
            return (
              <TableRowColumn>
                <TextField
                  defaultValue = {info.scores['p' + level]}
                  onChange = {this.handleScoreChange.bind(this, id, level)}
                />
              </TableRowColumn>
            );
          })}
          <TableRowColumn>{info.scores.p1 * 3 + info.scores.p2 * 2 + info.scores.p3 * 1 + info.scores.p4 * 0.5}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div style = {this.props.style}>
        <RaisedButton
          secondary
          label = 'Edit Scores'
          onTouchTap = {this.handleOpen}
        />
        <Dialog
          title = 'Dialog With Date Picker'
          actions = {actions}
          modal = {false}
          open = {this.state.open}
          onRequestClose = {this.handleClose}
          contentStyle = {{width: '1000px'}}
        >
          <Table selectable = {false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>P1</TableHeaderColumn>
                <TableHeaderColumn>P2</TableHeaderColumn>
                <TableHeaderColumn>P3</TableHeaderColumn>
                <TableHeaderColumn>P4</TableHeaderColumn>
                <TableHeaderColumn>Score</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    ids   : state.person.get('ids'),
    infos : state.person.get('infos')
  };
};

export default connect(mapStateToProps)(EditScores);
