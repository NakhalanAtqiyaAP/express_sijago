// const getAplications = "SELECT * FROM products";

// module.exports = {
//     getAplications,
// };

const queris = {
    getAplications: "SELECT * FROM products",
    getAppById: "SELECT * FROM products WHERE product_id = $1",
    createProduct: ' INSERT INTO products (category_id, type_id, brand_id, item, num_item, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    delateApp: 'DELETE FROM products WHERE product_id = $1',
    updateApp: " UPDATE products SET category_id = $1, type_id = $2, brand_id = $3, item = $4, num_item = $5, price = $6 WHERE product_id = $7 RETURNING *;"


};

export default queris;
