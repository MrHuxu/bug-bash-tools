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

class EditBugBash extends Component {
  state = {
    name      : '',
    ticket    : '',
    startDate : '',
    startTime : '',
    endDate   : '',
    endTime   : ''
  };

  handleSubmit = () => {
    if (this.state.name && this.state.name.length) {
      this.props.dispatch(addBugBash(Immutable.Map({
        name      : this.state.name,
        ticket    : this.state.ticket,
        startTime : '',
        endTime   : ''
      })));
    }
    this.props.handleClose();
  };

  handleUpdate (field) {
    this.state[field] = arguments[2];
  }

  render () {
    const { data } = this.props;
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
        <Dialog
          title = 'Dialog With Date Picker'
          actions = {actions}
          modal = {false}
          open = {this.props.open}
          onRequestClose = {this.props.handleClose}
        >
          <div style = {styles.halfPanel}>
            Name<br />
            <TextField
              id = 'name'
              onChange = {this.handleUpdate.bind(this, 'name')}
              defaultValue = {data ? data.info.name : ''}
            /><br />
            Main Ticket<br />
            <TextField
              id = 'ticket'
              onChange = {this.handleUpdate.bind(this, 'ticket')}
              defaultValue = {data ? data.info.ticket : ''}
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

export default connect()(EditBugBash);
