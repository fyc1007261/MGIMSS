import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import $ from 'jquery';

import appsData from './UsersData'

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
        <th scope="row"><Link to={appLink}>{appliance.id}</Link></th>
        <td><Link to={appLink}>{appliance.name}</Link></td>
        <td>{appliance.registered}</td>
        <td>{appliance.role}</td>
        <td><Badge href={appLink} color={getBadge(appliance.status)}>{appliance.status}</Badge></td>
    </tr>
  )
}

class Appliances extends Component {

  render() {

    // get data at present
    $.ajax({
      type: "GET",
      url: "test.json",
      data: {},
      dataType: "json",
      success: function(data){

      }
    });


    // show data


    const appList = appsData.filter((appliance) => appliance.id < 10);

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
                      <th scope="col">Voltage</th>
                      <th scope="col">Current</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appList.map((appliance, index) =>
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
