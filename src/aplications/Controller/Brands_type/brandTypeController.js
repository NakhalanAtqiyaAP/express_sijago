import pool from '../../../../config/database.js';
import queris from '../../Query/brandTypequeris.js';

const getAplications = (req, res) => {
    pool.query(queris.getAplications, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
const getAppById = (req, res) => {
    const brand_id = parseInt(req.params.brand_id);
    pool.query(queris.getAppById, [brand_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const createBrand = (req, res) => {
    const { brand_id,type_id } = req.body;  
    pool.query(queris.createBrand, [brand_id,type_id], (error, results) => {
        if (error) {
            console.error('Error executing query', error.stack);
            res.status(500).send('Server error');
        } else {
            res.status(201).json(results.rows[0]); 
        }
    });
};


const deleteApp = (req, res) => {
    const brand_id = parseInt(req.params.brand_id, 10);

    if (isNaN(brand_id)) {
        return res.status(400).json({ error: 'Invalid brand_id' });
    }
    const relatedTables = [
        { tableName: 'brads', foreignKey: 'brand_id' },
        { tableName: 'types', foreignKey: 'type_id' }
    ];

    const checkRelatedData = (brand_id, callback) => {
        let checkCount = relatedTables.length;
        let tablesWithRelatedData = [];

        relatedTables.forEach(table => {
            const checkQuery = `SELECT COUNT(*) FROM ${table.tableName} WHERE ${table.foreignKey} = $1`;
            pool.query(checkQuery, [brand_id], (error, results) => {
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

    checkRelatedData(brand_id, (error, tablesWithRelatedData) => {
        if (error) {
            console.error('Error executing query', error.stack);
            return res.status(500).send('Server error');
        }

        if (tablesWithRelatedData.length > 0) {
            return res.status(400).json({
                error: `Tidak bisa menghapus data karena sudah terkait dengan table: ${tablesWithRelatedData.join(', ')}`
            });
        }

        pool.query(queris.deleteApp, [brand_id], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return res.status(500).send('Server error');
            }

            if (results.rowCount === 0) {
                return res.status(404).json({ error: 'Brand tidak ditemukan' });
            }

            res.status(200).json({ message: 'Berhasil Menghapus!', brand: results.rows[0] });
        });
    });
};

const updateApp = (req, res, next) => {
    const { brand_id, type_id } = req.body;
    const id = parseInt(req.params.brand_id, 10);

    if (!brand_id || type_id ) {
        return res.status(400).json({ error: 'Data tidak boleh kosong!' });
    }

    pool.query(queris.updateApp, [brand_id,type_id, id], (error, results) => {
        if (error) {
            return next(error); 
        }
        res.status(200).json({ message: 'Brand update successfully', brand: results.rows[0] });
    });
};

export default {
    getAplications,
    getAppById,
    createBrand,
    deleteApp,
    updateApp    
};