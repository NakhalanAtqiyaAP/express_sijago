const queris = {
    getAplications: "SELECT * FROM brands",
    getAppById: "SELECT * FROM brands WHERE brand_id = $1",
    createBrand: "INSERT INTO brands (brand_name) VALUES ($1) RETURNING *",
    deleteApp: "DELETE FROM brands WHERE brand_id = $1 RETURNING *",
    updateApp: "UPDATE brands SET brand_name = $1 WHERE brand_id = $2"

};

export default queris;
