import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import $ from "jquery";
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips/dist/cjs/custom-tooltips";
import {getStyle, hexToRgba} from "@coreui/coreui/dist/js/coreui-utilities";
import {
  Card,
  CardBody,
  CardColumns
} from 'reactstrap';


let appsData = [];
let labels = [];
let currentPoints = [];
let voltagePoints = [];
let end_time;
let start_time;

// let currentPoints = [0.2, 0.5, 0.4, 0.3];
// let voltagePoints = [220.2, 220.5, 220.4, 220.3];
// let labels = ["16:07:01 PM", "16:07:06 PM", "16:07:11 PM", "16:07:16 PM"];


class CurrentChart extends Component {

  constructor(props) {
    appsData = [];
    labels = [];
    currentPoints = [];
    super(props);
    end_time = new Date();
    $.ajax({
      type: "GET",
      async: false,
      url: "http://localhost:12333/appliance/request_status",
      data: {"aid": props.aid, "count": props.count, "end_time": end_time},
      success: function (data) {
        appsData = $.parseJSON(data.toString())["status"];
        labels = [];
        currentPoints = [];

        if (appsData.length === props.count) {
          let i = appsData.length - 1;
          for (i; i >= 0; i--) {
            labels.push(appsData[i]["time"].trim().split(" ")[1]);
            currentPoints.push(appsData[i]["current"]);
          }
        }
        else if (appsData.length > 0) {
          start_time = new Date();
          start_time.setTime(end_time.getTime() - 1000 * 5 * props.count);

          let first_element = appsData[appsData.length - 1];
          let first_str = first_element["time"].replace(/-/g, "/");
          let first_element_time = new Date(first_str);

          // //alert("first_element_time: "+first_element_time);

          let last_element = appsData[0];
          let last_str = last_element["time"].replace(/-/g, "/");
          let last_element_time = new Date(last_str);

          // //alert("last_element_time: "+last_element_time);

          //秒数
          let first_difference = Math.abs((first_element_time.getTime() - start_time.getTime()) / 1000);
          // //alert("first_difference: "+first_difference);

          //返回数据从头开始
          if (first_difference < 5) {
            // //alert("first element is the first");
            let i = appsData.length - 1;
            let time;
            time = new Date(appsData[i]["time"].replace(/-/g, "/"));
            for (i; i >= 0; i--) {
              while (!(new Date(appsData[i]["time"].replace(/-/g, "/")).getTime() - time.getTime() <= 1000 * 6)) {
                //alert("next time point is 0! time: " + time+ ", app: "+ new Date(appsData[i]["time"].replace(/-/g,"/")));
                labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
                currentPoints.push(0);
                time.setTime(time.getTime() + 1000 * 5);
              }
              labels.push(appsData[i]["time"].trim().split(" ")[1]);
              //alert("time: "+appsData[i]["time"].trim().split(" ")[1]);
              currentPoints.push(appsData[i]["current"]);
              time = new Date(appsData[i]["time"].replace(/-/g, "/"));

            }
            time = new Date(appsData[0]["time"].replace(/-/g, "/"));
            i = labels.length;
            for (i; i < props.count; i++) {
              time.setTime(time.getTime() + 1000 * 5);
              // //alert("time: "+time);
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              currentPoints.push(0);
            }
          }
          else {
            // //alert("first element is not the first");
            let k = Math.floor(first_difference / 5);
            let time = new Date();
            time.setTime(first_element_time.getTime() - k * 1000 * 5);
            for (k; k > 0; k--) {
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              // //alert("time: "+time);
              currentPoints.push(0);
              time.setTime(time.getTime() + 1000 * 5);
            }
            let i = appsData.length - 1;
            time = new Date(appsData[i]["time"].replace(/-/g, "/"));
            for (i; i >= 0; i--) {
              while (!(new Date(appsData[i]["time"].replace(/-/g, "/")).getTime() - time.getTime() <= 1000 * 6)) {
                //alert("next time point is 0! time: " + time + ", app: "+ new Date(appsData[i]["time"].replace(/-/g,"/")));
                labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
                currentPoints.push(0);
                time.setTime(time.getTime() + 1000 * 5);
              }
              labels.push(appsData[i]["time"].trim().split(" ")[1]);
              //alert("time: "+appsData[i]["time"].trim().split(" ")[1]);
              currentPoints.push(appsData[i]["current"]);
              time = new Date(appsData[i]["time"].replace(/-/g, "/"));

            }
            i = labels.length;
            time = new Date(appsData[0]["time"].replace(/-/g, "/"));
            for (i; i < props.count; i++) {
              time.setTime(time.getTime() + 1000 * 5);
              // //alert("time: "+time);
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              currentPoints.push(0);
            }
          }

        }
        else {
          start_time = new Date();
          start_time.setTime(end_time.getTime() - 1000 * 5 * props.count);
          let time = start_time;
          let i = 0;
          for (i; i < props.count; i++) {
            // //alert("time: "+time);
            labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString());
            currentPoints.push(0);
            time.setTime(time.getTime() + 1000 * 5);
          }
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("！！！!");
        //alert(jqXHR);
        //alert(textStatus);
        //alert(errorThrown);
      }
    });

    // appsData = [{"time": "2018-07-16 13:35:07.0", "current": 0.2, "voltage": 220.0}, {
    //   "time": "2018-07-16 13:35:02.0",
    //   "current": 0.2,
    //   "voltage": 220.0
    // }, {"time": "2018-07-16 13:34:57.0", "current": 0.2, "voltage": 220.0}, {
    //   "time": "2018-07-16 13:34:52.0",
    //   "current": 0.2,
    //   "voltage": 220.0
    // }, {"time": "2018-07-16 13:34:47.0", "current": 0.2, "voltage": 220.0}, {
    //   "time": "2018-07-16 13:34:42.0",
    //   "current": 0.2,
    //   "voltage": 220.0
    // }, {"time": "2018-07-16 13:34:37.0", "current": 0.2, "voltage": 220.0}, {
    //   "time": "2018-07-16 13:34:30.0",
    //   "current": 0.2,
    //   "voltage": 220.0
    // }, {"time": "2018-07-16 11:41:26.0", "current": 0.2, "voltage": 220.0}, {
    //   "time": "2018-07-16 11:41:21.0",
    //   "current": 0.2,
    //   "voltage": 220.0
    // }];
    // let i = appsData.length - 1;
    // for (i; i > 0; i--) {
    //   labels.push(appsData[i]["time"].trim().split(" ")[1]);
    //   currentPoints.push(appsData[i]["current"]);
    //   voltagePoints.push(appsData[i]["voltage"]);
    // }
    // //alert(labels);
    // //alert(currentPoints);
    // //alert(voltagePoints);
    this.state = {
      aid: props.aid,
      count: props.count,
      cdata: {
        labels: labels,
        datasets: [
          {
            label: 'Current',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(251,227,48,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(251,227,48,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            scaleShowGridLines: true,
            data: currentPoints,
            // yAxisID: 'id1',
          },
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };

  }

  flush() {
    end_time = new Date();
    $.ajax({
      type: "GET",
      async: false,
      url: "http://localhost:12333/appliance/request_status",
      data: {"aid": this.state.aid, "count": this.state.count, "end_time": end_time},
      success: (data) => {
        appsData = $.parseJSON(data.toString())["status"];
        labels = [];
        currentPoints = [];

        if (appsData.length === this.state.count) {
          let i = appsData.length - 1;
          for (i; i >= 0; i--) {
            labels.push(appsData[i]["time"].trim().split(" ")[1]);
            currentPoints.push(appsData[i]["current"]);
          }
        }
        else if (appsData.length > 0) {
          start_time = new Date();
          start_time.setTime(end_time.getTime() - 1000 * 5 * this.state.count);

          let first_element = appsData[appsData.length - 1];
          let first_str = first_element["time"].replace(/-/g, "/");
          let first_element_time = new Date(first_str);

          //alert("first_element_time: "+first_element_time);

          let last_element = appsData[0];
          let last_str = last_element["time"].replace(/-/g, "/");
          let last_element_time = new Date(last_str);

          //alert("last_element_time: "+last_element_time);

          //秒数
          let first_difference = Math.abs((first_element_time.getTime() - start_time.getTime()) / 1000);
          //alert("first_difference: "+first_difference);

          //返回数据从头开始
          if (first_difference < 5) {
            //alert("first element is the first");
            let i = appsData.length - 1;
            let time;
            time = new Date(appsData[i]["time"].replace(/-/g, "/"));
            for (i; i >= 0; i--) {
              while (!(new Date(appsData[i]["time"].replace(/-/g, "/")).getTime() - time.getTime() <= 1000 * 6)) {
                //alert("next time point is 0! time: " + time+ ", app: "+ new Date(appsData[i]["time"].replace(/-/g,"/")));
                labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
                currentPoints.push(0);
                time.setTime(time.getTime() + 1000 * 5);
              }
              labels.push(appsData[i]["time"].trim().split(" ")[1]);
              //alert("time: " + appsData[i]["time"].trim().split(" ")[1]);
              currentPoints.push(appsData[i]["current"]);
              time = new Date(appsData[i]["time"].replace(/-/g, "/"));

            }
            time = new Date(appsData[0]["time"].replace(/-/g, "/"));
            i = labels.length;
            for (i; i < this.state.count; i++) {
              time.setTime(time.getTime() + 1000 * 5);
              //alert("time: "+time);
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              currentPoints.push(0);
            }
          }
          else {
            //alert("first element is not the first");
            let k = Math.floor(first_difference / 5);
            let time = new Date();
            time.setTime(first_element_time.getTime() - k * 1000 * 5);
            for (k; k > 0; k--) {
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              //alert("time: "+time);
              currentPoints.push(0);
              time.setTime(time.getTime() + 1000 * 5);
            }
            let i = appsData.length - 1;
            time = new Date(appsData[i]["time"].replace(/-/g, "/"));
            for (i; i >= 0; i--) {
              while (!(new Date(appsData[i]["time"].replace(/-/g, "/")).getTime() - time.getTime() <= 1000 * 6)) {
                //alert("next time point is 0! time: " + time+ ", app: "+ new Date(appsData[i]["time"].replace(/-/g,"/")));
                labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
                currentPoints.push(0);
                time.setTime(time.getTime() + 1000 * 5);
              }
              labels.push(appsData[i]["time"].trim().split(" ")[1]);
              //alert("time: "+appsData[i]["time"].trim().split(" ")[1]);
              currentPoints.push(appsData[i]["current"]);
              time = new Date(appsData[i]["time"].replace(/-/g, "/"));

            }
            i = labels.length;
            time = new Date(appsData[0]["time"].replace(/-/g, "/"));
            for (i; i < this.state.count; i++) {
              time.setTime(time.getTime() + 1000 * 5);
              // //alert("time: "+time);
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              currentPoints.push(0);
            }
          }

        }
        else {
          start_time = new Date();
          start_time.setTime(end_time.getTime() - 1000 * 5 * this.state.count);
          let time = start_time;
          let i = 0;
          for (i; i < this.state.count; i++) {
            ////alert("time: "+time);
            labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString());
            currentPoints.push(0);
            time.setTime(time.getTime() + 1000 * 5);
          }
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("！！！!");
        alert(jqXHR);
        alert(textStatus);
        alert(errorThrown);
      }.bind(this)
    });

    this.setState({
      cdata: {
        labels: labels,
        datasets: [
          {
            label: 'Current',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(251,227,48,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(251,227,48,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            scaleShowGridLines: true,
            data: currentPoints,
            // yAxisID: 'id1',
          },
        ]
      }
    })
  };


  componentDidMount() {
    this.timerID = setInterval(() => this.flush(), 5000);
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  render() {
    let style = {
      width: "102%",
      height: "100%",
      backgroundColor: "white"
    };
    return (
      <div style={style}>
        <Line data={this.state.cdata} options={this.state.options} width={400} height={300}/>
      </div>
    )
  }

}

class VoltageChart extends Component {

  constructor(props) {
    appsData = [];
    labels = [];
    voltagePoints = [];
    super(props);
    end_time = new Date();
    $.ajax({
      type: "GET",
      async: false,
      url: "http://localhost:12333/appliance/request_status",
      data: {"aid": props.aid, "count": props.count, "end_time": end_time},
      success: function (data) {
        appsData = $.parseJSON(data.toString())["status"];
        labels = [];
        voltagePoints = [];

        if (appsData.length === props.count) {
          let i = appsData.length - 1;
          for (i; i >= 0; i--) {
            labels.push(appsData[i]["time"].trim().split(" ")[1]);
            voltagePoints.push(appsData[i]["voltage"]);
          }
        }
        else if (appsData.length > 0) {
          start_time = new Date();
          start_time.setTime(end_time.getTime() - 1000 * 5 * props.count);

          let first_element = appsData[appsData.length - 1];
          let first_str = first_element["time"].replace(/-/g, "/");
          let first_element_time = new Date(first_str);

          // //alert("first_element_time: "+first_element_time);

          let last_element = appsData[0];
          let last_str = last_element["time"].replace(/-/g, "/");
          let last_element_time = new Date(last_str);

          // //alert("last_element_time: "+last_element_time);

          //秒数
          let first_difference = Math.abs((first_element_time.getTime() - start_time.getTime()) / 1000);
          // //alert("first_difference: "+first_difference);

          //返回数据从头开始
          if (first_difference < 5) {
            // //alert("first element is the first");
            let i = appsData.length - 1;
            let time;
            time = new Date(appsData[i]["time"].replace(/-/g, "/"));
            for (i; i >= 0; i--) {
              while (!(new Date(appsData[i]["time"].replace(/-/g, "/")).getTime() - time.getTime() <= 1000 * 6)) {
                //alert("next time point is 0! time: " + time+ ", app: "+ new Date(appsData[i]["time"].replace(/-/g,"/")));
                labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
                voltagePoints.push(0);
                time.setTime(time.getTime() + 1000 * 5);
              }
              labels.push(appsData[i]["time"].trim().split(" ")[1]);
              //alert("time: "+appsData[i]["time"].trim().split(" ")[1]);
              voltagePoints.push(appsData[i]["voltage"]);
              time = new Date(appsData[i]["time"].replace(/-/g, "/"));

            }
            time = new Date(appsData[0]["time"].replace(/-/g, "/"));
            i = labels.length;
            for (i; i < props.count; i++) {
              time.setTime(time.getTime() + 1000 * 5);
              // //alert("time: "+time);
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              voltagePoints.push(0);
            }
          }
          else {
            // //alert("first element is not the first");
            let k = Math.floor(first_difference / 5);
            let time = new Date();
            time.setTime(first_element_time.getTime() - k * 1000 * 5);
            for (k; k > 0; k--) {
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              // //alert("time: "+time);
              voltagePoints.push(0);
              time.setTime(time.getTime() + 1000 * 5);
            }
            let i = appsData.length - 1;
            time = new Date(appsData[i]["time"].replace(/-/g, "/"));
            for (i; i >= 0; i--) {
              while (!(new Date(appsData[i]["time"].replace(/-/g, "/")).getTime() - time.getTime() <= 1000 * 6)) {
                //alert("next time point is 0! time: " + time + ", app: "+ new Date(appsData[i]["time"].replace(/-/g,"/")));
                labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
                voltagePoints.push(0);
                time.setTime(time.getTime() + 1000 * 5);
              }
              labels.push(appsData[i]["time"].trim().split(" ")[1]);
              //alert("time: "+appsData[i]["time"].trim().split(" ")[1]);
              voltagePoints.push(appsData[i]["voltage"]);
              time = new Date(appsData[i]["time"].replace(/-/g, "/"));

            }
            i = labels.length;
            time = new Date(appsData[0]["time"].replace(/-/g, "/"));
            for (i; i < props.count; i++) {
              time.setTime(time.getTime() + 1000 * 5);
              // //alert("time: "+time);
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              voltagePoints.push(0);
            }
          }

        }
        else {
          start_time = new Date();
          start_time.setTime(end_time.getTime() - 1000 * 5 * props.count);
          let time = start_time;
          let i = 0;
          for (i; i < props.count; i++) {
            // //alert("time: "+time);
            labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString());
            voltagePoints.push(0);
            time.setTime(time.getTime() + 1000 * 5);
          }
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("！！！!");
        alert(jqXHR);
        alert(textStatus);
        alert(errorThrown);
      }
    });

    this.state = {
      aid: props.aid,
      count: props.count,
      vdata: {
        labels: labels,
        datasets: [
          {
            label: 'Voltage',
            fill: false,
            backgroundColor: 'rgba(251,227,48,0.4)',
            borderColor: 'rgba(251,227,48,0.4)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            scaleShowGridLines: true,
            data: voltagePoints,
            // yAxisID: 'id2',
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };

  }

  flush() {
    end_time = new Date();
    $.ajax({
      type: "GET",
      async: false,
      url: "http://localhost:12333/appliance/request_status",
      data: {"aid": this.state.aid, "count": this.state.count, "end_time": end_time},
      success: (data) => {
        appsData = $.parseJSON(data.toString())["status"];
        labels = [];
        voltagePoints = [];

        if (appsData.length === this.state.count) {
          let i = appsData.length - 1;
          for (i; i >= 0; i--) {
            labels.push(appsData[i]["time"].trim().split(" ")[1]);
            voltagePoints.push(appsData[i]["voltage"]);
          }
        }
        else if (appsData.length > 0) {
          start_time = new Date();
          start_time.setTime(end_time.getTime() - 1000 * 5 * this.state.count);

          let first_element = appsData[appsData.length - 1];
          let first_str = first_element["time"].replace(/-/g, "/");
          let first_element_time = new Date(first_str);

          //alert("first_element_time: "+first_element_time);

          let last_element = appsData[0];
          let last_str = last_element["time"].replace(/-/g, "/");
          let last_element_time = new Date(last_str);

          //alert("last_element_time: "+last_element_time);

          //秒数
          let first_difference = Math.abs((first_element_time.getTime() - start_time.getTime()) / 1000);
          //alert("first_difference: "+first_difference);

          //返回数据从头开始
          if (first_difference < 5) {
            //alert("first element is the first");
            let i = appsData.length - 1;
            let time;
            time = new Date(appsData[i]["time"].replace(/-/g, "/"));
            for (i; i >= 0; i--) {
              while (!(new Date(appsData[i]["time"].replace(/-/g, "/")).getTime() - time.getTime() <= 1000 * 6)) {
                //alert("next time point is 0! time: " + time+ ", app: "+ new Date(appsData[i]["time"].replace(/-/g,"/")));
                labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
                voltagePoints.push(0);
                time.setTime(time.getTime() + 1000 * 5);
              }
              labels.push(appsData[i]["time"].trim().split(" ")[1]);
              //alert("time: " + appsData[i]["time"].trim().split(" ")[1]);
              voltagePoints.push(appsData[i]["voltage"]);
              time = new Date(appsData[i]["time"].replace(/-/g, "/"));

            }
            time = new Date(appsData[0]["time"].replace(/-/g, "/"));
            i = labels.length;
            for (i; i < this.state.count; i++) {
              time.setTime(time.getTime() + 1000 * 5);
              //alert("time: "+time);
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              voltagePoints.push(0);
            }
          }
          else {
            //alert("first element is not the first");
            let k = Math.floor(first_difference / 5);
            let time = new Date();
            time.setTime(first_element_time.getTime() - k * 1000 * 5);
            for (k; k > 0; k--) {
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              //alert("time: "+time);
              voltagePoints.push(0);
              time.setTime(time.getTime() + 1000 * 5);
            }
            let i = appsData.length - 1;
            time = new Date(appsData[i]["time"].replace(/-/g, "/"));
            for (i; i >= 0; i--) {
              while (!(new Date(appsData[i]["time"].replace(/-/g, "/")).getTime() - time.getTime() <= 1000 * 6)) {
                //alert("next time point is 0! time: " + time+ ", app: "+ new Date(appsData[i]["time"].replace(/-/g,"/")));
                labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
                voltagePoints.push(0);
                time.setTime(time.getTime() + 1000 * 5);
              }
              labels.push(appsData[i]["time"].trim().split(" ")[1]);
              //alert("time: "+appsData[i]["time"].trim().split(" ")[1]);
              voltagePoints.push(appsData[i]["voltage"]);
              time = new Date(appsData[i]["time"].replace(/-/g, "/"));

            }
            i = labels.length;
            time = new Date(appsData[0]["time"].replace(/-/g, "/"));
            for (i; i < this.state.count; i++) {
              time.setTime(time.getTime() + 1000 * 5);
              // //alert("time: "+time);
              labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString() + "." + time.getMilliseconds());
              voltagePoints.push(0);
            }
          }

        }
        else {
          start_time = new Date();
          start_time.setTime(end_time.getTime() - 1000 * 5 * this.state.count);
          let time = start_time;
          let i = 0;
          for (i; i < this.state.count; i++) {
            ////alert("time: "+time);
            labels.push(time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString());
            voltagePoints.push(0);
            time.setTime(time.getTime() + 1000 * 5);
          }
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        //alert("！！！!");
        // //alert(jqXHR);
        // //alert(textStatus);
        // //alert(errorThrown);
      }.bind(this)
    });

    this.setState({
      vdata: {
        labels: labels,
        datasets: [
          {
            label: 'Voltage',
            fill: false,
            backgroundColor: 'rgba(251,227,48,0.4)',
            borderColor: 'rgba(251,227,48,0.4)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            scaleShowGridLines: true,
            data: voltagePoints,
            // yAxisID: 'id2',
          }
        ]
      },
    })
  };


  componentDidMount() {
    this.timerID = setInterval(() => this.flush(), 5000);
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  render() {
    let style = {
      width: "102%",
      height: "100%",
      backgroundColor: "white"
    };
    return (
      <div style={style}>
        <Line data={this.state.vdata} options={this.state.options} width={400} height={300}/>
      </div>
    );
  }

}

export {CurrentChart, VoltageChart};
