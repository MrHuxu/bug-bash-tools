import React, { Component } from 'react';
import { connect } from 'react-redux';
import echarts from 'echarts';

class RankChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    names    : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      tickets : React.PropTypes.arrayOf(React.PropTypes.shape({
        assignee : React.PropTypes.string,
        link     : React.PropTypes.string.isRequired,
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

  rerenderChart () {
    const { infos } = this.props;
    const names = this.sortedNames();
    var sum = {1: 0, 2: 0, 3: 0, 4: 0};
    names.forEach(name => {
      sum[1] += infos[name].score[1];
      sum[2] += infos[name].score[2];
      sum[3] += infos[name].score[3];
      sum[4] += infos[name].score[4];
    });
    var myChart = echarts.init(this.refs.chartContainer);
    var option = {
      tooltip : {
        trigger     : 'axis',
        axisPointer : { type: 'shadow' }
      },
      legend : { data: ['P1', 'P2', 'P3', 'P4'] },
      grid   : {
        bottom       : '15%',
        containLabel : true
      },
      xAxis : [{
        type      : 'category',
        data      : names.slice(0, 40),
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
          data  : names.slice(0, 40).map(name => infos[name].score[i])
        };
      })
    };

    myChart.setOption(option);
  }

  sortedNames = () => {
    const { names, infos } = this.props;
    names.sort((name1, name2) => {
      return infos[name1].score.sum > infos[name2].score.sum ? -1 : 1;
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
