import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import { AppSwitch } from '@coreui/react'

let appsData = [{"id":1, "status":"Active"},{"id":3, "status": "Inactive"}];



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
    let ret_val = "Error with connection";
    $.ajax({
      type: "GET",
      async: false,
      url: "/appliance/open_close_appliance",
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
            <td>{this.state.appliance["status"]}</td>
            <td>{this.state.appliance["updated"]}</td>
            <td>
              <AppSwitch checked={this.state.appliance["status"] === "Active"} onClick={this.switch_status}
                className={'mx-1'} variant={'3d'} outline={'alt'} color={'primary'} label />
            </td>
            {/*<td><Badge href={appLink} color={getBadge(appliance.status)}>{appliance.status}</Badge></td>*/}
        </tr>
    )}
}

class Appliances extends Component {

  constructor(){
    super();
    console.log("getting data");
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
    // show data
    // const appList = appsData.filter((appliance) => appliance.id < 10);
    this.constructor();
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Appliances
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Last Updated</th>
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

export default Appliances;
