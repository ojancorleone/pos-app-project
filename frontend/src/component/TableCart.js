import React, { Component } from 'react';
import './../css/app.css';
import {Table} from 'antd';

const columns = [
        {
            title: 'Product',
            dataIndex: 'name'
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice'
        },
  ];

class TableCart extends Component {

  render() {
    return (
        <Table columns={columns} dataSource={this.props.dataSource} />
     );
  }
}

export default TableCart;
