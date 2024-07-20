import pool from '../../../../config/database.js';
import queris from '../../Query/productsQueris.js';

const getAplications = (req, res) => {
    pool.query(queris.getAplications, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
const getAppById = (req, res) => {
    const product_id = parseInt(req.params.product_id);
    pool.query(queris.getAppById, [product_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const createProduct = (req, res, next) => {
    const { category_id, type_id, brand_id, item, num_item, price } = req.body;

    if (!category_id || !type_id || !brand_id || !item || !num_item || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    pool.query(queris.createProduct, [category_id, type_id, brand_id, item, num_item, price], (error, results) => {
        if (error) {
            return next(error);
        }
        res.status(201).json(results.rows[0]);
    });
};

const deleteApp = (req, res) => {
    const product_id = parseInt(req.params.product_id, 10);

    if (isNaN(product_id)) {
        return res.status(400).json({ error: 'Invalid product_id' });
    }
    const relatedTables = [
        { tableName: 'categories', foreignKey: 'category_id' },
        { tableName: 'types', foreignKey: 'type_id' },
        { tableName: 'brands', foreignKey: 'brand_id' },
    ];

    const checkRelatedData = (product_id, callback) => {
        let checkCount = relatedTables.length;
        let tablesWithRelatedData = [];

        relatedTables.forEach(table => {
            const checkQuery = `SELECT COUNT(*) FROM ${table.tableName} WHERE ${table.foreignKey} = $1`;
            pool.query(checkQuery, [product_id], (error, results) => {
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

    checkRelatedData(product_id, (error, tablesWithRelatedData) => {
        if (error) {
            console.error('Error executing query', error.stack);
            return res.status(500).send('Server error');
        }

        if (tablesWithRelatedData.length > 0) {
            return res.status(400).json({
                error: `Tidak bisa menghapus data karena sudah terkait dengan table: ${tablesWithRelatedData.join(', ')}`
            });
        }

        pool.query(queris.deleteApp, [product_id], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return res.status(500).send('Server error');
            }

            if (results.rowCount === 0) {
                return res.status(404).json({ error: 'Product tidak ditemukan' });
            }

            res.status(200).json({ message: 'Berhasil Menghapus!', brand: results.rows[0] });
        });
    });
};

const updateApp = (req, res, next) => {
    const { category_id, type_id, brand_id, item, num_item, price } = req.body;
    const id = parseInt(req.params.product_id);

    if (!category_id || !type_id || !brand_id || !item || !num_item || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    pool.query(queries.updateApp, [category_id, type_id, brand_id, item, num_item, price, id], (error, results) => {
        if (error) {
            return next(error);
        }
        res.status(200).json({ message: 'product update successfully', product: results.rows[0] });
    });
};
export default {
    getAplications,
    getAppById,
    createProduct,
    deleteApp,
    updateApp
};