module.exports = client => {
    let module = {};

    // selectCarts
    module.selectCarts = async (items_per_page, page, status) => {
      const offset = (page - 1) * items_per_page || 0;
      const carts = await client.query(
        `SELECT 
            carts.id, 
            carts.user_id,
            users.firstname, 
            users.lastname,
            carts.created_at, 
            carts.updated_at
          FROM carts 
            INNER JOIN users ON (users.id = carts.id)
          WHERE carts.status = ($1)
            ORDER BY carts.id LIMIT ($2) OFFSET ($3);`,
        [status, items_per_page, offset]
      );
      return carts.rows;
    };

    // selectCart
    module.selectCart = async (by, parameter) => {
      let cart;
      switch (by) {
        case "id":
          cart = await client.query(
            `SELECT 
              carts.id,
              carts.user_id,
              users.firstname,
              users.lastname,
              carts.status,
              carts.created_at,
              carts.updated_at
             FROM carts 
             INNER JOIN users ON (users.id = carts.user_id)
             WHERE carts.id=($1) LIMIT 1;`,
            [parameter]
          );
          return cart.rows[0];
      }
    };
  
    // checkCartExists
    module.checkCartExists = async user_id => {
      const cart = await client.query(
        "SELECT id FROM carts WHERE user_id=$1 AND status <> 'finished' LIMIT 1;",
        [user_id]
      );
      return cart.rows[0];
    };

    // insertCart
    module.insertNewCart = async user_id => {
   
      const cart = await client.query(
        "INSERT INTO carts (user_id, status) VALUES ($1, 'created') RETURNING id;",
        [user_id]
      );
      return cart.rows[0];
    };

    //checkOutCart
    module.checkOutCart = async (cart_id) => {
      const cart = await client.query(
        "UPDATE carts SET status='ordered' WHERE id=$1 RETURNING *;",
        [cart_id]
      );
      return cart.rows[0];
    };

    //deleteCart
    module.deleteCart = async (cart_id) => {
      const cart = await client.query(
        "UPDATE carts SET status='canceled' WHERE id=$1 RETURNING *;",
        [cart_id]
      );
      return cart.rows[0];
    };
  
    return module;
  };