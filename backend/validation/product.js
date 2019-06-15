const { body, header, query, param } = require('express-validator/check');

module.exports = () => {

    let module          = {}


    module.fieldsGetProducts = [
            header('keyword').exists(),
            query('page').exists(),
            query('items_per_page').exists()
    ]

    module.fieldsGetProduct = [
        header('keyword').exists(),
        param('id').exists()
    ]

    module.fieldsPostProduct = [
            header('keyword').exists(),
            body('name').exists(),
            body('category_id').exists(),
            body('price').exists(),
            body('image_url').exists(),
            body('stock').exists(),
            body('description').exists()
    ]

    module.fieldsPatchProduct = [
            header('keyword').exists(),
            param('id').exists()
    ]

    module.fieldsDeleteProduct = [
            header('keyword').exists(),
            param('id').exists()
    ]

    return module;
}