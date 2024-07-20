const errorHandler = (err, req, res, next) => {
    console.error('Error executing query', err.stack);

    if (err.code === '23503') {
        const tableMapping = {
            'category_brands_brand_id_fkey': 'category_brands',
            'products_brand_id_fkey': 'products',
            'another_foreign_key_constraint': 'another_table' 
        };

        const constraintNameMatch = err.detail.match(/key \(([^)]+)\)/);
        const constraintName = constraintNameMatch ? constraintNameMatch[1] : '';

        const tableName = tableMapping[constraintName] || 'unknown table';

        return res.status(400).json({ error: `Error: data dari table ${tableName} tidak ada` });
    }

    res.status(500).send('Server error');
};

export default errorHandler;
