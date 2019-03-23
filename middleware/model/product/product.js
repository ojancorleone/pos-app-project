const axios             = require('axios');
const HelperToken       = require("../../helper/token");

module.exports = () =>{
    
    let module      = {};
    const token     = HelperToken();
    
    //selectProducts
    module.selectProducts  = async (items_per_page, page) =>{
        return await axios({
                    method: 'get',
                    url: `${process.env.SERVER_ORIGIN}/products/${page}/${items_per_page}`,
                    data: {
                        keyword : token.generateHandShake(process.env.KEYWORD, "getProducts")
                    }
              });
    };

    //selectProduct
    module.selectProduct  = async (id) =>{
        return await axios({
                method: 'get',
                url: `${process.env.SERVER_ORIGIN}/product/${id}`,
                data: {
                    keyword : token.generateHandShake(process.env.KEYWORD, "getProduct")
                }
          });
    };


    return module;
}