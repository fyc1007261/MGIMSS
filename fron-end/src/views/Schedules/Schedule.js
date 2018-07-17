import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table,
  Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';
import $ from "jquery";

let jobsData = [{"id":1, "Status":"Pending",  "Appliance":"app1", "Duration":"100min", "Start after":"123", "Finish by":456},
  {"id":3, "status": "Running", "app_name":"app3", "duration":"1h"}];

class Schedule extends Component {

  constructor(props){
    super(props);
    this.modifyClick = this.modifyClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    let jid = this.props.match.params.id;
    // $.ajax({
    //   type: "GET",
    //   async: false,
    //   url: "/schedule/get_job_by_id",
    //   data:{"id": jid},
    //   context: document.body,
    //   success: function(data){
    //     jobsData.push($.parseJSON(data.toString()));
    //   }
    // });
  }

  modifyClick(ele){
    if (ele.target.style.display == "")
      return;
    document.getElementById("Start after").disabled = 0;
    document.getElementById("Finish by").disabled = 0;
    document.getElementById("Duration").disabled = 0;
    document.getElementById("Submit").style.display = "inline";
    document.getElementById("Submit").disabled = 0;
    document.getElementById("Cancel").style.display = "inline";
    document.getElementById("Cancel").disabled = 0;
    ele.target.style.display = "none";
  }

  cancelClick(ele){
    if (ele.target.style.display == "")
      return;
    document.getElementById("Start after").disabled = 1;
    document.getElementById("Finish by").disabled = 1;
    document.getElementById("Duration").disabled = 1;
    document.getElementById("Modify").style.display = "inline";
    document.getElementById("Modify").disabled = 0;
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Submit").disabled = 1;
    document.getElementById("Cancel").style.display = "none";
    document.getElementById("Cancel").disabled = 1;
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
                <Button color={"primary"} onClick={this.modifyClick} id={"Modify"}
                        style={{"marginBottom": "6px", "display":"inline"}}> Modify</Button>
                <Button color={"success"} onClick={this.modifyClick} id={"Submit"}
                        style={{"marginBottom": "6px", "display":"none"}}> Submit</Button>
                <Button color={"light"} onClick={this.cancelClick} id={"Cancel"}
                        style={{"marginBottom": "6px", "marginLeft": "6px", "display": "none"}}> Cancel</Button>
                  <Table responsive hover>
                    <tbody>
                      {
                        jobDetails.map(([key, value]) => {
                          return (
                            <tr>
                              <td>{`${key}:`}</td>
                              <td>
                                <Input defaultValue={value} disabled id={key}/>
                              </td>
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
