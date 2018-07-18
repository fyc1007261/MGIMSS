import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table,
  Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';


import {Link} from 'react-router-dom';
import $ from 'jquery';


let jobsData = [{"id":1, "status":"Pending",  "app_name":"app1", "duration":"100min"},
                {"id":3, "status": "Running", "app_name":"app3", "duration":"1h"}];
let appsData = [{"id":1, "status":"Active", "power": "400", "name":"app1", "mfrs":"mfrs1"},
  {"id":3, "status": "Inactive","power": "400", "name":"app3", "mfrs":"mfrs3"}];



const getBadge = (status) => {
  return status === 'Active' ? 'success' :
    status === 'Inactive' ? 'secondary' :
      status === 'Pending' ? 'warning' :
        status === 'Banned' ? 'danger' :
          'primary'
};

class ScheduleRow extends  Component{
  constructor(props){
    super(props);
    this.state = {
      job: this.props.job,
      jobLink : '/main/schedule/' + this.props.job.id
    };

  }

  render(){
    return (
        <tr key={this.state.job.id.toString()}>
          <th scope="row"><Link to={this.state.jobLink}>{this.state.job["id"]}</Link></th>
          <td><Link to={this.state.jobLink}>{this.state.job["app_name"]}</Link></td>
          <td>{this.state.job["duration"]}</td>
          <td>{this.state.job["status"]}</td>
          <td><Link to={this.state.jobLink}>Details</Link></td>
            {/*<td><Badge href={appLink} color={getBadge(appliance.status)}>{appliance.status}</Badge></td>*/}
        </tr>
    )}
}

class Schedules extends Component {

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


  }

  render() {
    this.constructor();
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={8}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Schedules
              </CardHeader>
              <CardBody>
                <Col col="6" xs="4" sm="2" md="2" lg="2" xl="2" className="mb-3 mb-xl-3">
                  <ModalAddJob appdata={appsData}/>
                </Col>
                <Table responsive striped >
                  <thead>
                    <tr>
                      <th scope="col">Job ID</th>
                      <th scope="col">Appliance</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobsData.map((job, index) =>
                      <ScheduleRow key={index} job={job} reload={this.render}/>
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



class ModalAddJob extends Component {

  constructor(props) {
    super(props);
    let now = new Date();
    let date = now.getFullYear() + "-" + (now.getMonth() < 9 ? "0" : "") + (now.getMonth() + 1) + "-" + (now.getDate() < 10 ? "0" : "") + (now.getDate()) + "T" + now.getHours() + ":" + now.getMinutes();
    let data = this.props.appdata;
    let opt = [];
    for(let i=0; i< data.length; i++){
      opt.push(<option>{data[i]["id"]}-{data[i]["name"]}</option>)
    }
    this.state = {
      primary: false,
      option: opt,
      time: date
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
    let index = document.getElementById("appname").selectedIndex;
    let aid = appsData[index]["id"];
    let start_time = document.getElementById("start_after").value;
    let finish_time = document.getElementById("finish_by").value;
    let duration = document.getElementById("duration").value;

    // check whether the inputs are valid
    if (finish_time <= start_time){
      alert("\"Finish by\" should be later than \"Start after\"");
      return;
    }
    if (duration === ""){
      alert("Duration is required");
      return;
    }
    let fin = new Date(finish_time);
    let sta = new Date(start_time);
    if (fin < new Date()){
      alert("Start time must be later than present!");
      return;
    }
    let min = (fin-sta)/1000/60;
    if(min < duration){
      alert("Duration should be no longer than the time in between!");
      return;
    }
    if ( duration <=0 ){
      alert("Duration must not be less than zero!");
      return;
    }


    let ret = "Fail to send information";
    // $.ajax({
    //   type: "POST",
    //   async: false,
    //   url: "/appliance/add_appliance",
    //   data: {name: name, mfrs: mfrs, power: power},
    //   context: document.body,
    //   success: function(data){
    //     ret = data;
    //   }
    // });
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
              New schedule
            </Button>
            <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                   className={'modal-primary ' + this.props.className}>
              <ModalHeader toggle={this.togglePrimary}>Add a new job</ModalHeader>
              <ModalBody>
                Appliance (ID-Name) :
                <Input id={"appname"} type={"select"}>
                  {this.state.option}
                </Input>
                <br/>
                Start after: <Input id={"start_after"} type={"datetime-local"}
                                    defaultValue={this.state.time}/>
                <br/>
                Finish by: <Input id={"finish_by"} type={"datetime-local"}
                                  defaultValue={this.state.time}/>
                <br/>
                Duration in between (in minutes) : <Input id={"duration"} type={"number"} placeholder={"required"}/>

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


export default Schedules;
