const { body, header, query, param }    = require('express-validator');
const Constants                         = require("./../helper/constants");

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
                                body('logo')
                                        .exists().withMessage(Constants.VALIDATION.LOGO_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.LOGO_IS_EMPTY)
                                        .isURL().withMessage(Constants.VALIDATION.LOGO_IS_URL)
                                ]         

        module.fieldsGetCategories      = [onHeader, onQuery];
        module.fieldsGetCategory        = [onHeader, onParam];
        module.fieldsPostCategory       = [onHeader, onBody];
        module.fieldsPatchCategory      = [onHeader, onParam, onBody];
        module.fieldsDeleteCategory     = [onHeader, onParam];

    return module;
}