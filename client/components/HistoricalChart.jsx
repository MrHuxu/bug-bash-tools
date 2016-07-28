import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomPieChart from './CustomPieChart';

class HistoricalChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      Tickets : React.PropTypes.arrayOf(React.PropTypes.shape({
        Assignee    : React.PropTypes.string,
        Key         : React.PropTypes.string.isRequired,
        Link        : React.PropTypes.string.isRequired,
        Module      : React.PropTypes.string.isRequired,
        Priority    : React.PropTypes.string.isRequired,
        Status      : React.PropTypes.string.isRequired,
        Summary     : React.PropTypes.string.isRequired,
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
    var sum = 0;
    var historical = {};
    for (var name in infos) {
      var info = infos[name];
      info.Tickets.forEach(ticket => {
        if (ticket.Labels && ticket.Labels.indexOf('historical-debts') !== -1) {
          historical[ticket.Module] = historical[ticket.Module] ? historical[ticket.Module] + 1 : 1;
          ++sum;
        }
      });
    }
    var modules = this.sortKeys(historical);

    return {
      subTitle : `total: ${sum}`,
      data     : modules.length ? modules.map(key => {
        return { value: historical[key], name: `${key} (${historical[key]})` };
      }) : [{ value: 0, name: 'None' }]
    };
  };

  render () {
    return (
      <CustomPieChart
        style = {this.props.style}
        title = 'Historical'
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

export default connect(mapStateToProps)(HistoricalChart);
