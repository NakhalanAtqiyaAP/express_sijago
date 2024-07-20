import pool from '../../../../config/database.js';
import queris from '../../Query/categoriQueris.js';

const getAplications = (req, res) => {
    pool.query(queris.getAplications, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
const getAppById = (req, res) => {
    const category_id = parseInt(req.params.category_id);
    pool.query(queris.getAppById, [category_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const createCategories = (req, res) => {
    const { category_name } = req.body;  
    pool.query(queris.createcategory, [category_name], (error, results) => {
        if (error) {
            console.error('Error executing query', error.stack);
            res.status(500).send('Server error');
        } else {
            res.status(201).json(results.rows[0]); 
        }
    });
};

const deleteApp = (req, res) => {
    const category_id = parseInt(req.params.category_id, 10);

    if (isNaN(category_id)) {
        return res.status(400).json({ error: 'Invalid category_id' });
    }
    const relatedTables = [
        { tableName: 'products', foreignKey: 'category_id' },
        { tableName: 'category_brands', foreignKey: 'category_id' }
    ];

    const checkRelatedData = (category_id, callback) => {
        let checkCount = relatedTables.length;
        let tablesWithRelatedData = [];

        relatedTables.forEach(table => {
            const checkQuery = `SELECT COUNT(*) FROM ${table.tableName} WHERE ${table.foreignKey} = $1`;
            pool.query(checkQuery, [category_id], (error, results) => {
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

    checkRelatedData(category_id, (error, tablesWithRelatedData) => {
        if (error) {
            console.error('Error executing query', error.stack);
            return res.status(500).send('Server error');
        }

        if (tablesWithRelatedData.length > 0) {
            return res.status(400).json({
                error: `Tidak bisa menghapus data karena sudah terkait dengan table: ${tablesWithRelatedData.join(', ')}`
            });
        }

        pool.query(queris.deleteApp, [category_id], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return res.status(500).send('Server error');
            }

            if (results.rowCount === 0) {
                return res.status(404).json({ error: 'category tidak ditemukan' });
            }

            res.status(200).json({ message: 'Berhasil Menghapus!', category: results.rows[0] });
        });
    });
};

const updateApp = (req, res, next) => {
    const { category_name } = req.body;
    const id = parseInt(req.params.category_id, 10);

    if (!category_name ) {
        return res.status(400).json({ error: 'Data tidak boleh kosong!' });
    }

    pool.query(queris.updateApp, [category_name, id], (error, results) => {
        if (error) {
            return next(error); 
        }
        res.status(200).json({ message: 'category update successfully', category: results.rows[0] });
    });
};
export default {
    getAplications,
    getAppById,
    createCategories,
    deleteApp,
    updateApp
};