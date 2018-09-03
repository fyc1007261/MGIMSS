import React, {Component} from 'react';
import {Button, Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {Link} from 'react-router-dom';

import {Bar} from 'react-chartjs-2';
import $ from '../../../node_modules/jquery/dist/jquery.js'
import {AppSwitch} from '@coreui/react';
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips/dist/cjs/custom-tooltips";
import {getStyle} from '@coreui/coreui/dist/js/coreui-utilities';
import {CurrentChart, VoltageChart} from "../Functions/DynamicChart/AppDynamicChart";
import Tools from './Tools/Tools'

require('../../css/self.css');
require('../../css/style.css');
require('../../css/card.css');
require('../../css/dropdown.css');
require('./jquery.textfill.js');

// require('./card/modernizr-custom');
// require('./card/classie');
// require('./card/card');
// require('./card/dynamics.min');
// require('./card/main');
// require('./card/card2');

//

// let appsData = [{"id":1, "status":"Active"},{"id":3, "status": "Inactive"}];
// let index;

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

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
let appInfo;
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

class ApplianceCapsule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appliance: this.props.appliance,
      card: 0,
      detail: 0,
      modify: 0
    };

    this.switch_status = this.switch_status.bind(this);
    this.switch_light_status = this.switch_light_status.bind(this);
    this.capsuleClick = this.capsuleClick.bind(this);
    this.infoClick = this.infoClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.modifyClick = this.modifyClick.bind(this);
    this.displayCard = this.displayCard.bind(this);
    this.displayCapsule = this.displayCapsule.bind(this);
    this.displayInput = this.displayInput.bind(this);
    this.displaySwitch = this.displaySwitch.bind(this);
    this.displaySelector = this.displaySelector.bind(this);
    this.displayButtons = this.displayButtons.bind(this);
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
      let rid = "runtime" + this.state.appliance["id"];
      let runtime = $("#" + rid);
      if (opt === "on") {
        runtime.text("0 min");
        let date = new Date().Format("yyyy-MM-dd hh:mm:ss");
        this.state.appliance["updated"] = date;
        this.state.appliance["start time"] = date;
        this.state.appliance["end time"] = "Not scheduled";
        this.state.appliance["status"] = "Active";
      }
      else {
        runtime.text("pending");
        this.state.appliance["status"] = "Inactive";
        this.state.appliance["start time"] = "Not scheduled";
        this.state.appliance["end time"] = "Not scheduled";
      }
      this.props.reload();
    }
    else {
      alert(ret_val);
      e.target.checked = 1 - e.target.checked;
    }
    e.target.disabled = 0;
  };

  switch_light_status(){

  }

  componentDidMount() {

    $(".caphead").textfill({maxFontPixels: 17, innerTag: 'p'});
    // $(".capbody-content").textfill({maxFontPixels: 13, innerTag: 'p'});
    $(".capbody-item").textfill({maxFontPixels: 12, innerTag: 'span'});


  }

  componentDidUpdate() {
    //处理runtime的更新显示
    if (this.state.appliance["status"] === "Active") {
      let runningTime = new Date(this.props.appliance["updated"]);
      let nowTime = new Date();
      // alert(nowTime.getHours().toString() + ":" + nowTime.getMinutes().toString() + ":" + nowTime.getSeconds().toString() + ", " + runningTime.getHours().toString() + ":" + runningTime.getMinutes().toString() + ":" + runningTime.getSeconds().toString());
      let diff = Math.floor((nowTime.getTime() - runningTime.getTime()) / 1000 / 60);
      let runtime;
      if (diff < 0)
        runtime = "0 min";
      else
        runtime = diff + " min";
      this.state.appliance["runtime"] = runtime;
    }
    //处理card的更新显示
    let card_id = "card" + this.state.appliance["id"];
    let this_card = $("#" + card_id);
    if (this.state.card === 1) {
      if (!this_card.hasClass("card-fade-h"))
        this_card.addClass("card-fade-h");
    }
    else {
      this_card.removeClass("card-fade-h");
    }
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

    // alert(elm.hasAttribute("id"));

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

    // alert(e.target.tagNam/e + x_off + ", " + y_off);

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

    let input = $(e.target).parent().find("input")[0];

    let id = "capsule-canvas" + input.name;
    let this_capsule = $("#" + id);
    let mask_id = "mask"+input.name;

    let this_capsule_core = this_capsule.find('.capsule-core');

    let card_id = "card" + this.state.appliance["id"];
    let this_card = $("#" + card_id);

    let this_v_capsule = this_capsule.find('.v-capsule');

    let this_capbody_rows = this_v_capsule.find('.capbody-row.brief');

    let new_rows = this_v_capsule.find('.info');

    let this_capbody_chart = this_v_capsule.find('.capbody-row.chart');

    let this_mask = this_capsule_core.find('.capsule-canvas-mask');

    let this_capbody = this_v_capsule.find('.capsule-body');

    let this_switch = this_capsule_core.find('.stateDiv');

    let this_lightSwitch = this_capsule_core.find('.lightDiv');

    let this_thermalSwitch = this_capsule_core.find('.thermalDiv');

    let this_motionSwitch = this_capsule_core.find('.motionDiv');

    let this_rangeSwitch = this_capsule_core.find('.rangeDiv');

    let other_capsules = $(".capsule-canvas").not("#" + id);

    let other_masks =  $(".capsule-canvas-mask").not("#" + mask_id);

    if (this_capsule.hasClass("fade-h")) {

      this_capsule.removeClass("fade-h");
      this_capsule.addClass("fade-back");

      this_capsule_core.removeClass("fade-core-h");
      this_capsule_core.addClass("fade-core-back");

      this_card.removeClass("card-fade-h");
      this_card.addClass("card-fade-back");

      this_v_capsule.removeClass("fade-v-h");
      this_v_capsule.addClass("fade-v-back");

      this_capbody_rows.removeClass("capbody-row-stretch-h");
      this_capbody_rows.addClass("capbody-row-stretch-back");

      this_capbody_chart.removeClass("capbody-chart-h");
      this_capbody_chart.addClass("capbody-chart-back");

      this_mask.removeClass("fade-v-h");
      this_mask.addClass("fade-v-back");


      this_capbody.removeClass("capbody-stretch-h");
      this_capbody.addClass("capbody-stretch-back");

      new_rows.addClass("new-rows-fade");

      this_switch.removeClass("switch-move-h");
      this_switch.addClass("switch-move-back");

      this_lightSwitch.removeClass("light-move-h");
      this_lightSwitch.addClass("light-move-back");

      this_thermalSwitch.removeClass("thermal-move-h");
      this_thermalSwitch.addClass("thermal-move-back");

      this_motionSwitch.removeClass("motion-move-h");
      this_motionSwitch.addClass("motion-move-back");

      this_rangeSwitch.removeClass("range-move-h");
      this_rangeSwitch.addClass("range-move-back");

      other_capsules.removeClass("fade-others");
      other_capsules.addClass("fade-others-back");


      let that = this;


      function showOldChart() {
        that.setState({
          card: 0,
          detail: 0
        });
      }

      function removeClass() {
        other_capsules.removeClass("fade");
      }

      function removeClass2() {
        this_capsule.removeClass("fade-back");
        this_capsule_core.removeClass("fade-core-back");
      }


      setTimeout(removeClass, 2500);
      setTimeout(removeClass2, 3000);
      setTimeout(showOldChart, 1000);
    }

    else {

      $.ajax({
        type: "GET",
        async: false,
        url: "/appliance/get_info_by_id",
        data: {"id": this.props.appliance["id"]},
        context: document.body,
        success: function (data) {
          appInfo = $.parseJSON(data.toString())["data"];
        }
      });

      {
        appInfo.map((appliance, index) =>
          this.setState({
            appliance: appliance,
          })
        )
      }

      this_capsule.removeClass("fade-back");
      this_capsule.addClass("fade-h");

      this_capsule_core.removeClass("fade-core-back");
      this_capsule_core.addClass("fade-core-h");

      this_card.removeClass("card-fade-back");

      this_v_capsule.removeClass("fade-v-back");
      this_v_capsule.addClass("fade-v-h");

      this_capbody_rows.removeClass("capbody-row-stretch-back");
      this_capbody_rows.addClass("capbody-row-stretch-h");

      this_capbody_chart.removeClass("capbody-chart-back");
      this_capbody_chart.addClass("capbody-chart-h");

      this_mask.removeClass("fade-v-back");
      this_mask.addClass("fade-v-h");

      this_capbody.removeClass("capbody-stretch-back");
      this_capbody.addClass("capbody-stretch-h");

      this_switch.removeClass("switch-move-back");
      this_switch.addClass("switch-move-h");

      this_lightSwitch.removeClass("light-move-back");
      this_lightSwitch.addClass("light-move-h");

      this_thermalSwitch.removeClass("thermal-move-back");
      this_thermalSwitch.addClass("thermal-move-h");

      this_motionSwitch.removeClass("motion-move-back");
      this_motionSwitch.addClass("motion-move-h");

      this_rangeSwitch.removeClass("range-move-back");
      this_rangeSwitch.addClass("range-move-h");

      other_capsules.addClass("fade");

      other_masks.removeClass("mask-fade-back");
      other_masks.addClass("mask-fade-h");

      this.setState({
        card: 1,
      });

      let that = this;

      function showInfo() {
        that.setState({
          detail: 1
        });


      }

      // function textAdapt(){
      //   $(".capbody-content.info").textfill({maxFontPixels: 13, innerTag: 'p'});
      //   $(".capbody-item").textfill({maxFontPixels: 12, innerTag: 'span'});
      // }
      setTimeout(showInfo, 1900);


      Tools.syncReloadScriptInHead('http://localhost:12333/js/card/modernizr-custom.js', function () {
      });
      Tools.syncReloadScripts(['http://localhost:12333/js/card/classie.js',
        'http://localhost:12333/js/card/card.js', 'http://localhost:12333/js/card/dynamics.min.js',
        'http://localhost:12333/js/card/main.js', 'http://localhost:12333/js/card/card2.js'], function () {
      });
    }
  }


  modifyClick(e) {
    e.stopPropagation();

    let input = $(e.target).parent().find("input")[0];

    let id = "capsule-canvas" + input.name;
    let this_capsule = $("#" + id);

    let this_capsule_core = this_capsule.find('.capsule-core');

    let this_v_capsule = this_capsule.find('.v-capsule');

    let this_capbody_rows = this_v_capsule.find('.capbody-row.brief');

    let new_rows = this_v_capsule.find('.info');

    let this_capbody_chart = this_v_capsule.find('.capbody-row.chart');

    let this_mask = this_capsule_core.find('.capsule-canvas-mask');

    let this_capbody = this_v_capsule.find('.capsule-body');

    let this_switch = this_capsule_core.find('.stateDiv');

    let this_lightSwitch = this_capsule_core.find('.lightDiv');

    let this_input = this_capsule_core.find('.capbody-content-input');

    let this_thermalSwitch = this_capsule_core.find('.thermalDiv');

    let this_motionSwitch = this_capsule_core.find('.motionDiv');

    let this_rangeSwitch = this_capsule_core.find('.rangeDiv');


    let other_capsules = $(".capsule-canvas").not("#" + id);

    if (this_capsule.hasClass("fade-h")) {

      this_capsule.removeClass("fade-h");
      this_capsule.addClass("fade-back");

      this_capsule_core.removeClass("mod-fade-core-h");
      this_capsule_core.addClass("mod-fade-core-back");

      this_v_capsule.removeClass("fade-v-h");
      this_v_capsule.addClass("fade-v-back");

      this_capbody_rows.removeClass("capbody-row-stretch-h");
      this_capbody_rows.addClass("capbody-row-stretch-back");

      this_capbody_chart.removeClass("capbody-chart-h");
      this_capbody_chart.addClass("capbody-chart-back");

      this_mask.removeClass("fade-v-h");
      this_mask.addClass("fade-v-back");

      this_capbody.removeClass("capbody-stretch-h");
      this_capbody.addClass("capbody-stretch-back");

      new_rows.addClass("new-rows-fade");

      this_switch.removeClass("switch-move-h");
      this_switch.addClass("switch-move-back");

      this_lightSwitch.removeClass("light-move-h");
      this_lightSwitch.addClass("light-move-back");


      this_thermalSwitch.removeClass("thermal-move-h");
      this_thermalSwitch.addClass("thermal-move-back");

      this_motionSwitch.removeClass("motion-move-h");
      this_motionSwitch.addClass("motion-move-back");

      this_rangeSwitch.removeClass("range-move-h");
      this_rangeSwitch.addClass("range-move-back");

      this_input.removeClass("input-move-h");
      this_input.addClass("input-move-back");

      other_capsules.removeClass("fade-others");
      other_capsules.addClass("fade-others-back");


      let that = this;


      function showBrief() {
        that.setState({
          detail: 0,
          modify: 0
        });
      }

      function removeClass() {
        other_capsules.removeClass("fade");
      }

      function removeClass2() {
        this_capsule.removeClass("fade-back");
        this_capsule_core.removeClass("mod-fade-core-back");
      }

      setTimeout(removeClass, 2500);
      setTimeout(removeClass2, 3000);
      setTimeout(showBrief, 1000);
    }

    else {

      $.ajax({
        type: "GET",
        async: false,
        url: "/appliance/get_info_by_id",
        data: {"id": this.props.appliance["id"]},
        context: document.body,
        success: function (data) {
          appInfo = $.parseJSON(data.toString())["data"];
        }
      });

      {
        appInfo.map((appliance, index) =>
          this.setState({
            appliance: appliance,
          })
        )
      }

      this_capsule.removeClass("fade-back");
      this_capsule.addClass("fade-h");

      this_capsule_core.removeClass("mod-fade-core-back");
      this_capsule_core.addClass("mod-fade-core-h");

      this_v_capsule.removeClass("fade-v-back");
      this_v_capsule.addClass("fade-v-h");

      this_capbody_rows.removeClass("capbody-row-stretch-back");
      this_capbody_rows.addClass("capbody-row-stretch-h");

      this_capbody_chart.removeClass("capbody-chart-back");
      this_capbody_chart.addClass("capbody-chart-h");

      this_mask.removeClass("fade-v-back");
      this_mask.addClass("fade-v-h");

      this_capbody.removeClass("capbody-stretch-back");
      this_capbody.addClass("capbody-stretch-h");

      this_switch.removeClass("switch-move-back");
      this_switch.addClass("switch-move-h");

      this_lightSwitch.removeClass("light-move-back");
      this_lightSwitch.addClass("light-move-h");

      this_thermalSwitch.removeClass("thermal-move-back");
      this_thermalSwitch.addClass("thermal-move-h");

      this_motionSwitch.removeClass("motion-move-back");
      this_motionSwitch.addClass("motion-move-h");

      this_rangeSwitch.removeClass("range-move-back");
      this_rangeSwitch.addClass("range-move-h");

      this_input.removeClass("input-move-back");
      this_input.addClass("input-move-h");

      other_capsules.addClass("fade");

      let that = this;

      function showInfo() {
        that.setState({
          detail: 0,
          modify: 1
        });

        Tools.syncReloadScripts([
          'http://localhost:12333/js/dropdown/classie.js',
          'http://localhost:12333/js/dropdown/selectFx.js', 'http://localhost:12333/js/dropdown/dropdown.js'], function () {
        });
      }

      setTimeout(showInfo, 1900);


    }
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


  displayCapsule() {
    if (this.state.detail === 1 || this.state.modify === 1) {

      return [

        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>start time</span></div>
          <div className="capbody-content info">
            <p>{this.state.appliance["start time"]}</p>
          </div>
        </div>,
        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>finish time</span></div>
          <div className="capbody-content info">
            <p>{this.state.appliance["finish time"]}</p>
          </div>
        </div>,
        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>light perception</span></div>
          <div className="capbody-content info">
          </div>
        </div>,
        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>thermal sense</span></div>
          <div className="capbody-content info">
          </div>
        </div>,
        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>motion control</span></div>
          <div className="capbody-content info">
          </div>
        </div>,
        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>range perception</span></div>
          <div className="capbody-content info">
          </div>
        </div>,
        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>manufacturer</span></div>
          <div className="capbody-content info">
            <p>{this.state.appliance["manufacturer"]}</p>
          </div>
        </div>,
        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>power</span></div>
          <div className="capbody-content info">
            <p>{this.state.appliance["power"]}</p>
          </div>
        </div>,
        <div className="capbody-row-info">
          <div className="capbody-item info" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
            <span>gesture</span></div>
          <div className="capbody-content info">
            <p>{this.state.appliance["gesture"]}</p>
          </div>
        </div>,
      ];
    }
  }

  displayCard() {
    if (this.state.card === 1) {
      return (
        <div className="cardContainer" id={"card" + this.state.appliance["id"]}>
          <div className="col-12">
            <ul id="stack_iman" className="stack stack--iman">
              <li className="stack__item">
                <div className="card">
                  <VoltageChart aid={this.state.appliance["id"]} alt={"Tree 2"} count={10}/>
                </div>
              </li>
              <li className="stack__item">
                <div className="card">
                  <CurrentChart aid={this.state.appliance["id"]} alt={"Tree 1"} count={10}/>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-12">
            <div className="controls">
              <button className="button button--sonar button--reject" data-stack={"stack_iman"}>
                <i className="fa fa-arrow-left"></i>
                <span className="text-hidden">Reject</span></button>
              <button className="button button--sonar button--accept" data-stack={"stack_iman"}>
                <i className="fa fa-arrow-right"></i>
                <span className="text-hidden">Accept</span></button>
            </div>
          </div>
        </div>
      );
    }

  }

  displayInput() {

    if (this.state.modify === 1) {
      return [
        <div className="capbody-content-input info">
              <span className="input input--kyo">
                <input className="input__field input__field--kyo" type="text"
                       id={"manufacturer" + this.state.appliance["id"]}
                       value={this.state.appliance["updated"]}/>
              </span>
        </div>,
        <div className="capbody-content-input info">
              <span className="input input--kyo">
                <input className="input__field input__field--kyo" type="text"
                       id={"manufacturer" + this.state.appliance["id"]}
                       value={this.state.appliance["runtime"]}/>
              </span>
        </div>,
        <div className="capbody-content-input info">
              <span className="input input--kyo">
                <input className="input__field input__field--kyo" type="text"
                       id={"manufacturer" + this.state.appliance["id"]}
                       value={this.state.appliance["start time"]}/>
              </span>
        </div>,
        <div className="capbody-content-input info">
              <span className="input input--kyo">
                <input className="input__field input__field--kyo" type="text"
                       id={"manufacturer" + this.state.appliance["id"]}
                       value={this.state.appliance["finish time"]}/>
              </span>
        </div>,
        <div className="capbody-content-input info null">
        </div>,
        <div className="capbody-content-input info null">
        </div>,
        <div className="capbody-content-input info null">
        </div>,
        <div className="capbody-content-input info null">
        </div>,
        <div className="capbody-content-input info">
              <span className="input input--kyo">
                <input className="input__field input__field--kyo" type="text"
                       id={"manufacturer" + this.state.appliance["id"]}
                       value={this.state.appliance["manufacturer"]}
                       />
              </span>
        </div>,
        <div className="capbody-content-input info">
          <span className="input input--kyo">
                <input className="input__field input__field--kyo" type="text" id={"power" + this.state.appliance["id"]}
                       value={this.state.appliance["power"]}
                       />
          </span>
        </div>,
        <div className="capbody-content-input info">
          <select className="cs-select cs-skin-slide" id={"gesture" + this.state.appliance["id"]}>
            <option value="sightseeing" data-class="icon-money">None</option>
            <option value="business" data-class="icon-money">Thumb Up</option>
            <option value="honeymoon" data-class="icon-money">Heart</option>
            <option value="food" data-class="icon-money">Victory</option>
            <option value="shopping" data-class="icon-shirt">Bad</option>
          </select>
        </div>,
      ]
    }
  }

  displaySelector() {
    if (this.state.detail === 1) {
      return (
        <div className='selector'>
          <ul>
            <li>
              {/*<Link to={this.state.appLink}>*/}
              <input id='1' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='1' onClick={this.infoClick}>Return</label>
              {/*</Link>*/}
            </li>
            <li>
              <input id='2' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='2' onClick={this.deleteClick}>Delete</label>
            </li>
            <li>
              <input id='3' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='3' onClick={this.cancelClick}>Cancel</label>
            </li>
          </ul>
        </div>
      )
    }
    else if (this.state.modify === 1) {
      return (
        <div className='selector'>
          <ul>
            <li>
              <input id='1' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='1' onClick={this.modifyClick}>Return</label>
            </li>
            <li>
              <input id='2' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='2' onClick={this.deleteClick}>Delete</label>
            </li>
            <li>
              <input id='3' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='3' onClick={this.cancelClick}>Cancel</label>
            </li>
          </ul>
        </div>
      )
    }
    else {
      return (
        <div className='selector'>
          <ul>
            <li>
              {/*<Link to={this.state.appLink}>*/}
              <input id='1' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='1' onClick={this.infoClick}>Info</label>
              {/*</Link>*/}
            </li>
            <li>
              <input id='2' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='2' onClick={this.deleteClick}>Delete</label>
            </li>
            <li>
              <input id='3' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='3' onClick={this.cancelClick}>Cancel</label>
            </li>
            <li>
              <input id='4' type='checkbox' name={this.state.appliance["id"]}/>
              <label htmlFor='4' onClick={this.modifyClick}>Modify</label>
            </li>
          </ul>
        </div>
      )
    }
  }

  displayButtons(){
    if (this.state.modify === 1) {
      return [

      ]
    }
  }

  displaySwitch() {
    if (this.state.detail === 1 || this.state.modify === 1) {
      return [
        <div className="lightDiv">
          <AppSwitch checked={this.state.appliance["status"] === "Active"}
                     onClick={this.switch_status}
                     className={'mx-1 capbody-Btn'} variant={'3d'} outline={'alt'}
                     color={ColorScheme[this.state.appliance["id"] % 6][4]}
                     id={"lightSense" + this.state.appliance["id"]} label/>
        </div>,
        <div className="thermalDiv">
          <AppSwitch checked={this.state.appliance["status"] === "Active"}
                     onClick={this.switch_status}
                     className={'mx-1 capbody-Btn'} variant={'3d'} outline={'alt'}
                     color={ColorScheme[this.state.appliance["id"] % 6][4]}
                     id={"lightSense" + this.state.appliance["id"]} label/>
        </div>,
        <div className="motionDiv">
          <AppSwitch checked={this.state.appliance["status"] === "Active"}
                     onClick={this.switch_status}
                     className={'mx-1 capbody-Btn'} variant={'3d'} outline={'alt'}
                     color={ColorScheme[this.state.appliance["id"] % 6][4]}
                     id={"lightSense" + this.state.appliance["id"]} label/>
        </div>,
        <div className="rangeDiv">
          <AppSwitch checked={this.state.appliance["status"] === "Active"}
                     onClick={this.switch_status}
                     className={'mx-1 capbody-Btn'} variant={'3d'} outline={'alt'}
                     color={ColorScheme[this.state.appliance["id"] % 6][4]}
                     id={"lightSense" + this.state.appliance["id"]} label/>
        </div>,
      ]
    }
  }

  render() {

    if (this.state.detail === 1 && this.state.modify !== 1) {

      cardChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
          'January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: "random",
            borderColor: 'rgba(255,255,255,.55)',
            data: [Math.random() * (25 - 0 + 1), Math.random() * (40 - 13 + 1) + 13, Math.random() * (35 - 6 + 1) + 6, Math.random() * (24 - 13 + 1) + 13, Math.random() * (37 - 2 + 1) + 2, Math.random() * (34 - 21 + 1) + 21, Math.random() * (44 - 9 + 1) + 9,
              Math.random() * (25 - 0 + 1), Math.random() * (40 - 13 + 1) + 13, Math.random() * (35 - 6 + 1) + 6, Math.random() * (24 - 13 + 1) + 13, Math.random() * (37 - 2 + 1) + 2, Math.random() * (34 - 21 + 1) + 21, Math.random() * (44 - 9 + 1) + 9],
          },
        ],
      };
    }
    else if (this.state.modify !== 1) {
      cardChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: "random",
            borderColor: 'rgba(255,255,255,.55)',
            data: [Math.random() * (25 - 0 + 1), Math.random() * (40 - 13 + 1) + 13, Math.random() * (35 - 6 + 1) + 6, Math.random() * (24 - 13 + 1) + 13, Math.random() * (37 - 2 + 1) + 2, Math.random() * (34 - 21 + 1) + 21, Math.random() * (44 - 9 + 1) + 9],
          },
        ],
      };
    }
    else {
      cardChartData = {}
    }
    return (
      <div className="capsule-canvas" id={"capsule-canvas" + this.state.appliance["id"]}>
        <div className="capsule-core" id={"capsule-core" + this.state.appliance["id"]}>
          <div className="v-capsule" id={"v-capsule" + this.state.appliance["id"]}
               style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][0]}}>
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
            <div className="capbody-row brief">
              <div className="capbody-item" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
                <span>Status</span></div>
              <div className="capbody-content">
              </div>
            </div>
            <div className="capbody-row brief">
              <div className="capbody-item" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
                <span>Update</span></div>
              <div className="capbody-content">
                <p>{this.state.appliance["updated"]}</p>
              </div>
            </div>
            <div className="capbody-row brief">
              <div className="capbody-item" style={{backgroundColor: ColorScheme[this.state.appliance["id"] % 6][3]}}>
                <span>Runtime</span></div>
              <div className="capbody-content">
                <p id={"runtime" + this.state.appliance["id"]}>{this.state.appliance["runtime"]}</p>
              </div>
            </div>
            {this.displayCapsule()}
            <div className="capbody-row chart">
              <div className="capbody-line">
                <Bar data={cardChartData} options={cardChartOpts} height={90}/>
              </div>
              <div className="capbody-line-mask">
              </div>
            </div>
          </div>
          <div className="capsule-canvas-mask" onClick={this.capsuleClick} id={"mask"+this.state.appliance["id"]}>
            {this.displaySelector()}
            <div className="stateDiv">
              <AppSwitch checked={this.state.appliance["status"] === "Active"}
                         onClick={this.switch_status}
                         className={'mx-1 capbody-statusBtn'} variant={'3d'} outline={'alt'}
                         color={ColorScheme[this.state.appliance["id"] % 6][4]}
                         id={"switch" + this.state.appliance["id"]} label/>
            </div>
            {this.displaySwitch()}
            {this.displayInput()}
          </div>
        </div>
        {this.displayCard()}
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

  }


  render() {

    this.constructor();
    let other_capsules = $(".capsule-canvas");

    return (

      <div className="animated fadeIn">
        <Row className="canvas" id="capsuleCanvas">
          {appsData.map((appliance, index) =>
            <ApplianceCapsule key={index} appliance={appliance} reload={this.render}/>
          )}
        </Row>

      </div>

    )
  }
}

export default Appliances;
