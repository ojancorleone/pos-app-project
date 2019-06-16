const { body, header, query, param } = require('express-validator/check');

module.exports = () => {

        let module      = {}
        const onHeader  = header('keyword')
                                .exists().withMessage("keyword doesn't exist")
                                .not().isEmpty().withMessage("keyword can't be empty");

        const onQuery   = [
                        query('page')
                                .exists().withMessage("page doesn't exist")
                                .not().isEmpty().withMessage("page can't be empty")
                                .isNumeric().withMessage("page should be numeric"),
                        query('items_per_page')
                                .exists().withMessage("items_per_page doesn't exist")
                                .not().isEmpty().withMessage("items_per_page can't be empty")
                                .isNumeric().withMessage("items_per_page should be numeric")
        ]

        const onParam   =  param('id')
                                .exists().withMessage("id doesn't exist")
                                .not().isEmpty().withMessage("id can't be empty")
                                .isNumeric().withMessage("id should be numeric")

        const onBody    = [
                        body('name')
                                .exists().withMessage("name doesn't exist")
                                .not().isEmpty().withMessage("name can't be empty"),
                        body('id')
                                .exists().withMessage("category_id doesn't exist")
                                .not().isEmpty().withMessage("category_id can't be empty")
                                .isNumeric().withMessage("category_id should be numeric"),
                        body('price')
                                .exists().withMessage("price doesn't exist")
                                .not().isEmpty().withMessage("price can't be empty")
                                .isNumeric().withMessage("price should be numeric"),
                        body('image_url')
                                .exists().withMessage("image_url doesn't exist")
                                .not().isEmpty().withMessage("image_url can't be empty")
                                .isURL().withMessage("Invalid format image_url"),
                        body('stock')
                                .exists().withMessage("stock doesn't exist")
                                .not().isEmpty().withMessage("stock can't be empty")
                                .isNumeric().withMessage("stock should be numeric"),
                        body('description')
                                .exists().withMessage("description doesn't exist")
                                .not().isEmpty().withMessage("description can't be empty")
        ]         
        

        module.fieldsGetProducts        = [onHeader, onQuery]
        module.fieldsGetProduct         = [onHeader, onParam]
        module.fieldsPostProduct        = [onHeader, onBody]
        module.fieldsPatchProduct       = [onHeader, onParam, onBody]
        module.fieldsDeleteProduct      = [onHeader, onParam]    

    return module;
}