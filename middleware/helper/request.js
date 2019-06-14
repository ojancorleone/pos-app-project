const axios             = require('axios');
const HelperToken       = require("../helper/token");

module.exports = () =>{
    
    let module      = {};
    const token     = HelperToken();
    
    module.httpGET  = async (url, type) =>{
        return await axios({
                    method: 'get',
                    url: `${process.env.SERVER_ORIGIN}/${url}`,
                    data : {keyword : token.generateHandShake(type)}
              });
    };

    module.httpPOST  = async (url, type, requestBody) =>{
        requestBody["keyword"] = token.generateHandShake(type);
        return await axios({
                    method: 'post',
                    url: `${process.env.SERVER_ORIGIN}/${url}`,
                    data: requestBody
              });
    };

    module.httpPATCH  = async (url, type, requestBody) =>{
        requestBody["keyword"] = token.generateHandShake(type);
        return await axios({
                    method: 'patch',
                    url: `${process.env.SERVER_ORIGIN}/${url}`,
                    data: requestBody
              });
    };

    module.httpPUT  = async (url, type, requestBody) =>{
        requestBody["keyword"] = token.generateHandShake(type);
        return await axios({
                    method: 'put',
                    url: `${process.env.SERVER_ORIGIN}/${url}`,
                    data: requestBody
              });
    };

    module.httpDELETE  = async (url, type) =>{
        return await axios({
                    method: 'delete',
                    url: `${process.env.SERVER_ORIGIN}/${url}`,
                    data : {keyword : token.generateHandShake(process.env.KEYWORD, type)}
              });
    };

    return module;
}