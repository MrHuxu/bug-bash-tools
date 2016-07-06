import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import { pink500, orange500, blue500, green500 } from 'material-ui/styles/colors';

class SummaryChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    names    : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      1     : React.PropTypes.number.isRequired,
      2     : React.PropTypes.number.isRequired,
      3     : React.PropTypes.number.isRequired,
      4     : React.PropTypes.number.isRequired,
      score : React.PropTypes.number.isRequired
    })).isRequired
  };

  componentDidUpdate () {
    const { names, infos } = this.props;
    var sum = {1: 0, 2: 0, 3: 0, 4: 0};
    names.forEach(name => {
      sum[1] += infos[name].score[1];
      sum[2] += infos[name].score[2];
      sum[3] += infos[name].score[3];
      sum[4] += infos[name].score[4];
    });
    var canvas = document.getElementById('summary-chart');
    var myChart = new Chart(canvas, {
      type : 'pie',
      data : {
        labels   : ['P1', 'P2', 'P3', 'P4'],
        datasets : [{
          data                 : [sum[1], sum[2], sum[3], sum[4]],
          backgroundColor      : [pink500, orange500, blue500, green500],
          hoverBackgroundColor : [pink500, orange500, blue500, green500]
        }]
      },
      options : {}
    });
  }

  render () {
    return (
      <canvas id = 'summary-chart'></canvas>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    names : state.member.names,
    infos : state.member.infos
  };
};

export default connect(mapStateToProps)(SummaryChart);
