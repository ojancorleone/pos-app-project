const { body, header, query, param } = require('express-validator/check');

module.exports = () => {

    let module          = {}

    module.fieldsGetCategories = [
            header('keyword').exists(),
            query('page').exists(),
            query('items_per_page').exists()
    ]

    module.fieldsGetCategory = [
            header('keyword').exists(),
            param('id').exists()
    ]

    module.fieldsPostCategory = [
            header('keyword').exists(),
            body('name').exists(),
            body('logo').exists()
    ]

    module.fieldsPatchCategory = [
            header('keyword').exists(),
            param('id').exists()
    ]

    module.fieldsDeleteCategory = [
            header('keyword').exists(),
            param('id').exists()
    ]

    return module;
}