const axios             = require('axios');
const HelperToken       = require("../helper/token");

module.exports = () =>{
    
    let module      = {};
    const token     = HelperToken();
    
    module.httpGetRequest  = async (url, type) =>{
        return await axios({
                    method: 'get',
                    url: `${process.env.SERVER_ORIGIN}${url}`,
                    data : {keyword : token.generateHandShake(process.env.KEYWORD, type)}
              });
    };

    module.httpPostRequest  = async (url, type, requestBody) =>{
        requestBody["keyword"] = token.generateHandShake(process.env.KEYWORD, type);
        return await axios({
                    method: 'post',
                    url: `${process.env.SERVER_ORIGIN}${url}`,
                    data: requestBody
              });
    };

    module.httpPatchRequest  = async (url, type, requestBody) =>{
        requestBody["keyword"] = token.generateHandShake(process.env.KEYWORD, type);
        return await axios({
                    method: 'patch',
                    url: `${process.env.SERVER_ORIGIN}${url}`,
                    data: requestBody
              });
    };

    module.httpPutRequest  = async (url, type, requestBody) =>{
        requestBody["keyword"] = token.generateHandShake(process.env.KEYWORD, type);
        return await axios({
                    method: 'put',
                    url: `${process.env.SERVER_ORIGIN}${url}`,
                    data: requestBody
              });
    };

    module.httpDeleteRequest  = async (url, type) =>{
        return await axios({
                    method: 'delete',
                    url: `${process.env.SERVER_ORIGIN}${url}`,
                    data : {keyword : token.generateHandShake(process.env.KEYWORD, type)}
              });
    };

    return module;
}