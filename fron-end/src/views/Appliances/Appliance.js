import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

// import appsData from './UsersData'
import $ from "jquery";

let appsData = [];

class Appliance extends Component {

  constructor(){
    super();
    $.ajax({
      type: "GET",
      async: false,
      url: "/appliance/get_all_status",
      data:{"id": this.props.match.params.id},
      context: document.body,
      success: function(data){
        appsData = $.parseJSON(data.toString());
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
        </Row>
      </div>
    )
  }
}

export default Appliance;
