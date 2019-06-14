module.exports = client =>{
    
    let module = {};
    
    //selectProduct
    module.selectProducts  = async (items_per_page, page) =>{
        const offset    = (page - 1) * items_per_page || 0;
        const products     = await client.query(
            "SELECT p.*, c.name as category_name FROM products p INNER JOIN categories c ON (p.category_id = c.id) ORDER BY p.id LIMIT ($1) OFFSET ($2);",
            [items_per_page, offset]
        );
        return products.rows;
    };

    //selectProduct
    module.selectProduct   = async (by, parameter) => {
        let product;
        switch(by){
            case "id" :
            product = await client.query('SELECT p.*, c.name as category_name FROM products p INNER JOIN categories c ON (p.category_id = c.id) WHERE p.id = ($1);', 
            [parameter]);
            return product.rows[0];
        };
    };

    //insertProduct
    module.insertProduct    = async body => {
        const product  = await client.query(
            "INSERT INTO products (name, description, category_id, stock, price, discounted_price, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
            [body.name, body.description, body.category_id, body.stock, body.price, body.discounted_price, body.image_url]
        );
        return product.rows[0];
    }

    // updateProduct
    module.updateProduct = async (id, body) => {
        const product = await client.query(
        `UPDATE products SET name=$1, description=$2, category_id=$3, stock=$4, price=$5, discounted_price=$6, image_url=$7, updated_at=NOW() WHERE id=$8 RETURNING *;`,
        [body.name, body.description, body.category_id, body.stock, body.price, body.discounted_price, body.image_url, id]
        );
        return product.rows[0];
    };

    // deleteProduct
    module.deleteProduct = async id => {
        const product = await client.query(
        `DELETE FROM products WHERE id=$1 RETURNING *;`,
        [id]
        );
        return product.rows[0];
    };

    return module;
}