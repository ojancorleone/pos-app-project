import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
         <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
                >
                <Menu.Item key="1">Dashboard</Menu.Item>
                <Menu.Item key="2">Transaction</Menu.Item>
                <Menu.Item key="3">Report</Menu.Item>
                <Menu.Item key="4">Inventory</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Transaction</Breadcrumb.Item>
              </Breadcrumb>
              <Row gutter={16}>
                <Col span={12}><div style={{ background: '#fff', padding: 24, minHeight: 280 }}>CART</div></Col>
                <Col span={12}><div style={{ background: '#fff', padding: 24, minHeight: 280 }}>PRODUCT</div></Col>
              </Row>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
             {process.env.REACT_APP_NAME} ©{process.env.REACT_APP_LICENSE_YEAR} Created by {process.env.REACT_APP_DEVELOPER}
            </Footer>
          </Layout>
      </div>
    );
  }
}

export default App;
