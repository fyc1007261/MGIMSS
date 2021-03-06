import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import $ from "jquery";
import {VoltageChart} from "../Functions/DynamicChart/AppDynamicChart";


let appsData = [];


require('../../css/all.css');

class Appliance extends Component {

  constructor(props){
    super(props);
    let aid = this.props.match.params.id;
    this.state = {
      aid: aid,
      count: 20
    };

    $.ajax({
      type: "GET",
      async: false,
      url: "/appliance/get_info_by_id",
      data:{"id": aid},
      context: document.body,
      success: function(data){
        appsData.push($.parseJSON(data.toString()));
      }
    });
  }


  render() {
    const appliance = appsData.find(appliance => appliance.id.toString() === this.props.match.params.id)
    const appDetails = appliance ? Object.entries(appliance) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Appliance id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  {
                    appDetails.map(([key, value]) => {
                      return (
                        <tr>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col className="col-6">
            <VoltageChart aid={this.state.aid} count={this.state.count}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Appliance;
