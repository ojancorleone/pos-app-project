import React, { Component } from 'react';
import './../css/app.css';
import TitlePage from './../component/TitlePage';
import {Layout, Row, Col, Card, Button, Icon, InputNumber} from 'antd';
import ProductService from './../service/Products';
import TableCart from './../component/TableCart';

const {Content} = Layout;
const {Meta} = Card;

class Order extends Component {

    state = {
            products : [], 
            carts : []
    };

    componentDidMount = () =>{
        this.collectProducts(1,5);
    }

    addToCart = (product) =>{
        let listCart    = this.state.carts;
        let quantity    = parseInt(document.getElementById("Qty_"+product.id).value);
        let foundIndex  = listCart.findIndex(el => el.id === product.id);
        if (foundIndex >= 0){
            product['quantity']         = listCart[foundIndex].quantity + quantity;
            product['totalPrice']       = listCart[foundIndex].price + (listCart[foundIndex].price * quantity);
            listCart[foundIndex]        = product
        }else{
            product['quantity']         = quantity;
            product['totalPrice']       = product.price * quantity;
            listCart.push(product);
        }

        this.setState({carts: listCart});
    }

    collectProducts = (page, item_per_page) =>{
        const service   = new ProductService();
        const result    = service.getProducts(page, item_per_page);
                if(result){
                    this.setState({
                        products: 
                            result.map(
                                product =>
                                    <Col span={6} key={product.id}>
                                        <div className="catalog">
                                        <Card key={product.id}
                                            hoverable
                                            cover={<img alt="example" src="http://placehold.jp/150x70.png" />}
                                            actions={[  
                                                        <Button onClick={(e)=>{this.addToCart(product)}}>
                                                            <Icon type="shopping-cart"/>
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
            }
    }


    render() {
 
        return (
            <Content key="Order" className="content">
                 <TitlePage title="Order"/>
                <Row gutter={6}>
                    <Col span={8}>
                        <Card title="Cart">
                           <TableCart dataSource={this.state.carts}/>
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
