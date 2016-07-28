import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomPieChart from './CustomPieChart';

class VersionChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      Tickets : React.PropTypes.arrayOf(React.PropTypes.shape({
        Assignee    : React.PropTypes.string,
        Link        : React.PropTypes.string.isRequired,
        Priority    : React.PropTypes.string.isRequired,
        Status      : React.PropTypes.string.isRequired,
        Summary     : React.PropTypes.string.isRequired,
        Key         : React.PropTypes.string.isRequired,
        Labels      : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        FixVersions : React.PropTypes.arrayOf(React.PropTypes.string).isRequired
      })).isRequired,
      Score : React.PropTypes.shape({
        P1         : React.PropTypes.number.isRequired,
        P2         : React.PropTypes.number.isRequired,
        P3         : React.PropTypes.number.isRequired,
        P4         : React.PropTypes.number.isRequired,
        Historical : React.PropTypes.number.isRequired,
        Sum        : React.PropTypes.number.isRequired
      }).isRequired
    })).isRequired
  };

  sortKeys = (data) => {
    var keys = Object.keys(data);
    return keys.sort((key1, key2) => data[key1] > data[key2] ? -1 : 1);
  };

  getData = () => {
    const { infos } = this.props;
    var noVersion = 0;
    var fixVersion = { "Won't Fix": 0 };
    for (var name in infos) {
      var info = infos[name];
      info.Tickets.forEach(ticket => {
        if ("Won't Fix" === ticket.resolution) {
          ++fixVersion["Won't Fix"];
        } else if (ticket.FixVersions && ticket.FixVersions.length) {
          ticket.FixVersions.forEach(version => {
            fixVersion[version] = fixVersion[version] ? fixVersion[version] + 1 : 1;
          });
        } else {
          ++noVersion;
        }
      });
    }
    var versions = this.sortKeys(fixVersion);

    return {
      subTitle : `No version info: ${noVersion}`,
      data     : versions.length ? versions.map(key => {
        return { value: fixVersion[key], name: `${key} (${fixVersion[key]})` };
      }) : [{ value: 0, name: 'None' }]
    };
  };

  render () {
    return (
      <CustomPieChart
        style = {this.props.style}
        title = 'Fix Version'
        subTitle = {this.getData().subTitle}
        data = {this.getData().data}
      />
    );
  }
}

var mapStateToProps = (state) => {
  return {
    infos : state.member.infos
  };
};

export default connect(mapStateToProps)(VersionChart);
