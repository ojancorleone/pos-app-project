import React, { Component } from 'react';
import './../css/app.css';
import {Layout, Breadcrumb, Row, Col, Card, Button, Icon, InputNumber} from 'antd';
import axios from 'axios';

const {Content} = Layout;
const {Meta} = Card;

class Order extends Component {

    state = {products : [], carts : []};

    componentDidMount = () =>{
        this.collectProducts(1,5);
    }

    addToCart = (productId) =>{
        let listCart = this.state.carts;
        let quantity = document.getElementById("Qty_"+productId).value;
        console.log("Product : "+productId+", Quantity : "+quantity);
        listCart.push(productId);
        this.setState({carts: listCart});
    }

    collectProducts = (page, item_per_page) =>{
        axios.get(`${process.env.REACT_APP_API_URL}/products/${page}/${item_per_page}`)
            .then(res => {
                const products = res.data.data;
                if(products)
                    this.setState({
                        products: 
                            products.map(
                                product =>
                                    <Col span={6} key={product.id}>
                                        <div className="catalog">
                                        <Card key={product.id}
                                            hoverable
                                            cover={<img alt="example" src="http://placehold.jp/150x70.png" />}
                                            actions={[  
                                                        <Button onClick={(e)=>{this.addToCart(product.id)}}>
                                                            <Icon type="shopping-cart"/> Add
                                                        </Button>,
                                                        <InputNumber 
                                                            id={"Qty_"+product.id}
                                                            min={1} 
                                                            max={1000} 
                                                            defaultValue={1}/>
                                                    ]}
                                            >
                                            <Meta
                                                title={product.name}
                                                description={"Rp. "+product.price+".00"}
                                            />
                                        </Card>              
                                        </div>
                                    </Col>
                            )
                    });
            });     
    }

    render() {
        return (
            <Content key="Order" className="content">
                <Breadcrumb className="breadcumb">
                    <Breadcrumb.Item>Order</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={6}>
                    <Col span={8}>
                        <Card title="Cart">
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title="Catalog">
                            <Row gutter={16}>
                                {this.state.products}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Content>

        );
    }
}

export default Order;
