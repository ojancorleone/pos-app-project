const ModelCategory     = require("./../model/category");
const HelperResponse    = require("./../helper/response");

module.exports = client => {
    
    let module = {};
   
    const modelCategory     = ModelCategory(client);
    const reply             = HelperResponse();

    //getCategories
    module.getCategories = async (req, res) => {
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
        try{
            const category = await modelCategory.insertCategory(req.body);
            return reply.created(req, res, category);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //patchCategory
    module.patchCategory = async (req, res) => {
        try{
            const category = await modelCategory.updateCategory(req.params.id, req.body);
            if(category == undefined)
                return reply.notFound(req, res, "Category not Found");
            else
                return reply.created(req, res, category);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //deletCategory
    module.deleteCategory = async (req, res) => {
        try{
            const category = await modelCategory.deleteCategory(req.params.id);
            if(category == undefined)
                return reply.notFound(req, res, "Category not Found");
            else
                return reply.created(req, res, category);
        }catch(e){
            return reply.error(req, res, e);
        }   
    }
    
    return module;
}