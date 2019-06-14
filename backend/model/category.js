module.exports = client =>{
    
    let module = {};
    
    //selectCategories
    module.selectCategories  = async (items_per_page, page) =>{
        const offset        = (page - 1) * items_per_page || 0;
        const categories    = await client.query(
            "SELECT * FROM categories ORDER BY id LIMIT ($1) OFFSET ($2);",
            [items_per_page, offset]
        );
        return categories.rows;
    };

    //selectCategory
    module.selectCategory   = async (by, parameter) => {
        let category;
        switch(by){
            case "id" :
            category = await client.query('SELECT * FROM categories WHERE id = ($1);', 
            [parameter]);
            return category.rows[0];
        };
    };

    //insertCategory
    module.insertCategory    = async body => {
        const category  = await client.query(
            "INSERT INTO categories (name, logo) VALUES ($1, $2) RETURNING *;",
            [body.name, body.logo]
        );
        return category.rows[0];
    }

    // updateCategory
    module.updateCategory = async (id, body) => {
        const category = await client.query(
        `UPDATE categories SET name=$1, logo=$2, updated_at=NOW() WHERE id=$3 RETURNING *;`,
        [body.name, body.logo, id]
        );
        return category.rows[0];
    };

    // deleteCategory
    module.deleteCategory = async id => {
        const category = await client.query(
        `DELETE FROM categories WHERE id=$1 RETURNING *;`,
        [id]
        );
        return category.rows[0];
    };

    return module;
}