import pool from '../../../../config/database.js';
import queris from '../../Query/typesQueris.js';

const getAplications = (req, res) => {
    pool.query(queris.getAplications, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
const getAppById = (req, res) => {
    const type_id = parseInt(req.params.type_id);
    pool.query(queris.getAppById, [type_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const createTypes = (req, res) => {
    const { type_name } = req.body;  
    pool.query(queris.createtype, [type_name], (error, results) => {
        if (error) {
            console.error('Error executing query', error.stack);
            res.status(500).send('Server error');
        } else {
            res.status(201).json(results.rows[0]); 
        }
    });
};

// const deleteApp = (req,res) =>{
//     const type_id = parseInt(req.params.type_id);
//     pool.query(queris.deleteApp, [type_id], (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// }

const deleteApp = (req, res) => {
    const type_id = parseInt(req.params.type_id, 10);

    if (isNaN(type_id)) {
        return res.status(400).json({ error: 'Invalid type_id' });
    }
    const relatedTables = [
        { tableName: 'products', foreignKey: 'type_id' },
        { tableName: 'brands_types', foreignKey: 'type_id' }
    ];

    const checkRelatedData = (type_id, callback) => {
        let checkCount = relatedTables.length;
        let tablesWithRelatedData = [];

        relatedTables.forEach(table => {
            const checkQuery = `SELECT COUNT(*) FROM ${table.tableName} WHERE ${table.foreignKey} = $1`;
            pool.query(checkQuery, [type_id], (error, results) => {
                if (error) {
                    return callback(error);
                }

                const count = parseInt(results.rows[0].count, 10);
                if (count > 0) {
                    tablesWithRelatedData.push(table.tableName);
                }

                checkCount--;
                if (checkCount === 0) {
                    callback(null, tablesWithRelatedData);
                }
            });
        });
    };

    checkRelatedData(type_id, (error, tablesWithRelatedData) => {
        if (error) {
            console.error('Error executing query', error.stack);
            return res.status(500).send('Server error');
        }

        if (tablesWithRelatedData.length > 0) {
            return res.status(400).json({
                error: `Tidak bisa menghapus data karena sudah terkait dengan table: ${tablesWithRelatedData.join(', ')}`
            });
        }

        pool.query(queris.deleteApp, [type_id], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return res.status(500).send('Server error');
            }

            if (results.rowCount === 0) {
                return res.status(404).json({ error: 'type tidak ditemukan' });
            }

            res.status(200).json({ message: 'Berhasil Menghapus!', type: results.rows[0] });
        });
    });
};

const updateApp = (req, res, next) => {
    const { type_name } = req.body;
    const id = parseInt(req.params.type_id, 10);

    if (!type_name ) {
        return res.status(400).json({ error: 'Data tidak boleh kosong!' });
    }

    pool.query(queris.updateApp, [type_name, id], (error, results) => {
        if (error) {
            return next(error); 
        }
        res.status(200).json({ message: 'type update successfully', type: results.rows[0] });
    });
};

export default {
    getAplications,
    getAppById,
    createTypes,
    deleteApp,
    updateApp
};