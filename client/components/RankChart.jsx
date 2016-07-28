import React, { Component } from 'react';
import { connect } from 'react-redux';
import echarts from 'echarts';

class RankChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    names    : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
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

  componentDidUpdate () {
    this.rerenderChart();
  }

  rerenderChart () {
    const { infos } = this.props;
    const names = this.sortedNames();
    var sum = {1: 0, 2: 0, 3: 0, 4: 0};
    names.forEach(name => {
      sum[1] += infos[name].Score.P1;
      sum[2] += infos[name].Score.P2;
      sum[3] += infos[name].Score.P3;
      sum[4] += infos[name].Score.P4;
    });
    var myChart = echarts.init(this.refs.chartContainer);
    var option = {
      tooltip : {
        trigger     : 'axis',
        axisPointer : { type: 'shadow' }
      },
      legend : { data: ['P1', 'P2', 'P3', 'P4'] },
      grid   : {
        bottom       : '25%',
        containLabel : true
      },
      xAxis : [{
        type      : 'category',
        data      : names.slice(0, 35),
        axisLabel : {
          interval : 0,
          rotate   : 60
        }
      }],
      yAxis : [{
        type : 'value'
      }],
      series : [1, 2, 3, 4].map(i => {
        return {
          name  : `P${i}`,
          type  : 'bar',
          stack : 'Score',
          data  : names.slice(0, 35).map(name => infos[name].Score['P' + i])
        };
      })
    };

    myChart.setOption(option);
  }

  sortedNames = () => {
    const { names, infos } = this.props;
    names.sort((name1, name2) => {
      return infos[name1].Score.Sum > infos[name2].Score.Sum ? -1 : 1;
    });

    return names;
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
    names : state.member.names,
    infos : state.member.infos
  };
};

export default connect(mapStateToProps)(RankChart);
