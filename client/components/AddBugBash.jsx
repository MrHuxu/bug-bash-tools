import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import { addBugBash } from '../actions/BugBashActions';

const styles = {
  halfPanel : {
    display : 'inline-block',
    width   : '48%'
  }
};

class AddBugBash extends Component {
  state = {
    open      : false,
    name      : '',
    ticket    : '',
    startDate : '',
    startTime : '',
    endDate   : '',
    endTime   : ''
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {
    this.props.dispatch(addBugBash(Immutable.Map({
      name: this.state.name,
      ticket: this.state.ticket,
      startTime: '',
      endTime: ''
    })));
    this.setState({open: false});
  };

  handleUpdate (field) {
    this.state[field] = arguments[2];
  }

  render () {
    const actions = [
      <FlatButton
        label = 'Ok'
        primary
        keyboardFocused
        onTouchTap = {this.handleSubmit}
      />
    ];

    return (
      <div>
        <RaisedButton
          primary
          label = 'Add Bug Bash'
          onTouchTap = {this.handleOpen}
        />
        <Dialog
          title = 'Dialog With Date Picker'
          actions = {actions}
          modal = {false}
          open = {this.state.open}
          onRequestClose = {this.handleClose}
        >
          <div style = {styles.halfPanel}>
            Name<br />
            <TextField
              id = 'name'
              onChange = {this.handleUpdate.bind(this, 'name')}
            /><br />
            Main Ticket<br />
            <TextField
              id = 'ticket'
              onChange = {this.handleUpdate.bind(this, 'ticket')}
            /><br />
          </div>
          <div style = {styles.halfPanel}>
            From<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
                onChange = {this.handleUpdate.bind(this, 'startDate')}
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                format = '24hr'
                hintText = 'Start Time'
                onChange = {this.handleUpdate.bind(this, 'startTime')}
              />
            </div>
            To<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
                onChange = {this.handleUpdate.bind(this, 'endDate')}
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                format = '24hr'
                hintText = 'End Time'
                onChange = {this.handleUpdate.bind(this, 'endTime')}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(AddBugBash);
