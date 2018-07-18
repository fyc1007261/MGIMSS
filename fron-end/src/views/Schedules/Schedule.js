import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table,
  Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';
import $ from "jquery";

let jobsData = [{"id":1, "Status":"Pending",  "Appliance":"app1", "Duration":"100", "Start after":"2018-12-03T15:33", "Finish by":456},
  {"id":3, "status": "Running", "app_name":"app3", "duration":"1h"}];

class Schedule extends Component {

  constructor(props){
    super(props);
    this.modifyClick = this.modifyClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.submitClick = this.submitClick.bind(this);
    let jid = this.props.match.params.id;
    this.state={
      start: "",
      finish:"",
      duration:""
    };
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

  componentDidMount()
  {
    document.getElementById("Start after").type = "datetime-local";
    document.getElementById("Finish by").type = "datetime-local";
    document.getElementById("Duration").type = "number";
  }
  modifyClick(ele){
    if (ele.target.style.display == "")
      return;
    if (document.getElementById("Status").value === "Running"){
      alert("Running jobs cannot be modified.");
      return;
    }
    document.getElementById("Start after").disabled = 0;
    document.getElementById("Finish by").disabled = 0;
    document.getElementById("Duration").disabled = 0;
    document.getElementById("Submit").style.display = "inline";
    document.getElementById("Submit").disabled = 0;
    document.getElementById("Cancel").style.display = "inline";
    document.getElementById("Cancel").disabled = 0;
    ele.target.style.display = "none";
    this.setState({
      start: document.getElementById("Start after").value,
      finish: document.getElementById("Finish by").value,
      duration: document.getElementById("Duration").value,
    })
  }

  deleteClick(){
    if(document.getElementById("Status").value === "Running"){
      alert("Cannot delete running jobs!");
      return;
    }
    if (!window.confirm("Sure to delete this job?"))
      return;
    //send message to server
    window.location.href = "/main/schedule";
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
    document.getElementById("Start after").value =this.state.start;
    document.getElementById("Finish by").value = this.state.finish;
    document.getElementById("Duration").value = this.state.duration;
  }

  submitClick(ele){
    if (ele.target.style.display == "")
      return;
    // check validity
    let finish_time = document.getElementById("Finish by").value;
    let start_time = document.getElementById("Start after").value;
    let duration = document.getElementById("Duration").value;
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


    document.getElementById("Start after").disabled = 1;
    document.getElementById("Finish by").disabled = 1;
    document.getElementById("Duration").disabled = 1;
    document.getElementById("Modify").style.display = "inline";
    document.getElementById("Modify").disabled = 0;
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Submit").disabled = 1;
    document.getElementById("Cancel").style.display = "none";
    document.getElementById("Cancel").disabled = 1;
    document.getElementById("Start after").value =this.state.start;
    document.getElementById("Finish by").value = this.state.finish;
    document.getElementById("Duration").value = this.state.duration;
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
                <Button color={"success"} onClick={this.submitClick} id={"Submit"}
                        style={{"marginBottom": "6px", "display":"none"}}> Submit</Button>
                <Button color={"light"} onClick={this.cancelClick} id={"Cancel"}
                        style={{"marginBottom": "6px", "marginLeft": "6px", "display": "none"}}> Cancel</Button>
                <Button color={"danger"} onClick={this.deleteClick} id={"Delete"}
                        style={{"marginBottom": "6px", "marginLeft": "6px", "display":"inline"}}> Delete</Button>
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
