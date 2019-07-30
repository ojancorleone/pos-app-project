import React, { Component } from 'react';
import './../css/app.css';
import {Layout} from 'antd';
import TitlePage from './../component/TitlePage';

const {Content} = Layout;

class Dashboard extends Component {

  render() {
    return (
        <Content className="content">
            <TitlePage title="Dashboard"/>
        </Content>
    );
  }
}

export default Dashboard;
