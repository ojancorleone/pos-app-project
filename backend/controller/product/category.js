const ModelCategory     = require("./../../model/product/category");
const HelperResponse    = require("./../../helper/response");
const HelperValidation  = require("./../../helper/validation");

module.exports = client => {
    
    let module = {};
   
    module.mandatoryFields = [
        "name"
    ];

    const modelCategory     = ModelCategory(client);
    const reply             = HelperResponse();
    const validate          = HelperValidation();

    //getCategories
    module.getCategories = async (req, res) => {

        if(req.params.items_per_page <= 0 || req.params.page < 0)
            return reply.badRequest(req, res, "Invalid parameter item_per_page or page");
        try{
            const categories = await modelCategory.selectCategories(
                req.params.items_per_page,
                req.params.page
            );
            return reply.success(req, res, categories);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //getCategory
    module.getCategory = async (req, res) => {

        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid parameter id");
        try{
            const category = await modelCategory.selectCategory("id",req.params.id);
            if(category == undefined)
                return reply.notFound(req, res, "Category not Found");
            else
                return reply.success(req, res, category);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //postCategory
    module.postCategory = async (req, res) => {
        if(!validate.allMandatoryFieldsExists(req.body, mandatoryFields))
            return reply.badRequest(req, res, "Invalid parameter request");
        try{
            const category = await modelCategory.insertCategory(req.body);
            return reply.created(req, res, category);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //patchCategory
    module.patchCategory = async (req, res) => {

        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid parameter id");
        try{
            const category = await modelCategory.updateCategory(req.params.id, req.body);
            return reply.created(req, res, category);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //deletCategory
    module.deleteCategory = async (req, res) => {

        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid parameter id");
        try{
            const category = await modelCategory.deleteCategory(req.params.id);
            return reply.created(req, res, category);
        }catch(e){
            return reply.error(req, res, e);
        }   
    }
    
    return module;
}