import React, { Component } from 'react';
import './../css/app.css';
import {Layout} from 'antd';
const {Footer} = Layout;

class FooterApp extends Component {
  render() {
    return (
        <Footer className="footer">
          {process.env.REACT_APP_NAME}©{process.env.REACT_APP_LICENSE_YEAR} Created by {process.env.REACT_APP_DEVELOPER}
       </Footer>

     );
  }
}

export default FooterApp;



