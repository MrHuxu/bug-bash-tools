import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import { addBugBash, updBugBash } from '../actions/BugBashActions';

const styles = {
  versionContainer : {
    margin : '0 0 20px 0'
  },

  halfPanel : {
    display : 'inline-block',
    width   : '48%'
  }
};

class EditBugBash extends Component {
  static propTypes = {
    dispatch       : React.PropTypes.func.isRequired,
    handleClose    : React.PropTypes.func.isRequired,
    currentVersion : React.PropTypes.string.isRequired,
    open           : React.PropTypes.bool.isRequired,
    data           : React.PropTypes.shape({
      id   : React.PropTypes.number,
      info : React.PropTypes.object
    })
  };

  state = {
    version : 9
  };

  _selectVersion = (event, index, value) => this.setState({ version: value });

  _submit = () => {
    const { dispatch, data, currentVersion } = this.props;

    const { name, ticket, startDate, startTime, endDate, endTime, version } = this.refs;
    if (name.getValue().length) {
      const startDateObj = startDate.getDate();
      const startTimeObj = startTime.getTime();
      const endDateObj = endDate.getDate();
      const endTimeObj = endTime.getTime();
      const info = {
        name      : name.getValue(),
        ticket    : ticket.getValue(),
        version   : version.getInputNode().innerText.replace('\n', ''),
        startTime : startDateObj && startTimeObj && `${startDateObj.getFullYear()}-${startDateObj.getMonth() + 1}-${startDateObj.getDate()} ${startTimeObj.getHours()}:${startTimeObj.getMinutes()}`,
        endTime   : endDateObj && endTimeObj && `${endDateObj.getFullYear()}-${endDateObj.getMonth() + 1}-${endDateObj.getDate()} ${endTimeObj.getHours()}:${endTimeObj.getMinutes()}`
      };
      dispatch((data && data._id) ? updBugBash({
        _id            : data._id,
        info           : info,
        currentVersion : currentVersion
      }) : addBugBash({
        info           : info,
        currentVersion : currentVersion
      }));
    }
    this.props.handleClose();
  };

  render () {
    const { data } = this.props;
    const actions = [
      <FlatButton
        label = 'Cancel'
        secondary
        keyboardFocused
        onTouchTap = {this.props.handleClose}
      />,
      <FlatButton
        label = 'Ok'
        primary
        keyboardFocused
        onTouchTap = {this._submit}
      />
    ];

    return (
      <div>
        <Dialog
          title = 'Add or Update a Bug Bash'
          actions = {actions}
          modal = {false}
          open = {this.props.open}
          onRequestClose = {this.props.handleClose}
        >
          <div style = {styles.versionContainer}>
            Version
            <DropDownMenu
              ref = 'version'
              value = {this.state.version}
              onChange = {this._selectVersion}
            >
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
          </div>
          <div style = {styles.halfPanel}>
            Name<br />
            <TextField
              id = 'name'
              ref = 'name'
              defaultValue = {data ? data.info.name : ''}
            /><br />
            Main Ticket<br />
            <TextField
              id = 'ticket'
              ref = 'ticket'
              defaultValue = {data ? data.info.ticket : ''}
            /><br />
          </div>
          <div style = {styles.halfPanel}>
            From<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                ref = 'startDate'
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
                defaultDate = {data ? new Date(data.info.startTime) : new Date()}
                firstDayOfWeek = {0}
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                ref = 'startTime'
                format = '24hr'
                hintText = 'Start Time'
                defaultTime = {data ? new Date(data.info.startTime) : new Date()}
              />
            </div>
            To<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                ref = 'endDate'
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
                defaultDate = {data ? new Date(data.info.endTime) : new Date()}
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                ref = 'endTime'
                format = '24hr'
                hintText = 'End Time'
                defaultTime = {data ? new Date(data.info.endTime) : new Date()}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(EditBugBash);
