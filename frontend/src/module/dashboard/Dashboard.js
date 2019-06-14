import React, { Component } from 'react';
import './../css/app.css';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;

class Dashboard extends Component {

  render() {
    return (
        <Content className="content">
            <Breadcrumb className="breadcumb">
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
        </Content>
    );
  }
}

export default Dashboard;
