import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table,
  Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';
import $ from "jquery";

let jobsData = [{"id":1, "status":"Pending",  "app_name":"app1", "duration":"100min"},
  {"id":3, "status": "Running", "app_name":"app3", "duration":"1h"}];

class Schedule extends Component {

  constructor(props){
    super(props);
    let jid = this.props.match.params.id;
    $.ajax({
      type: "GET",
      async: false,
      url: "/schedule/get_job_by_id",
      data:{"id": jid},
      context: document.body,
      success: function(data){
        jobsData.push($.parseJSON(data.toString()));
      }
    });
  }


  render() {
    const job = jobsData.find(job => job.id.toString() === this.props.match.params.id);
    const jobDetails = job ? Object.entries(job) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Job id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        jobDetails.map(([key, value]) => {
                          return (
                            <tr>
                              <td>{`${key}:`}</td>
                              <td>{value}</td>
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



export default Schedule;
