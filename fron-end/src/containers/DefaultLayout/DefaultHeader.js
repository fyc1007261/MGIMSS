import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import $ from 'jquery';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/Logo.png'
import sygnet from '../../assets/img/brand/Sygnet.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
let avatarURL = "";

class DefaultHeader extends Component {
  render() {

    $.ajax({
      url:"/user/get_user_info",
      context:document.body,
      async:false,
      type:"get",
      success:function (data) {
        let tmpInfo = $.parseJSON(data);
        avatarURL = tmpInfo["avatarURL"];
      }
    });
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 72, height: 16, alt: 'MGIMSS Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        {/*<Nav className="d-md-down-none" navbar>*/}
          {/*<NavItem className="px-3">*/}

            {/*<NavLink href="/main">Home</NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="px-3">*/}
            {/*<NavLink href="/main/apps">Appliances</NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="px-3">*/}
            {/*<NavLink href="/main/schedule">Schedule</NavLink>*/}
          {/*</NavItem>*/}
        {/*</Nav>*/}
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={avatarURL} className="img-avatar" alt="avatar" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={() => window.location.href="/main/user/profile"}><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem onClick={() => window.location.href="/logout"}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
