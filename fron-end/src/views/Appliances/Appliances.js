import React, {Component} from 'react';
import {Button, Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {Link} from 'react-router-dom';

import {Bar, Line} from 'react-chartjs-2';
import $ from '../../../node_modules/jquery/dist/jquery.js'
import {AppSwitch} from '@coreui/react';
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips/dist/cjs/custom-tooltips";
import {getStyle} from '@coreui/coreui/dist/js/coreui-utilities';
import Appliance from "./Appliance.js"

require('../../css/self.css');
require('../../css/style.css');
require('./jquery.textfill.js');
//

// let appsData = [{"id":1, "status":"Active"},{"id":3, "status": "Inactive"}];
// let index;


const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');


let jobsData = [{
  "id": 1,
  "Status": "Pending",
  "Appliance": "app1",
  "Duration": "100",
  "Start after": "2018-12-03T15:33",
  "Finish by": 456
},
  {"id": 3, "status": "Running", "app_name": "app3", "duration": "1h"}];

const gesture_list = ['none', 'thumb_up', 'heart_d', 'victory'];
const gesture_show = ['None', 'Thumb up', 'Heart with two fingers', 'Victory'];

const getBadge = (status) => {
  return status === 'Active' ? 'success' :
    status === 'Inactive' ? 'secondary' :
      status === 'Pending' ? 'warning' :
        status === 'Banned' ? 'danger' :
          'primary'
};
let appsData;
let angleStart = -360;
let ColorScheme = [["#3c5e79", "#F9F7EC", "#187da0", "cadetblue", "primary"],
  ["#3c5e79", "#F9F7EC", "#187da0", "cadetblue", "primary"],
  ["#bed371", "#F9F7EC", "#d6e973", "#d6e973", "success"],
  ["#bed371", "#F9F7EC", "#d6e973", "#d6e973", "success"],
  ["#f6b3a9", "#F9F7EC", "#f8d3b9", "#f8d6c5", "danger"],
  ["#f6b3a9", "#F9F7EC", "#f8d3b9", "#f8d6c5", "danger"]];
let cardChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [Math.random() * (5 - 0 + 1), Math.random() * (20 - 13 + 1) + 13, Math.random() * (15 - 6 + 1) + 6, Math.random() * (24 - 13 + 1) + 13, Math.random() * (37 - 2 + 1) + 2, Math.random() * (24 - 21 + 1) + 21, Math.random() * (44 - 9 + 1) + 9],
    },
  ],
};
let cardChartOpts = {
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
          min: Math.min.apply(Math, cardChartData.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 2,
      hitRadius: 3,
      hoverRadius: 3,
    },
  },
};

// class ApplianceRow extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       appliance: this.props.appliance,
//       appLink: '/main/apps/' + this.props.appliance.id
//     };
//     this.switch_status = this.switch_status.bind(this)
//
//   }
//
//   switch_status(e) {
//     let a_id = this.props.appliance.id;
//     e.target.disabled = 1;
//     let opt = e.target.checked ? "on" : "off";
//     let ret_val = "Error with connection";
//     // alert("a_id: "+a_id + "opt: "+opt);
//     $.ajax({
//       type: "GET",
//       async: false,
//       url: "http://localhost:12333/appliance/switch_appliance",
//       data: {aid: a_id, option: opt},
//       success: function (data) {
//         ret_val = data;
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//         alert("！！！!");
//         alert(jqXHR);
//         alert(textStatus);
//         alert(errorThrown);
//       }
//     });
//     if (ret_val === "success") {
//       this.props.reload();
//     }
//     else {
//       alert(ret_val);
//       e.target.checked = 1 - e.target.checked;
//     }
//     e.target.disabled = 0;
//   };
//
//   render() {
//
//     return (
//       <tr key={this.state.appliance.id.toString()}>
//         <th scope="row"><Link to={this.state.appLink}>{this.state.appliance["id"]}</Link></th>
//         <td><Link to={this.state.appLink}>{this.state.appliance["name"]}</Link></td>
//         <td>{this.state.appliance["status"]}</td>
//         <td>{this.state.appliance["updated"]}</td>
//         <td>
//           <AppSwitch checked={this.state.appliance["status"] === "Active"} onClick={this.switch_status}
//                      className={'mx-1'} variant={'3d'} outline={'alt'} color={'primary'} label/>
//         </td>
//         {/*<td><Badge href={appLink} color={getBadge(appliance.status)}>{appliance.status}</Badge></td>*/}
//       </tr>
//     )
//   }
// }

