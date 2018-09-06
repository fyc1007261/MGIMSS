import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import $ from 'jquery';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

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
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
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
