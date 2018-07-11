import React, { Component } from 'react';

import { Button, Card, CardBody, CardColumns, Row, Col, CardTitle, ButtonToolbar, ButtonGroup } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import $ from 'jquery';

import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips/dist/cjs/custom-tooltips";

let DayData = [[],[]];
let MonthData = [[],[]];
const line1 = {
  labels: DayData[0],
  datasets: [
    {
      label: 'Total',
      fill: false,
      lineTension: 0.1,
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
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: DayData[1],

    },
  ],
};


const line2 = {
  labels: MonthData[0],
  datasets: [
    {
      label: 'Total',
      fill: false,
      lineTension: 0.1,
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
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: MonthData[1],
    },
  ],
};

const options1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};
const options2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};


class PowerUse extends Component {

  constructor() {
    super();
    this.state = {
      radioSelected : 1
    }
  }
  onRadioBtnClick = (radioSelected) => {
    this.setState({
      radioSelected: radioSelected,
    });
  };
  render() {
    DayData=[[],[]];
    MonthData=[[],[]];
    if(this.state.radioSelected === 1) {
      $.ajax({
        url:"/fun/getDailyPowerUse",
        context:document.body,
        async:false,
        type:"get",
        success:function (data) {
          let tmpDayData = $.parseJSON(data);
          tmpDayData["power"].forEach((dayData) => {
            DayData[0].push(dayData["date"]);
            DayData[1].push(dayData["use"]);
          });
        }
      });
      return (
        <div className="animated fadeIn">
          <CardColumns className="cols-2">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Power Use</CardTitle>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
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
                <div className="chart-wrapper">
                  <Line data={line1} options={options1}/>
                </div>
              </CardBody>
            </Card>
          </CardColumns>
        </div>
      );
    }
    $.ajax({
      url:"/fun/getMonthlyPowerUse",
      context:document.body,
      async:false,
      type:"get",
      success:function (data) {
        let tmpMonthData = $.parseJSON(data);
        tmpMonthData["power"].forEach((monthData) => {
          MonthData[0].push(monthData["date"]);
          MonthData[1].push(monthData["use"]);
        });
      }
    });
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            <CardBody>
              <Row>
                <Col sm="5">
                  <CardTitle className="mb-0">Power Use</CardTitle>
                </Col>
                <Col sm="7" className="d-none d-sm-inline-block">
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
              <div className="chart-wrapper">
                <Line data={line2} options={options2}/>
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}


export default PowerUse;

