import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table,
  Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';


import {Link} from 'react-router-dom';
import $ from 'jquery';
import { AppSwitch } from '@coreui/react'
import Modals from "../Notifications/Modals";

let appsData = [{"id":1, "status":"Active", "power": "400", "name":"app1", "mfrs":"mfrs1"},
                {"id":3, "status": "Inactive","power": "400", "name":"app3", "mfrs":"mfrs3"}];
let jobsData = [{"id":1, "Status":"Pending",  "Appliance":"app1", "Duration":"100", "Start after":"2018-12-03T15:33", "Finish by":456},
  {"id":3, "status": "Running", "app_name":"app3", "duration":"1h"}];


require('../../css/all.css');

const gesture_list = ['none', 'thumb_up', 'heart_d', 'victory'];
const gesture_show = ['None', 'Thumb up', 'Heart with two fingers', 'Victory'];


const getBadge = (status) => {
  return status === 'Active' ? 'success' :
    status === 'Inactive' ? 'secondary' :
      status === 'Pending' ? 'warning' :
        status === 'Banned' ? 'danger' :
          'primary'
};

class ApplianceRow extends  Component{

  constructor(props){
    super(props);
    this.state = {
      appliance: this.props.appliance,
      appLink : '/main/apps/' + this.props.appliance.id
    };
    this.switch_status = this.switch_status.bind(this)

  }

  switch_status(e) {
    let a_id = this.props.appliance.id;
    e.target.disabled = 1;
    let opt = e.target.checked ? "on" : "off";
    if (opt === "on"){
      // check whether this app is in the pending list
      let exist = false;
      for (let i=0; i<jobsData.length; i++){
        let job = jobsData[i];
        if (job.status ==="Pending" && job["app_id"] === a_id)
        {
          exist = true;
          break;
        }
      }
      if (exist){
          {
            alert("This appliance is in the pending list. You may need to delete the schedule first.");
            e.target.disabled = 0;
            e.target.checked = !e.target.checked;
            return;
          }
      }
    }
    let ret_val = "Error with connection";
    $.ajax({
      type: "POST",
      async: false,
      url: "/appliance/switch_appliance",
      data: {aid: a_id, option: opt},
      context: document.body,
      success: function(data){
          ret_val = data;
      }
    });
    if (ret_val === "success"){
      this.props.reload();
    }
    else {
      alert(ret_val);
      e.target.checked = 1 - e.target.checked;
    }
    e.target.disabled = 0;
  };

  render(){
    return (
        <tr key={this.state.appliance.id.toString()}>
            <th scope="row"><Link to={this.state.appLink}>{this.state.appliance["id"]}</Link></th>
            <td><Link to={this.state.appLink}>{this.state.appliance["name"]}</Link></td>
            <td>{this.state.appliance["updated"]}</td>
            <td>
              <AppSwitch checked={this.state.appliance["status"] === "Active"} onClick={this.switch_status}
                className={'mx-1'} variant={'3d'} outline={'alt'} color={'primary'} label />
            </td>
            <td>
              <ModalModify aid={this.state.appliance["id"]} name={this.state.appliance["name"]}
                mfrs={this.state.appliance["mfrs"]} power={this.state.appliance["power"]}/>
            </td>
            {/*<td><Badge href={appLink} color={getBadge(appliance.status)}>{appliance.status}</Badge></td>*/}
        </tr>
    )}
}

class Appliances_old extends Component {

  constructor(){
    super();


    $.ajax({
      type: "GET",
      async: false,
      url: "/schedule/get_jobs",
      context: document.body,
      success: function(data){
        jobsData = $.parseJSON(data.toString())["data"];
      }
    });
    $.ajax({
      type: "GET",
      async: false,
      url: "/appliance/get_all_status",
      context: document.body,
      success: function(data){
        appsData = $.parseJSON(data.toString())["data"];
      }
    });

    // force the page to be rendered by setting new state
    this.state={
      update: 1
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={8}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Appliances
              </CardHeader>
              <CardBody>
                <Col col="6" xs="4" sm="2" md="2" lg="2" xl="2" className="mb-3 mb-xl-3">
                  <ModalAdd style={{"float":"left"}}/>
                </Col>
                <Table responsive striped >
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Last Updated</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appsData.map((appliance, index) =>
                      <ApplianceRow key={index} appliance={appliance} reload={this.render}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


class ModalModify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      primary: false,
    };
    this.togglePrimary = this.togglePrimary.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.submitJob = this.submitJob.bind(this);


  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  submitJob(){
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
      success: function(data){
        ret = data;
      }
    });
    alert(ret);
    if (ret==="success")
      window.location.reload();
  }

