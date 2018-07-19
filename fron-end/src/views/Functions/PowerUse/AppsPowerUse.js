import React, {Component} from 'react';
import {Button, Card, CardBody, Row, Col, CardTitle, ButtonToolbar, ButtonGroup, Input} from 'reactstrap';
import {Pie} from 'react-chartjs-2';
import $ from 'jquery';

let Now = new Date();
Now.setTime(Now.getTime() - 24*60*60*1000);
const date = Now.getFullYear() + "-" + (Now.getMonth() < 9 ? "0" : "") + (Now.getMonth() + 1) + "-" + (Now.getDate() < 10 ? "0" : "") + (Now.getDate());
const month = Now.getFullYear() + "-" + (Now.getMonth() < 9 ? "0" : "") + (Now.getMonth() + 1);

let DayData = [["light1","light2","light3","light4"],[8,12,4,7]];
let MonthData = [["light1","light2","light3","light4"],[198,224,137,127]];

// let DayData = [[],[]];
// let MonthData = [[],[]];
//
// $.ajax({
//   url:"/fun/getDailyAppsPowerUse",
//   data:{
//     date : date
//   },
//   context:document.body,
//   async:false,
//   type:"get",
//   success:function (data) {
//     let tmpDayData = $.parseJSON(data);
//     tmpDayData["power"].forEach((dayData) => {
//       DayData[0].push(dayData["appname"]);
//       DayData[1].push(dayData["use"]);
//     });
//   }
// });
// $.ajax({
//   url:"/fun/getMonthlyAppsPowerUse",
//   data:{
//     month : month
//   },
//   context:document.body,
//   async:false,
//   type:"get",
//   success:function (data) {
//     let tmpMonthData = $.parseJSON(data);
//     tmpMonthData["power"].forEach((monthData) => {
//       MonthData[0].push(monthData["appname"]);
//       MonthData[1].push(monthData["use"]);
//     });
//   }
// });

let DayUse = DayData[1].slice();
let MonthUse = MonthData[1].slice();

const Colors = ["#20a8d8","#f86c6b","#4dbd74","#ffc107","#6f42c1","#63c2de","#20c997","#f8cb00","#e83e8c","#6610f2","#17a2b8"];
let colors = [];
for(let i = 0; i < MonthUse.length; i++) {
  let j = i;
  while(j >= Colors.length) {
    j -= Colors.length;
  }
  colors.push(Colors[j]);
}

const options = {
  responsive: true
};
const pie = {
  labels: DayData[0],
  datasets: [
    {
      data: DayData[1],
      backgroundColor: colors,
      hoverBackgroundColor: colors,
    }]
};

class AppsPowerUse extends Component {
  constructor() {
    super();
    this.state = {
      radioSelected : 1,
      date : date,
      month : month,
      pie : pie,
      // pieHeight: 100
    };
  }

  // componentDidMount(){
  //   let pie = document.getElementById("pie");
  //   let apu = document.getElementById("apu");
  //   alert(pie.offsetHeight+", "+ apu.offsetHeight);
  //   this.setState({
  //     pieHeight:apu.offsetHeight*0.07
  //   });
  // }

  onRadioBtnClick = (radioSelected) => {
    this.setState({
      radioSelected: radioSelected,
    });
    if(radioSelected === 1) {
      let oldPie = this.state.pie.datasets[0];
      let newPie = {
        ...oldPie
      };
      newPie.data = DayUse;
      let newLable = DayData[0];
      this.setState({
        pie : {
          labels : newLable,
          datasets : [newPie]
        }
      });
    }
    else {
      let oldPie = this.state.pie.datasets[0];
      let newPie = {
        ...oldPie
      };
      newPie.data = MonthUse;
      let newLable = MonthData[0];
      this.setState({
        pie : {
          labels : newLable,
          datasets : [newPie]
        }
      });
    }
  };

  changeDate = (e) => {
    let newDate = e.target.value;
    this.setState({date : newDate});
  };

  changeMonth = (e) => {
    let newMonth = e.target.value;
    this.setState({month : newMonth});
  };

  getDayUse = () => {
    // $.ajax({
    //   url:"/fun/getDailyAppsPowerUse",
    //   data:{
    //     date : this.state.date
    //   },
    //   context:document.body,
    //   async:false,
    //   type:"get",
    //   success:function (data) {
    //     let tmpDayData = $.parseJSON(data);
    //     let newDayData = [];
    //     tmpDayData["power"].forEach((dayData) => {
    //       newDayData.push(dayData["use"]);
    //     });
    //     DayUse = newDayData.slice();
    //   }
    // });
    let oldPie = this.state.pie.datasets[0];
    let newPie = {
      ...oldPie
    };
    newPie.data = DayUse;
    let newLable = DayData[0];
    this.setState({
      pie : {
        labels : newLable,
        datasets : [newPie]
      }
    });
  };

  getMonthUse = () => {
    // $.ajax({
    //   url:"/fun/getMonthlyAppsPowerUse",
    //   data:{
    //     month : this.state.month
    //   },
    //   context:document.body,
    //   async:false,
    //   type:"get",
    //   success:function (data) {
    //     let tmpMonthData = $.parseJSON(data);
    //     let newMonthData = [];
    //     tmpMonthData["power"].forEach((monthData) => {
    //       newMonthData.push(monthData["use"]);
    //     });
    //     MonthUse = newMonthData.slice();
    //   }
    // });
    let oldPie = this.state.pie.datasets[0];
    let newPie = {
      ...oldPie
    };
    newPie.data = MonthUse;
    let newLable = MonthData[0];
    this.setState({
      pie : {
        labels : newLable,
        datasets : [newPie]
      }
    });
  };

  render() {
    return (
      <div style={{height: '160px'}}>
      <Card id="apu">
        <CardBody>
          <Row>
            <Col sm="4">
              <CardTitle className="mb-0">Appliances Power Use</CardTitle>
            </Col>
            <Col sm="4" className="d-none d-sm-inline-block">
              <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                  <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)}
                          active={this.state.radioSelected === 1}>Day</Button>
                  <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}>Month</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
            {(this.state.radioSelected === 1) ?
              <Col sm="4">
                <Row>
                  <Col sm="9">
                    <Input type="date" name="date-input" value={this.state.date} onChange={this.changeDate} placeholder={date}/>
                  </Col>
                  <Col sm="3">
                    <Button color="outline-secondary" onClick={this.getDayUse}>OK</Button>
                  </Col>
                </Row>
              </Col>
              :
              <Col sm="4">
                <Row>
                  <Col sm="9">
                    <Input type="month" name="date-input" value={this.state.month} onChange={this.changeMonth} placeholder={month} />
                  </Col>
                  <Col sm="3">
                    <Button color="outline-secondary" onClick={this.getMonthUse}>OK</Button>
                  </Col>
                </Row>
              </Col>
            }
          </Row>
          <div className="chart-wrapper" id="pie">
            <Pie data={this.state.pie} options={options} height={this.state.pieHeight} />
          </div>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default AppsPowerUse;
