import axios from 'axios';

class Products {

    getProducts = (page, item_per_page) =>{
        return  [
            {id : 1, name : "product A", price : 10000},
            {id : 2, name : "product B", price : 12000},
            {id : 3, name : "product C", price : 9000}
        ]
        // axios.get(`${process.env.REACT_APP_API_URL}/products/${page}/${item_per_page}`)
        //     .then(res => {
        //         return res.data.data;
        //     })
    }
}

export default Products;