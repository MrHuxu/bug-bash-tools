import $ from 'jquery';
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
    version   : 9,
    nameField : {
      valid : false
    },
    ticketField : {
      valid        : false,
      errorMessage : 'Follow this format: INK-XXXX'
    }
  };

  _selectVersion = (event, index, value) => this.setState({ version: value });

  _validateName = (event, value) => {
    this.setState({
      nameField : {
        valid : !!value
      }
    });
  };

  _validateTicket = (event, value) => {
    var re = /INK\-[0-9]+/g;
    this.setState({
      ticketField : {
        valid        : re.test(value),
        errorMessage : value.length ? 'Invalid ticket number' : 'Follow this format: INK-XXXX'
      }
    });
  };

  _submit = () => {
    const { dispatch, data, currentVersion } = this.props;

    const { name, ticket, startDate, startTime, endDate, endTime, version } = this.refs;
    if (name.getValue().length) {
      const startDateObj = startDate.getDate();
      const startTimeObj = startTime.state.time;
      const endDateObj = endDate.getDate();
      const endTimeObj = endTime.state.time;
      const info = {
        Name      : name.getValue(),
        Ticket    : ticket.getValue(),
        Version   : version.getInputNode().innerText.replace('\n', ''),
        StartTime : startDateObj && startTimeObj && `${startDateObj.getFullYear()}-${startDateObj.getMonth() + 1}-${startDateObj.getDate()} ${startTimeObj.getHours()}:${startTimeObj.getMinutes()}`,
        EndTime   : endDateObj && endTimeObj && `${endDateObj.getFullYear()}-${endDateObj.getMonth() + 1}-${endDateObj.getDate()} ${endTimeObj.getHours()}:${endTimeObj.getMinutes()}`
      };
      dispatch((data && data.id) ? updBugBash({
        info           : $.extend(info, { ID: data.id }),
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
    const { nameField, ticketField } = this.state;

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
        disabled = {!nameField.valid || !ticketField.valid}
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
          </div>
          <div style = {styles.halfPanel}>
            Name<br />
            <TextField
              id = 'name'
              ref = 'name'
              defaultValue = {data ? data.info.Name : ''}
              onChange = {this._validateName}
            /><br />
            Main Ticket<br />
            <TextField
              id = 'ticket'
              ref = 'ticket'
              defaultValue = {data ? data.info.Ticket : ''}
              onChange = {this._validateTicket}
              errorText = {ticketField.valid ? null : ticketField.errorMessage}
            /><br />
          </div>
          <div style = {styles.halfPanel}>
            From<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                ref = 'startDate'
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
                defaultDate = {data ? new Date(data.info.StartTime) : new Date()}
                firstDayOfWeek = {0}
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                ref = 'startTime'
                format = '24hr'
                hintText = 'Start Time'
                defaultTime = {data ? new Date(data.info.StartTime) : new Date()}
              />
            </div>
            To<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                ref = 'endDate'
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
                defaultDate = {data ? new Date(data.info.EndTime) : new Date()}
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                ref = 'endTime'
                format = '24hr'
                hintText = 'End Time'
                defaultTime = {data ? new Date(data.info.EndTime) : new Date()}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(EditBugBash);
