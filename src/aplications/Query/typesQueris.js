// const getAplications = "SELECT * FROM types";

// module.exports = {
//     getAplications,
// };

const queris = {
    getAplications: "SELECT * FROM types",
    getAppById: "SELECT * FROM types WHERE type_id = $1",
    createTypes: "INSERT INTO types (type_name) VALUES ($1) RETURNING *",
    updateApp: "UPDATE types SET type_name = $1 WHERE type_id = $2"
};

export default queris;
