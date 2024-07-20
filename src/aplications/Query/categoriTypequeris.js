// const getAplications = "SELECT * FROM category_brands";

// module.exports = {
//     getAplications,
// };

const queris = {
    getAplications: "SELECT * FROM category_brands",
    getAppById: "SELECT * FROM category_brands WHERE category_id = $1",
    createCategory : 'INSERT INTO category_brands (category_id, brand_id) VALUES ($1, $2) RETURNING *',
    delateApp: 'DELETE FROM category_brands WHERE category_id = $1',
    updateApp: "UPDATE category_brands SET brand_id = $1, category_id = $2 WHERE category_id = $3"


};

export default queris;
