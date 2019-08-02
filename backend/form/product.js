const Constants                         = require("./../helper/constants");
const { body, header, query, param }    = require('express-validator');

module.exports = () => {

        let module              = {}
        const onHeader          = header('keyword')
                                        .exists().withMessage(Constants.VALIDATION.KEYWORD_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.KEYWORDS_IS_EMPTY);

        const onQuery           = [
                                query('page')
                                        .exists().withMessage(Constants.VALIDATION.PAGE_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.PAGE_IS_EMPTY)
                                        .isNumeric().withMessage(Constants.VALIDATION.PAGE_IS_NUMERIC),
                                query('items_per_page')
                                        .exists().withMessage(Constants.VALIDATION.ITEM_PAGE_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.ITEM_PAGE_IS_EMPTY)
                                        .isNumeric().withMessage(Constants.VALIDATION.ITEM_PAGE_IS_NUMERIC)
                                ]

        const onParam           =  param('id')
                                        .exists().withMessage(Constants.VALIDATION.ID_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.ID_IS_EMPTY)
                                        .isNumeric().withMessage(Constants.VALIDATION.ID_IS_NUMERIC)

        const onBody            = [
                                body('name')
                                        .exists().withMessage(Constants.VALIDATION.NAME_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.NAME_IS_EMPTY),
                                body('category_id')
                                        .exists().withMessage(Constants.VALIDATION.CATEGORY_ID_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.CATEGORY_ID_IS_EMPTY)
                                        .isNumeric().withMessage(Constants.VALIDATION.CATEGORY_ID_IS_NUMERIC),
                                body('price')
                                        .exists().withMessage(Constants.VALIDATION.PRICE_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.PRICE_IS_EMPTY)
                                        .isNumeric().withMessage(Constants.VALIDATION.PRICE_IS_NUMERIC),
                                body('image_url')
                                        .exists().withMessage(Constants.VALIDATION.IMAGE_URL_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.IMAGE_URL_IS_EMPTY)
                                        .isURL().withMessage(Constants.VALIDATION.IMAGE_URL_IS_URL),
                                body('stock')
                                        .exists().withMessage(Constants.VALIDATION.STOCK_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.STOCK_IS_EMPTY)
                                        .isNumeric().withMessage(Constants.VALIDATION.STOCK_IS_NUMERIC),
                                body('description')
                                        .exists().withMessage(Constants.VALIDATION.DESCRIPTION_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.DESCRIPTION_IS_EMPTY)
                                ]         
        

        module.fieldsGetProducts        = [onHeader, onQuery];
        module.fieldsGetProduct         = [onHeader, onParam];
        module.fieldsPostProduct        = [onHeader, onBody];
        module.fieldsPatchProduct       = [onHeader, onParam, onBody];
        module.fieldsDeleteProduct      = [onHeader, onParam];

    return module;
}