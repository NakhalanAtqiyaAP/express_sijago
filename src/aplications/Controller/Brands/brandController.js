import pool from '../../../../config/database.js';
import queris from '../../Query/queris.js';

const getAplications = (req, res) => {
    pool.query(queris.getAplications, (error, results) => {
        if (error) {
            console.error('Error: Mengambil query', error.stack);
            res.status(500).send('Server error');
        } else {
            res.status(200).json(results.rows); 
        }
    });
};

const getAppById = (req, res) => {
    const brand_id = parseInt(req.params.brand_id);
    pool.query(queris.getAppById, [brand_id], (error, results) => {
        if (error) {
            console.error('Error: Mengambil query', error.stack);
            res.status(500).send('Server error');
        } else {
            res.status(200).json(results.rows); 
        }
    });
};

const createBrand = (req, res) => {
    const { brand_name } = req.body;  
    pool.query(queris.createBrand, [brand_name], (error, results) => {
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

    pool.query(queris.deleteApp, [brand_id], (error, results) => {
        if (error) {
            console.error('Error executing query', error.stack);
            return res.status(500).send('Server error');
        }

        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        res.status(200).json({ message: 'Brand deleted successfully', brand: results.rows[0] });
    });
};

const updateApp = (req, res, next) => {
    const { brand_name } = req.body;
    const id = parseInt(req.params.brand_id, 10);

    if (!brand_name ) {
        return res.status(400).json({ error: 'Data tidak boleh kosong!' });
    }

    pool.query(queris.updateApp, [brand_name, id], (error, results) => {
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
