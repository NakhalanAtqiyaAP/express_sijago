// const getAplications = "SELECT * FROM brand_types";

// module.exports = {
//     getAplications,
// };

const queris = {
    getAplications: "SELECT * FROM brands_types",
    getAppById: "SELECT * FROM brands_types WHERE brand_id = $1",
    createBrand: "INSERT INTO brands_types (brand_id, type_id) VALUES ($1,$2) RETURNING *",
    delateApp: 'DELETE FROM brands_types WHERE brand_id = $1',
    updateApp: "UPDATE brands_types SET brand_id = $1, types_id = $2 WHERE brand_id = $3"


};

export default queris;
