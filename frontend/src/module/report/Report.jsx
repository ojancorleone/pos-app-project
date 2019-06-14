import React, { Component } from 'react';
import './../css/app.css';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;

class Report extends Component {

  render() {
    return (
        <Content className="content">
            <Breadcrumb className="breadcumb">
                <Breadcrumb.Item>Report</Breadcrumb.Item>
            </Breadcrumb>
        </Content>
    );
  }
}

export default Report;
