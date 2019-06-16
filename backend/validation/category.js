const { body, header, query, param } = require('express-validator/check');

module.exports = () => {

        let module          = {}

        module.fieldsGetCategories = [
                header('keyword')
                        .exists().withMessage("keyword doesn't exist")
                        .not().isEmpty().withMessage("keyword can't be empty"),
                query('page')
                        .exists().withMessage("page doesn't exist")
                        .not().isEmpty().withMessage("page can't be empty")
                        .isNumeric().withMessage("page should be numeric"),
                query('items_per_page')
                        .exists().withMessage("items_per_page doesn't exist")
                        .not().isEmpty().withMessage("items_per_page can't be empty")
                        .isNumeric().withMessage("items_per_page should be numeric")
        ]

        module.fieldsGetCategory = [
                header('keyword')
                        .exists().withMessage("keyword doesn't exist")
                        .not().isEmpty().withMessage("keyword can't be empty"),
                param('id')
                        .exists().withMessage("id doesn't exist")
                        .not().isEmpty().withMessage("id can't be empty")
                        .isNumeric().withMessage("id should be numeric")
        ]

        module.fieldsPostCategory = [
                header('keyword')
                        .exists().withMessage("keyword doesn't exist")
                        .not().isEmpty().withMessage("keyword can't be empty"),
                body('name')
                        .exists().withMessage("name doesn't exist")
                        .not().isEmpty().withMessage("name can't be empty"),
                body('logo')
                        .exists().withMessage("logo doesn't exist")
                        .not().isEmpty().withMessage("logo can't be empty")
                        .isURL().withMessage("Invalid format logo")
        ]

        module.fieldsPatchCategory = [
                header('keyword')
                        .exists().withMessage("keyword doesn't exist")
                        .not().isEmpty().withMessage("keyword can't be empty"),
                param('id')
                        .exists().withMessage("id doesn't exist")
                        .not().isEmpty().withMessage("id can't be empty")
                        .isNumeric().withMessage("id should be numeric"),
                body('name')
                        .exists().withMessage("name doesn't exist")
                        .not().isEmpty().withMessage("name can't be empty"),
                body('logo')
                        .exists().withMessage("logo doesn't exist")
                        .not().isEmpty().withMessage("logo can't be empty")
                        .isURL().withMessage("Invalid format logo")
        ]

        module.fieldsDeleteCategory = [
                header('keyword')
                        .exists().withMessage("keyword doesn't exist")
                        .not().isEmpty().withMessage("keyword can't be empty"),
                param('id')
                        .exists().withMessage("id doesn't exist")
                        .not().isEmpty().withMessage("id can't be empty")
                        .isNumeric().withMessage("id should be numeric")
        ]

    return module;
}