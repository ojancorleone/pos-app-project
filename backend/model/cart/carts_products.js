module.exports = client => {

    let module = {};

    // insertProductToCart
    module.insertProductToCart = async (cart_id, product_id, quantity) => {
      const cart = await client.query(
        "INSERT INTO carts_products (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;",
        [cart_id, product_id, quantity]
      );
      return cart.rows[0];
    };
  
    // updateQuantityProductFromCart
    module.updateQuantityProductFromCart = async (cart_id, product_id, quantity) => {
      const cart = await client.query(
        "UPDATE carts_products SET quantity=$1 WHERE cart_id=$2 AND product_id=$3 RETURNING *;",
        [quantity, cart_id, product_id]
      );
      return cart.rows[0];
    };
  
    // deleteProductFromCart
    module.deleteProductFromCart = async (cart_id, product_id) => {
      const cart = await client.query(
        "DELETE FROM carts_products WHERE cart_id=$1 AND product_id=$2 RETURNING *;",
        [cart_id, product_id]
      );
      return cart.rows[0];
    };
  
    // emptyCart
    module.deleteCart = async cart_id => {
      const cart = await client.query(
        `DELETE FROM carts_products WHERE cart_id=$1 RETURNING *;`,
        [cart_id]
      );
      return cart.rows[0];
    };
  
    // getProductsFromCart
    module.getProductsFromCart = async (cart_id) => {
      const products = await client.query(
        "SELECT product_id, quantity FROM carts_products WHERE cart_id=$1;",
        [cart_id]
      );
      return products.rows;
    }
  
    module.checkProductCartExists = async (cart_id, product_id) => {
        const product = await client.query(
            "SELECT 1 FROM carts_products WHERE cart_id=$1 AND product_id =$2",
            [cart_id, product_id]
        );
        return product.rows.length;
    };

    return module;
  };