class ApplianceCapsule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appliance: this.props.appliance,
      appLink: '/main/apps/' + this.props.appliance.id
    };
    this.switch_status = this.switch_status.bind(this);
    this.capsuleClick = this.capsuleClick.bind(this);
    this.infoClick = this.infoClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.modifyClick = this.modifyClick.bind(this);
  }

  switch_status(e) {
    let a_id = this.props.appliance.id;
    e.target.disabled = 1;
    let opt = e.target.checked ? "on" : "off";
    let ret_val = "Error with connection";
    // alert("a_id: "+a_id + "opt: "+opt);
    $.ajax({
      type: "POST",
      async: false,
      url: "http://localhost:12333/appliance/switch_appliance",
      data: {aid: a_id, option: opt},
      success: function (data) {
        ret_val = data;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("！！！!");
        alert(jqXHR);
        alert(textStatus);
        alert(errorThrown);
      }
    });
    if (ret_val === "success") {
      this.props.reload();
    }
    else {
      alert(ret_val);
      e.target.checked = 1 - e.target.checked;
    }
    e.target.disabled = 0;
  };

  componentDidMount() {
    $(".caphead").textfill({maxFontPixels: 17, innerTag: 'p'});
    $(".capbody-content").textfill({maxFontPixels: 13, innerTag: 'p'});
  }

  rotate(li, d) {
    $({d: angleStart}).animate({d: d}, {
      step: function (now) {
        $(li)
          .css({transform: 'rotate(' + now + 'deg)'})
          .find('label')
          .css({transform: 'rotate(' + (-now) + 'deg)'});
      }, duration: 0
    });
  }

  toggleOptions(s) {

    s.toggleClass('open');
    let li = s.find('li');
    let deg = s.hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
    for (let i = 0; i < li.length; i++) {
      let d = s.hasClass('half') ? (i * deg) - 90 : i * deg;
      s.hasClass('open') ? this.rotate(li[i], d) : this.rotate(li[i], angleStart);
    }

  }


  capsuleClick(e) {

    let selectors = $(document).find(".selector");

    let y = e.clientY;
    let x = e.clientX;
    // alert("x: " + x + ",y: " + y);
    let parent_y = e.target.getBoundingClientRect().top;
    let parent_x = e.target.getBoundingClientRect().left;


    // alert("px: " + parent_x + ",py: " + parent_y);


    let ev = e || window.event;
    let elm = ev.target || ev.srcElement;
    let selector = $(e.target).find(".selector");

    // alert(elm.tagName);
    if (elm.tagName === 'INPUT') {
      this.toggleOptions(selector);
    }
    if (elm.tagName === 'UL') {
      selector = $(e.target).parent();
      // alert(e.target.parentNode.tagName);
      parent_y = e.target.parentNode.parentNode.getBoundingClientRect().top;
      parent_x = e.target.parentNode.parentNode.getBoundingClientRect().left;
    }

    let x_off = x - parent_x;
    let y_off = y - parent_y;


    // alert(e.target.tagName + x_off + ", " + y_off);

    // alert(elm.tagName);

    // alert("haha");

    let mark = 1;
    let single = 1;
    if (selector.hasClass("open") || selector.hasClass('half')) mark = 0;
    for (let i = 0; i < selectors.length; i++) {
      let sel = selectors[i];
      if ($(sel).hasClass('open')) {
        this.toggleOptions($(sel));
        single = 0;
      }
    }
    // alert("m: "+mark + ",s: "+ single);
    if (mark && single) {
      selector.css("left", x_off);
      selector.css("top", y_off);
      // alert("shit");
      this.toggleOptions(selector);
    }
  }

  infoClick(e) {
    // alert("info");
    e.stopPropagation();

    let id = "capsule-canvas" + $(e.target).parent().find("input")[0].name;
    let this_capsule = $("#" + id);

    let other_capsules = $(".capsule-canvas").not("#" + id);


    if (this_capsule.hasClass("fade-h")) {
      // other_capsules.removeClass("fade-back");
      this_capsule.removeClass("fade-h");
      this_capsule.addClass("fade-back");

      function removeFadeBack() {
        this_capsule.removeClass("fade-back");
      }

      setTimeout(removeFadeBack, 1000);
    }

    else {
      other_capsules.removeClass("fade-back");
      this_capsule.removeClass("fade-back");
      this_capsule.addClass("fade-h");
    }
    other_capsules.toggleClass("fade");

  }

  deleteClick(e) {
    alert("delete");
    e.stopPropagation();
    return false;
  }


  cancelClick(e) {
    alert("cancel");
    e.stopPropagation();
    return false;
  }

  submitJob() {
    let gesture = gesture_list[document.getElementById("gesture").selectedIndex];
    let mfrs = document.getElementById("mfrs_m").value === "" ?
      document.getElementById("mfrs_m").placeholder : document.getElementById("mfrs_m").value;
    let power = document.getElementById("power_m").value === "" ?
      document.getElementById("power_m").placeholder : document.getElementById("power_m").value;
    let ret = "Fail to send information";
    let aid = this.props.aid;
    $.ajax({
      type: "POST",
      async: false,
      url: "/appliance/modify_appliance",
      data: {aid: aid, mfrs: mfrs, power: power, gesture: gesture},
      context: document.body,
      success: function (data) {
        ret = data;
      }
    });
    alert(ret);
    if (ret === "success")
      window.location.reload();
  }

  modifyClick(e) {
    alert("modify");
    e.stopPropagation();
    return false;
  }

  render() {

    cardChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          borderColor: 'rgba(255,255,255,.55)',
          data: [Math.random() * (25 - 0 + 1), Math.random() * (40 - 13 + 1) + 13, Math.random() * (35 - 6 + 1) + 6, Math.random() * (24 - 13 + 1) + 13, Math.random() * (37 - 2 + 1) + 2, Math.random() * (34 - 21 + 1) + 21, Math.random() * (44 - 9 + 1) + 9],
        },
      ],
    };


    return (
      <div className="capsule-canvas" id={"capsule-canvas" + this.state.appliance["id"]}>
        <div className="capsule-core">
          <div className="v-capsule" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][0]}}>
            <div className="capsule-body" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][1]}}>
              <div className="capsule-head">
                <div className="caphead">
                <span style={{
                  backgroundColor: ColorScheme[this.state.appliance["id"] % 6][2],
                  color: ColorScheme[this.state.appliance["id"] % 6][1]
                }}>ID-{this.state.appliance["id"]}</span>
                  <p style={{color: ColorScheme[this.state.appliance["id"] % 6][1]}}>{this.state.appliance["name"]}</p>
                </div>
              </div>
            </div>
            <div className="capbody-row">
              <div className="capbody-item" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
                <span>Status</span></div>
              <div className="capbody-content">

              </div>
            </div>
            <div className="capbody-row">
              <div className="capbody-item" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
                <span>Update</span></div>
              <div className="capbody-content">
                <p>{this.state.appliance["updated"]}</p>
              </div>
            </div>
            <div className="capbody-row">
              <div className="capbody-item" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
                <span>Runtime</span></div>
              <div className="capbody-content">
                <p>EMMM</p>
              </div>
            </div>
            <div className="capbody-row">
              <div className="capbody-line">
                <Bar data={cardChartData} options={cardChartOpts} height={90}/>
              </div>
              <div className="capbody-line-mask">
              </div>
            </div>
          </div>
          <div className="capsule-canvas-mask" onClick={this.capsuleClick}>
            <AppSwitch checked={this.state.appliance["status"] === "Active"}
                       onClick={this.switch_status}
                       className={'mx-1 capbody-statBtn'} variant={'3d'} outline={'alt'}
                       color={ColorScheme[this.state.appliance["id"] % 6][4]} label/>
            <div className='selector'>
              <ul>
                <li>
                  {/*<Link to={this.state.appLink}>*/}
                  <input id='1' type='checkbox' name={this.state.appliance["id"]}/>
                  <label for='1' onClick={this.infoClick}>Info</label>
                  {/*</Link>*/}
                </li>
                <li>
                  <input id='2' type='checkbox' name={this.state.appliance["id"]}/>
                  <label for='2' onClick={this.deleteClick}>Delete</label>
                </li>
                <li>
                  <input id='3' type='checkbox' name={this.state.appliance["id"]}/>
                  <label for='3' onClick={this.cancelClick}>Cancel</label>
                </li>
                <li>
                  <input id='4' type='checkbox' name={this.state.appliance["id"]}/>
                  <label for='4' onClick={this.modifyClick}>Modify</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>


      // <tr key={this.state.appliance.id.toString()}>
      //   <th scope="row"><Link to={this.state.appLink}>{this.state.appliance["id"]}</Link></th>
      //   <td><Link to={this.state.appLink}>{this.state.appliance["name"]}</Link></td>
      //   <td>{this.state.appliance["status"]}</td>
      //   <td>{this.state.appliance["updated"]}</td>
      //   <td>
      //
      //   </td>
      //   {/*<td><Badge href={appLink} color={getBadge(appliance.status)}>{appliance.status}</Badge></td>*/}
      // </tr>
    )
  }

}

