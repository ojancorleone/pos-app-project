import React, { Component } from 'react';
import './../css/app.css';
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

const {Header} = Layout;

class HeaderApp extends Component {

  render() {
    return (
          <Header>
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu">
              <Menu.Item key=""><Link  to="/">Dashboard</Link></Menu.Item>
              <Menu.Item key="order"><Link  to="/order">Order</Link></Menu.Item>
              <Menu.Item key="report"><Link  to="/report">Report</Link></Menu.Item>
              <Menu.Item key="inventory"><Link  to="/inventory">Inventory</Link></Menu.Item>
            </Menu>
          </Header>
     );
  }
}

export default HeaderApp;
