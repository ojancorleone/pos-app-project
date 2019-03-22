import React, { Component } from 'react';
import './../css/app.css';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;

class Inventory extends Component {

  render() {
    return (
        <Content className="content">
            <Breadcrumb className="breadcumb">
                <Breadcrumb.Item>Inventory</Breadcrumb.Item>
            </Breadcrumb>
        </Content>
    );
  }
}

export default Inventory;
