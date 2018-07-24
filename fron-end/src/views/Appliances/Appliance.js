import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import $ from "jquery";


let appsData = [];

class Appliance extends Component {

  constructor(props) {
    super(props);
    $.ajax({
      type: "GET",
      async: false,
      url: "http://localhost:12333/appliance/get_info_by_id",
      data: {"id": this.props.id},
      context: document.body,
      success: function (data) {
        appsData.push($.parseJSON(data.toString()));
      }
    });
    this.state = {
      aid: this.props.id,
      count: this.props.count
    };
  }


  render() {
    const appliance = appsData.find(appliance => appliance.id.toString() === this.props.id)
    const appDetails = appliance ? Object.entries(appliance) : [['id', (
      <span><i className="text-muted icon-ban"></i> Not found</span>)]]
    return (
      <div className="detail-canvas animated fadeIn col-sm-12 col-md-4">
        <Col>
          <Card>
            <CardHeader>
              <strong><i className="icon-info pr-1"></i>Appliance id: {this.props.id}</strong>
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


      </div>
    )
  }
}

export default Appliance;
