import React, { Component } from 'react';
import './../css/app.css';
import TitlePage from './../component/TitlePage';
import {Layout} from 'antd';

const {Content} = Layout;

class Report extends Component {

  render() {
    return (
        <Content className="content">
           <TitlePage title="Report"/>
        </Content>
    );
  }
}

export default Report;
