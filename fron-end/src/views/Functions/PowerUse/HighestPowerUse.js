import React, {Component} from 'react';
import {Card, CardBody, Row, Col} from 'reactstrap';
import { Line, Bar } from 'react-chartjs-2';
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips/dist/cjs/custom-tooltips";
import {getStyle} from "@coreui/coreui/dist/js/coreui-utilities";
import $ from 'jquery';

const brandPrimary = getStyle('--primary');
const brandInfo = getStyle('--info');

// let highestUse = [["2018-07-05","2018-06","Light1","Light3"],[128,3577,344,2122]];

let highestUse = [[],[]];

$.ajax({
  url:"/fun/getHighestPowerUse",
  context:document.body,
  async:false,
  type:"get",
  success:function (data) {
    let tmpDayData = $.parseJSON(data);
    tmpDayData["power"].forEach((dayData) => {
      highestUse[0].push(dayData["label"]);
      highestUse[1].push(dayData["use"]);
    });
  }
});

// Card Chart 1
const cardChartData1 = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
};


// Card Chart 2
const cardChartData2 = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

class HighestPowerUse extends Component {
  render() {
    return (
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <div className="text-value">{highestUse[0][0]}</div>
              <div>Use {highestUse[1][0]} this day (most of this year)</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{height: '70px'}}>
              <Line data={cardChartData2} options={cardChartOpts2} height={70}/>
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-primary">
            <CardBody className="pb-0">
              <div className="text-value">{highestUse[0][1]}</div>
              <div>Use {highestUse[1][1]} this month (most of this year)</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <Line data={cardChartData1} options={cardChartOpts1} height={70} />
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-warning">
            <CardBody className="pb-0">
              <div className="text-value">{highestUse[0][2]}</div>
              <div>Use {highestUse[1][2]} this month (most of this month)</div>
            </CardBody>
            <div className="chart-wrapper" style={{ height: '70px' }}>
              <Line data={cardChartData3} options={cardChartOpts3} height={70} />
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-danger">
            <CardBody className="pb-0">
              <div className="text-value">{highestUse[0][3]}</div>
              <div>Use {highestUse[1][3]} in total (most of this year)</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default HighestPowerUse;
