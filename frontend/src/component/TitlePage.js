import React, { Component } from 'react';
import './../css/app.css';
import {Breadcrumb} from 'antd';

class TitlePage extends Component {

  render() {
    return (
            <Breadcrumb className="breadcumb">
                <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
            </Breadcrumb>
    );
  }
}

export default TitlePage;
