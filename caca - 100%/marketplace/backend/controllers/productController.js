const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { name, description, price, stock, storeId } = req.body;
    const images = req.files.map(file => file.path);

    try {
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            images,
            storeId
        });

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
