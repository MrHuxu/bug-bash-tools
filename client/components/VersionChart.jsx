import React, { Component } from 'react';
import { connect } from 'react-redux';
import echarts from 'echarts';

class VersionChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      tickets : React.PropTypes.arrayOf(React.PropTypes.shape({
        assignee : React.PropTypes.string,
        link     : React.PropTypes.string.isRequired,
        module   : React.PropTypes.string.isRequired,
        priority : React.PropTypes.string.isRequired,
        status   : React.PropTypes.string.isRequired,
        summary  : React.PropTypes.string.isRequired,
        ticket   : React.PropTypes.string.isRequired,
        labels   : React.PropTypes.arrayOf(React.PropTypes.string).isRequired
      })).isRequired,
      score : React.PropTypes.shape({
        1   : React.PropTypes.number.isRequired,
        2   : React.PropTypes.number.isRequired,
        3   : React.PropTypes.number.isRequired,
        4   : React.PropTypes.number.isRequired,
        sum : React.PropTypes.number.isRequired
      }).isRequired
    })).isRequired
  };

  componentDidUpdate () {
    this.rerenderChart();
  }

  sortKeys = (data) => {
    var keys = Object.keys(data);
    return keys.sort((key1, key2) => data[key1] > data[key2] ? -1 : 1);
  };

  rerenderChart = () => {
    const { infos } = this.props;
    var fixVersion = { "Won't Fix": 0 };
    for (var name in infos) {
      var info = infos[name];
      info.tickets.forEach(ticket => {
        if ("Won't Fix" === ticket.resolution) {
          ++fixVersion["Won't Fix"];
        } else {
          ticket.fixVersions.forEach(version => {
            fixVersion[version] = fixVersion[version] ? fixVersion[version] + 1 : 1;
          });
        }
      });
    }
    var versions = this.sortKeys(fixVersion);
    var myChart = echarts.init(this.refs.chartContainer);
    var option =  {
      title : {
        text         : 'Fix Version',
        subtext      : `Won't Fix: ${fixVersion["Won't Fix"]}`,
        x            : 'center',
        subtextStyle : {
          color : '#888'
        }
      },
      tooltip : {
        trigger   : 'item',
        formatter : '{b} : {c} ({d}%)'
      },
      series : [{
        type   : 'pie',
        radius : '55%',
        center : ['50%', '60%'],
        data   : versions.length ? versions.map(key => {
          return { value: fixVersion[key], name: `${key} (${fixVersion[key]})` };
        }) : [{ value: 0, name: 'None' }],
        itemStyle : {
          emphasis : {
            shadowBlur    : 10,
            shadowOffsetX : 0,
            shadowColor   : 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    myChart.setOption(option);
  };

  render () {
    return (
      <div
        ref = 'chartContainer'
        style = {this.props.style}>
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    infos : state.member.infos
  };
};

export default connect(mapStateToProps)(VersionChart);
