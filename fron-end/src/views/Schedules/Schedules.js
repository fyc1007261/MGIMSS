import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table,
  Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';


import {Link} from 'react-router-dom';
import $ from 'jquery';


let jobsData = [{"id":1, "status":"Pending",  "app_name":"app1", "duration":"100min"},
                {"id":3, "status": "Running", "app_name":"app3", "duration":"1h"}];



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
      // $.ajax({
      //   type: "GET",
      //   async: false,
      //   url: "/schedule/get_jobs",
      //   context: document.body,
      //   success: function(data){
      //     jobsData = $.parseJSON(data.toString())["data"];
      //   }
      // });

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


export default Schedules;
