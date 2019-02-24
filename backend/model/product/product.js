module.exports = client =>{
    
    let module = {};
    
    //selectProduct
    module.selectProducts  = async (items_per_page, page) =>{
        const offset    = (page - 1) * items_per_page || 0;
        const products     = await client.query(
            "SELECT id, name, description, category, price, discounted_price, image_url, created_at, updated_at FROM products ORDER BY id LIMIT ($1) OFFSET ($2);",
            [items_per_page, offset]
        );
        return products.rows;
    };

    //selectProduct
    module.selectProduct   = async (by, parameter) => {
        let product;
        switch(by){
            case "id" :
            product = await client.query('SELECT id, name, description, category, price, discounted_price, image_url, created_at, updated_at FROM products WHERE id = ($1);', 
            [parameter]);
            return user.rows[0];
        };
    };

    //insertProduct
    module.inserProduct    = async body => {
        const user  = await client.query(
            "INSERT INTO products (name, description, category, price, discounted_price, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, description, category, price, discounted_price, image_url, created_at, updated_at;",
            [body.name, body.description, body.category, body.price, body.discounted_price, body.image_url]
        );
        return user.rows[0];
    }

    // updateProduct
    module.updateProduct = async (id, body) => {
        const product = await client.query(
        `UPDATE products SET name=$1, description=$2, category=$3, price=$4, discounted_price=$5, image_url=$6 updated_at=NOW() WHERE id=$7 RETURNING id, name, description, category, price, discounted_price, image_url, created_at, updated_at;`,
        [body.name, body.description, body.category, body.price, body.discounted_price, body.image_url, id]
        );
        return user.rows[0];
    };

    // deleteProduct
    module.deleteProduct = async id => {
        const product = await client.query(
        `DELETE FROM products WHERE id=$1 RETURNING id, name, description, category, price, discounted_price, image_url, created_at, updated_at;`,
        [id]
        );
        return user.rows[0];
    };

    return module;
}