  deleteJob(){
    let aid = this.props.aid;
    let ret = "Fail to send information";
    $.ajax({
      type: "POST",
      async: false,
      url: "/appliance/delete_appliance",
      data: {aid: aid},
      context: document.body,
      success: function(data){
        ret = data;
      }
    });
    alert(ret);
    if (ret==="success")
      window.location.reload();
  }

  render() {
    return (
      <div className="animated fadeIn" style={{"float":"left"}}>
        <Row>
          <Col>
                <Button color="primary" onClick={this.togglePrimary} className="mr-1">
                  Modify
                </Button>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Modify the appliance</ModalHeader>
                  <ModalBody>
                      ID: <Input  disabled id={"id_m"} defaultValue={this.props.aid}/>
                      <br/>
                      Name: <Input disabled id={"appname_m"} defaultValue={this.props.name}/>
                      <br/>
                      Manufacturer: <Input id={"mfrs_m"} defaultValue={this.props.mfrs}/>
                      <br/>
                      Power: <Input id={"power_m"} defaultValue={this.props.power} type={"number"}/>
                      <br/>
                      Gesture to switch on/off:
                      <Input id={"gesture"} type={"select"}>
                        <option>{gesture_show[0]}</option>
                        <option>{gesture_show[1]}</option>
                        <option>{gesture_show[2]}</option>
                        <option>{gesture_show[3]}</option>
                      </Input>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.submitJob}>Confirm</Button>{' '}
                    <Button color="danger" onClick={this.deleteJob}>Delete Appliance</Button>{' '}
                    <Button color="secondary" onClick={this.togglePrimary}>Cancel</Button>
                  </ModalFooter>
                </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

class ModalAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      primary: false,
    };
    this.togglePrimary = this.togglePrimary.bind(this);
    this.submitJob = this.submitJob.bind(this);
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  submitJob(){
    let gesture = gesture_list[document.getElementById("gesture").selectedIndex];
    let name = document.getElementById("appname").value === ""?
      document.getElementById("appname").placeholder : document.getElementById("appname").value;
    let mfrs = document.getElementById("mfrs").value === "" ?
      document.getElementById("mfrs").placeholder : document.getElementById("mfrs").value;
    let power = document.getElementById("power").value === "" ?
      document.getElementById("power").placeholder : document.getElementById("power").value;
    let ret = "Fail to send information";
    $.ajax({
      type: "POST",
      async: false,
      url: "/appliance/add_appliance",
      data: {name: name, mfrs: mfrs, power: power, gesture: gesture},
      context: document.body,
      success: function(data){
        ret = data;
      }
    });
    alert(ret);
    if (ret==="success")
      window.location.reload();
  }

  render() {
    return (
      <div className="animated fadeIn" style={{"float":"left"}}>
        <Row>
          <Col>
            <Button color="primary" onClick={this.togglePrimary} className="mr-1 mb-3">
              Add a new appliance
            </Button>
            <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                   className={'modal-primary ' + this.props.className}>
              <ModalHeader toggle={this.togglePrimary}>Add a new appliance</ModalHeader>
              <ModalBody>
                Name: <Input id={"appname"} placeholder={"Television"}/>
                <br/>
                Manufacturer: <Input id={"mfrs"} placeholder={"Sony"}/>
                <br/>
                Power: <Input id={"power"} placeholder={"440"}/>
                <br/>
                Gesture to switch on/off:
                <Input id={"gesture"} type={"select"}>
                  <option>{gesture_show[0]}</option>
                  <option>{gesture_show[1]}</option>
                  <option>{gesture_show[2]}</option>
                  <option>{gesture_show[3]}</option>
                </Input>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.submitJob}>Confirm</Button>{' '}
                <Button color="secondary" onClick={this.togglePrimary}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Appliances_old;
