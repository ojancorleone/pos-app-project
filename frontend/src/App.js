import React, { Component } from 'react';
import './css/app.css';
import {Layout} from 'antd';
import HeaderApp from './component/HeaderApp';
import FooterApp from './component/FooterApp';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import Report from './pages/Report';
import Inventory from './pages/Inventory';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  
  render() {
    return (
      <div className="App">
         <Layout className="layout">
              <Router>
                <div>
                <HeaderApp/>
                  <Route exact path="/" key="1"component={Dashboard} />
                  <Route key="2" path="/order" component={Order}/>
                  <Route key="3" path="/report" component={Report} />
                  <Route key="4" path="/inventory" component={Inventory} />
                </div> 
              </Router>        
            <FooterApp/>
          </Layout>
      </div>
    );
  }
}

export default App;
