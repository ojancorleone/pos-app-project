import axios from 'axios';

class Products {

    getProducts = (page, item_per_page) =>{
        axios.get(`${process.env.REACT_APP_API_URL}/products/${page}/${item_per_page}`)
            .then(res => {
                return res.data.data;
            })
    }
}

export default Products;