class Appliances extends Component {


  constructor() {
    super();
    console.log("getting data");
    $.ajax({
      type: "GET",
      async: false,
      url: "http://localhost:12333/appliance/get_all_status",
      data: {},
      success: function (data) {
        appsData = $.parseJSON(data.toString())["data"];
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("！！！!");
        alert(jqXHR);
        alert(textStatus);
        alert(errorThrown);
      }
    });
  }

  submitJob() {
    let gesture = gesture_list[document.getElementById("gesture").selectedIndex];
    let name = document.getElementById("appname").value === "" ?
      document.getElementById("appname").placeholder : document.getElementById("appname").value;
    let mfrs = document.getElementById("mfrs").value === "" ?
      document.getElementById("mfrs").placeholder : document.getElementById("mfrs").value;
    let power = document.getElementById("power").value === "" ?
      document.getElementById("power").placeholder : document.getElementById("power").value;
    let ret = "Fail to send information";
    $.ajax({
      type: "GET",
      async: false,
      url: "/appliance/add_appliance",
      data: {name: name, mfrs: mfrs, power: power, gesture: gesture},
      context: document.body,
      success: function (data) {
        ret = data;
      }
    });
    // index = Math.floor(Math.random()*(6));
  }

  render() {
    // show data
    // const appList = appsData.filter((appliance) => appliance.id < 10);
    this.constructor();
    let other_capsules = $(".capsule-canvas");

    return (

      <div className="animated fadeIn">
        {/*<Row>*/}
        {/*<Col xl={6}>*/}
        {/*<Card>*/}
        {/*<CardHeader>*/}
        {/*<i className="fa fa-align-justify"></i> Appliances*/}
        {/*</CardHeader>*/}
        {/*<CardBody>*/}
        {/*<Table responsive hover>*/}
        {/*<thead>*/}
        {/*<tr>*/}
        {/*<th scope="col">ID</th>*/}
        {/*<th scope="col">Name</th>*/}
        {/*<th scope="col">Status</th>*/}
        {/*<th scope="col">Last Updated</th>*/}
        {/*</tr>*/}
        {/*</thead>*/}
        {/*<tbody>*/}
        {/*{appsData.map((appliance, index) =>*/}
        {/*<ApplianceRow key={index} appliance={appliance} reload={this.render}/>*/}
        {/*)}*/}
        {/*</tbody>*/}
        {/*</Table>*/}
        {/*</CardBody>*/}
        {/*</Card>*/}
        {/*</Col>*/}

        {/*</Row>*/}
        <Row className="canvas" id="capsuleCanvas">
          {appsData.map((appliance, index) =>
            <ApplianceCapsule key={index} appliance={appliance} reload={this.render}/>
          )}
        </Row>
        {/*<Row className="canvas">*/}
          {/*{appsData.map((appliance, index) =>*/}
            {/*<Appliance id={appliance.id} count={10} reload={this.render}/>*/}
          {/*)}*/}
        {/*</Row>*/}
      </div>
    )
  }
}

export default Appliances;
