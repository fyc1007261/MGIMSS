import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import $ from 'jquery';

let appsData = [];

function ApplianceRow(props) {
  const appliance = props.appliance;
  const appLink = '/main/apps/' + appliance.id;

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  };

  return (
    <tr key={appliance.id.toString()}>
        <th scope="row"><Link to={appLink}>{appliance["id"]}</Link></th>
        <td><Link to={appLink}>{appliance["name"]}</Link></td>
        <td>{appliance["status"] === 1 ? "Active":"Inactive"}</td>
        <td>{appliance["updated"]}</td>
        {/*<td><Badge href={appLink} color={getBadge(appliance.status)}>{appliance.status}</Badge></td>*/}
    </tr>
  )
}

class Appliances extends Component {

  constructor(){
    super();
    // get data at present
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
                      <ApplianceRow key={index} appliance={appliance}/>
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
