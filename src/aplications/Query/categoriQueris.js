// const getAplications = "SELECT * FROM categories";

// module.exports = {
//     getAplications,
// };

const queris = {
    getAplications: "SELECT * FROM categories",
    getAppById: "SELECT * FROM categories WHERE category_id = $1",
    createCategories: "INSERT INTO categories (category_name) VALUES ($1) RETURNING *",
    updateApp: "UPDATE categories SET category_name = $1 WHERE category_id = $2",


};

export default queris;
