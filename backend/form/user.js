
const Constants                         = require("../helper/constants");
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
                                body('username')
                                        .exists().withMessage(Constants.VALIDATION.USERNAME_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.USERNAME_IS_EMPTY),
                                body('firstname')
                                        .exists().withMessage(Constants.VALIDATION.FIRSTNAME_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.FISRTNAME_IS_EMPTY),
                                body('lastname')
                                        .exists().withMessage(Constants.VALIDATION.LASTNAME_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.LASTNAME_IS_EMPTY),
                                body('email')
                                        .exists().withMessage(Constants.VALIDATION.EMAIL_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.EMAIL_IS_EMPTY)
                                        .isEmail().withMessage(Constants.VALIDATION.EMAIL_IS_EMAIL),
                                body('role')
                                        .exists().withMessage(Constants.VALIDATION.ROLE_NOT_EXIST)
                                        .not().isEmpty().withMessage(Constants.VALIDATION.ROLE_IS_EMPTY)
                                ]

        module.fieldsGetUsers   = [onHeader, onQuery];
        module.fieldsGetUser    = [onHeader, onParam];
        module.fieldsPostUser   = [onHeader, onBody];
        module.fieldsPatchUser  = [onHeader, onParam, onBody];
        module.fieldsDeleteUser = [onHeader, onParam];

    return module;
}

