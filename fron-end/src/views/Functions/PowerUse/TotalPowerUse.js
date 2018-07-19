import React, { Component } from 'react';
import { Button, Card, CardBody, Row, Col, CardTitle, ButtonToolbar, ButtonGroup } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import $ from 'jquery';

import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips/dist/cjs/custom-tooltips";


let DayData = [["2018-07-05","2018-07-06","2018-07-07","2018-07-08","2018-07-09","2018-07-10","2018-07-11"],[85,65,67,78,73,81,70]];
let MonthData = [["2018-01","2018-02","2018-03","2018-04","2018-05","2018-06","2018-07"],[2133,2400,2327,2219,2356,2193,2081]];

// let DayData = [[],[]];
// let MonthData = [[],[]];
//
// $.ajax({
//   url:"/fun/getDailyPowerUse",
//   context:document.body,
//   async:false,
//   type:"get",
//   success:function (data) {
//     let tmpDayData = $.parseJSON(data);
//     tmpDayData["power"].forEach((dayData) => {
//       DayData[0].push(dayData["date"]);
//       DayData[1].push(dayData["use"]);
//     });
//   }
// });
//
// $.ajax({
//   url:"/fun/getMonthlyPowerUse",
//   context:document.body,
//   async:false,
//   type:"get",
//   success:function (data) {
//     let tmpMonthData = $.parseJSON(data);
//     tmpMonthData["power"].forEach((monthData) => {
//       MonthData[0].push(monthData["date"]);
//       MonthData[1].push(monthData["use"]);
//     });
//   }
// });

let DayUse = DayData[1].slice();
let MonthUse = MonthData[1].slice();

const line = {
  labels: DayData[0],
  datasets: [
    {
      label: 'Total',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(248,108,107,0.4)',
      borderColor: 'rgba(248,108,107,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(248,108,107,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(248,108,107,1)',
      pointHoverBorderColor: 'rgba(255,193,7,1)',
      pointHoverBorderWidth: 4,
      pointRadius: 3,
      pointHitRadius: 10,
      data: DayData[1],
    },
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};

class TotalPowerUse extends Component {

  constructor() {
    super();
    this.state = {
      radioSelected : 1,
      lineData : line
    }
  }

  onRadioBtnClick = (radioSelected) => {
    this.setState({
      radioSelected : radioSelected,
    });
    if(radioSelected === 1) {
      let oldDataSet = this.state.lineData.datasets[0];
      let newDataSet = {
        ...oldDataSet
      };
      newDataSet.data = DayUse;
      let newLable = DayData[0];
      this.setState({
        lineData : {
          labels : newLable,
          datasets : [newDataSet]
        }
      });
    }
    else {
      let oldDataSet = this.state.lineData.datasets[0];
      let newDataSet = {
        ...oldDataSet
      };
      newDataSet.data = MonthUse;
      let newLable = MonthData[0];
      this.setState({
        lineData : {
          labels : newLable,
          datasets : [newDataSet]
        }
      });
    }
  };

  render() {
    return (
      <div style={{height: 540 + 'px'}}>
      <Card id="tpu">
        <CardBody>
          <Row>
            <Col sm="5">
              <CardTitle className="mb-0">Total Power Use</CardTitle>
            </Col>
            <Col sm="7" className="d-sm-inline-block" style={{marginTop: 5 + 'px'}}>
              <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                  <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)}
                          active={this.state.radioSelected === 1}>Day</Button>
                  <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}>Month</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <div className="chart-wrapper" style={{ height: 400 + 'px', marginTop: 30 + 'px' }}>
            <Line data={this.state.lineData} options={options}/>
          </div>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default TotalPowerUse;
