const { body, header, query, param } = require('express-validator/check');

module.exports = () => {

    let module          = {}

    module.fieldsGetUsers = [
            header('keyword').exists(),
            query('page').exists(),
            query('items_per_page').exists()
    ]

    module.fieldsGetUser = [
            header('keyword').exists(),
            param('id').exists()
    ]

    module.fieldsPostUser = [
            header('keyword').exists(),
            body('username').exists(),
            body('firstname').exists(),
            body('lastname').exists(),
            body('email').exists(),
            body('role').exists()
    ]

    module.fieldsPatchUser = [
            header('keyword').exists(),
            param('id').exists()
    ]

    module.fieldsDeleteUser = [
            header('keyword').exists(),
            param('id').exists()
    ]

    return module;
}