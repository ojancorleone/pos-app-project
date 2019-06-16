const { body, header, query, param } = require('express-validator/check');

module.exports = () => {

        let module          = {}

        module.fieldsGetUsers = [
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

        module.fieldsGetUser = [
                header('keyword')
                        .exists().withMessage("keyword doesn't exist")
                        .not().isEmpty().withMessage("keyword can't be empty"),
                param('id')
                        .exists().withMessage("id doesn't exist")
                        .not().isEmpty().withMessage("id can't be empty")
                        .isNumeric().withMessage("id should be numeric")
        ]

        module.fieldsPostUser = [
                header('keyword')
                        .exists().withMessage("keyword doesn't exist")
                        .not().isEmpty().withMessage("keyword can't be empty"),
                body('username')
                        .exists().withMessage("username doesn't exist")
                        .not().isEmpty().withMessage("username can't be empty"),
                body('firstname')
                        .exists().withMessage("firstname doesn't exist")
                        .not().isEmpty().withMessage("firstname can't be empty"),
                body('lastname')
                        .exists().withMessage("lastname doesn't exist")
                        .not().isEmpty().withMessage("lastname can't be empty"),
                body('email')
                        .exists().withMessage("email doesn't exist")
                        .not().isEmpty().withMessage("email can't be empty")
                        .isEmail().withMessage("Invalid format email"),
                body('role')
                        .exists().withMessage("role doesn't exist")
                        .not().isEmpty().withMessage("role can't be empty")
        ]

        module.fieldsPatchUser = [
                header('keyword')
                        .exists().withMessage("keyword doesn't exist")
                        .not().isEmpty().withMessage("keyword can't be empty"),
                param('id')
                        .exists().withMessage("id doesn't exist")
                        .not().isEmpty().withMessage("id can't be empty")
                        .isNumeric().withMessage("id should be numeric")
        ]

        module.fieldsDeleteUser = [
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